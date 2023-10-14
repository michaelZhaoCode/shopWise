from flask import Flask, request, jsonify, session
from flask_cors import CORS, cross_origin
from app.sql import *
from app.analysis import reply, classify
from time import sleep

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
    product_name = request.get_json()['product']
    urls = get_urls(product_name)
    analyses = []
    for url in urls:
        review, name = get_reviews(url)
        REVIEWS.append([review, name])
        analysis = generate_analysis(name, review)
        analyses.append(analysis)


    return jsonify({
        'response': 'Done'
    })

@app.route('/addUrls/', methods=['POST'])
def add_urls():
    while REVIEWS:
        REVIEWS.pop()
    

    urls = request.get_json()['urls']
    for url in urls:
        reviews, name = get_reviews(url)
        REVIEWS.append([review, name])



