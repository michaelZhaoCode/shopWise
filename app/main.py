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



# reviews needa be stored
# enter product name - get urls results (use webscrpaing)
# given url - get reviews
# take reviews - generate analysis
# take reviews and prompt - give response

@app.route('/analyze/', methods=['POST'])
def login():
    product_name = request.get_json()['product']
    # urls_and_names = get_urls(product_name)
    # product_dict = {name: get_reviews(url) for url, name in urls_and_names}


    return jsonify({
        'response': 'Done'
    })