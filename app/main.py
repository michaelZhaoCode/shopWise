from flask import Flask, request, jsonify, session
from json import dumps
from flask_cors import CORS, cross_origin
from time import sleep


from app.scraping import product_lookup, review_lookup, reviews_from_urls, load_url, load_product
from app.analysis import generate_analysis, product_question, load_response


app = Flask(__name__)

cors = CORS(app, resources={r"/*": {"origins": "*"}})
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"

REVIEWS = []

stored_products = [
    "laptop",
    "monitor",
    "office table",
    "projector",
    "running shoes"
]

stored_urls = [
    'https://www.amazon.ca/GoodValue-Running-Waterproof-Non-Slip-All-Terrain/dp/B08ZHTSMVS/ref=sr_1_20?crid=1GFM4LDBMUORW&keywords=running+shoes&qid=1697318976&sprefix=running+shoe%2Caps%2C102&sr=8-20',
    "https://www.amazon.ca/Running-Breathable-Comfortable-Sneakers-Athletic/dp/B098CWPL2B/ref=sr_1_22_sspa?crid=1GFM4LDBMUORW&keywords=running+shoes&qid=1697318976&sprefix=running+shoe%2Caps%2C102&sr=8-22-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9tdGY&psc=1"
]


# reviews needa be stored
# enter product name - get urls results (use webscrpaing)
# given url - get reviews
# take reviews - generate analysis
# take reviews and prompt - give response

@app.route('/analyze/', methods=['POST'])
@cross_origin()
def analyze():
    empty_reviews()
    product_name = request.get_json()['product'].lower()

    if product_name in stored_products:
        reviews = load_product(product_name)
        sleep(2)
        analyses = load_response(product_name)

        for i, analysis in analyses:
            analysis["name"] = reviews[i]["name"]
            analysis["price"] = reviews[i]["price"]
            analysis["rating"] = reviews[i]["rating"]
    else:
        urls = product_lookup(product_name)
        reviews = reviews_from_urls(urls)
        analyses = []
        for review in reviews:

            REVIEWS.append(review)

            analysis = generate_analysis(review['name'], review['reviews'])
            analysis["name"] = review["name"]
            analysis["price"] = review["price"]
            analysis["rating"] = review["rating"]
            analyses.append(analysis)


    return dumps(analyses)

@app.route('/addUrls/', methods=['POST'])
@cross_origin()
def add_urls():

    empty_reviews()
    urls = request.get_json()['urls']
    if set(urls) == set(stored_urls):
        reviews = []
        for i in range(len(stored_urls)):
            reviews.append(load_url(str(i)))
    else:
        reviews = reviews_from_urls(urls)
    for review in reviews:

        REVIEWS.append(review)
    return jsonify({
        'response': 'Done'
    })


@app.route('/chat/', methods=['POST'])
@cross_origin()
def chat():
    print(1)

    prompt = request.get_json()['prompt']
    if prompt == 'sexy':
        print(1)
        return jsonify({
        'response': 'sexy'
    })
    response = product_question(REVIEWS, prompt)
    return jsonify({
        'response': response
    })

def empty_reviews():
    while REVIEWS:
        REVIEWS.pop()
