import os
import openai

openai.api_key = os.environ["OPENAI_API_KEY"]

TEST_REVIEWS = '''
It is a true pleasure to use these awesome pans! I love to cook and will be using them on the regular I'm sure. I've only used the small one as I gave the big one to my Bro & his mate - they LOVE it!! I've never owned TFal before and went ahead and seasoned the pans although it appears there are 2 thoughts on that - some say if it is non-stick there's no need. Being old school, I would always season anyway, it certainly can't hurt and helps the pans to last longer. GREAT PRODUCT!

Excellent buy! Non stick works great and incredible price. Worth every penny

This was a really good deal. Delivery was very fast.

food cook fantastic no sticking easy to clean

These are solid pans that heat up fast, but they are not truly non stick. You will need to put oil in the pan and move it around first. Overall good

Hi, for those of you who are looking, these are Tfal's Signature series (which they don't tell you) and they are about 1.5" deep. Great price so I bought two sets. I was however looking for deeper pans like the pictures on this listing but every picture but the first are NOT of this product. The first picture doesn't tell much as there is no straight on side on views indicating how deep they may be. I am sure that they are good pans but Tfal needs to step up with accurate pictures and measurements as it is the only thing we have to go by. I wanted a 2" deep pan but only now I see that the pictures are not of what I bought. Sending both sets back hopefully on Tfals dime for misleading information.
'''

SAMPLE_RES = '''
Summary:
The T-Fal Frying Pan Set is highly recommended by customers. It is a pleasure to use, with non-stick capabilities and fast heating. The pans are solid and easy to clean. However, some customers found that they were not truly non-stick and required oil to be used. Additionally, there was some confusion with the product images and measurements, as they did not accurately depict the pans that were received.

---
Pros:
• Pleasure to use
• Non-stick capabilities
• Solid construction
• Fast heating
• Easy to clean
• Great price
• Fast delivery

---
Cons:
• Not truly non-stick, oil is needed
• Confusion with product images and measurements
'''
def generate_analysis(name, reviews):
    system_string = f'''
    Given multiple customer reviews for the product {name} from Amazon, generate a summary, pros, and cons in the following format:
    Summary:
    <insert summary here>
    ---
    Pros:
    • Pro number 1
    • Pro number 2, etc
    ---
    Cons:
    • Con number 1
    • Con number 2, etc

    '''
    # response = openai.ChatCompletion.create(
    # model="gpt-3.5-turbo",
    # messages=[
    #     {"role": "system", "content": system_string},
    #     {"role": "user", "content": f"Here are the reviews: {reviews}\n, please generate the specified summary"},
    # ]
    # )['choices'][0]['message']['content']
    # print(response)
    stripped = strip_response(response.split('\n---'))
    return stripped


def strip_response(response):
    keywords = ['summary', 'pros', 'cons']
    for i in range(len(keywords)):
        assert keywords[i] in response[i].lower()

    response_dict = {}
    summary_res = response[0]
    summary = summary_res[summary_res.index('\n') + 1:]

    pros, cons = response[1].split('\n')[1:], response[2].split('\n')[1:]

    response_dict['summary'] = summary
    response_dict['pros'] = pros
    response_dict['cons'] = cons
    return response_dict



generate_analysis('T-Fal Frying Pan Set', TEST_REVIEWS)
            


