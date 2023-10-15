import cohere
from cohere.classify import Example
from app.sql import *
api_key = os.environ.get("COHERE_KEY")
co = cohere.Client(api_key)

examples=[
  Example("The fit is good for running shoes I usually buy one size up and in this case it worked great. The Color is as described and show in the picture.", "Positive"),
  Example("Easy exchange and shoes are comfortable for my workplace office. Nice arch support and no pain on the knees", "Positive"),
  Example("Really like the support these provide, especially on longer runs.", "Positive"),
  Example('I would not use this as a serious running shoe as the support for that is not there', 'Negative'),
  Example('I was disappointed right off the bat that these do not stretch really at all', 'Negative'),
]

def classify(prompt):
  prompt = f'For context, a black male is talking with a police officer.{prompt}'
  response = co.classify(  
    model='large',  
    inputs=[prompt],  
    examples=examples)

  return response.classifications[0].prediction