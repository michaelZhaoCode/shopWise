from flask import Flask, request, jsonify, session
from json import dumps
from flask_cors import CORS, cross_origin


from scraping import product_lookup, review_lookup
from analysis import generate_analysis, product_question


app = Flask(__name__)

cors = CORS(app)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"

REVIEWS = []


# reviews needa be stored
# enter product name - get urls results (use webscrpaing)
# given url - get reviews
# take reviews - generate analysis
# take reviews and prompt - give response

@app.route('/analyze/', methods=['POST'])
def analyze():
    empty_reviews()
    product_name = request.get_json()['product']
    urls = product_lookup(product_name)
    analyses = []
    for url in urls:
        output = review_lookup(url)
        REVIEWS.append(review)

        analysis = generate_analysis(output['name'], output['reviews'])
        analyses.append(analysis)


    return dumps(analyses)

@app.route('/addUrls/', methods=['POST'])
def add_urls():
    
    empty_reviews()
    urls = request.get_json()['urls']
    for url in urls:
        review = review_lookup(url)
        REVIEWS.append(review)


@app.route('/chat/', methods=['POST'])
def chat():
    prompt = request.get_json()['prompt']
    response = product_lookup(REVIEWS, prompt)
    return jsonify({
        'response': response
    })

def empty_reviews():
    while REVIEWS:
        REVIEWS.pop()
