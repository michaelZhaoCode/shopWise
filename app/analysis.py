import os
import openai
from scraping import load_product
import pickle

openai.api_key = os.environ["OPENAI_API_KEY"]
MODEL = "gpt-3.5-turbo"

TEST_REVIEWS = '''
It is a true pleasure to use these awesome pans! I love to cook and will be using them on the regular I'm sure. I've only used the small one as I gave the big one to my Bro & his mate - they LOVE it!! I've never owned TFal before and went ahead and seasoned the pans although it appears there are 2 thoughts on that - some say if it is non-stick there's no need. Being old school, I would always season anyway, it certainly can't hurt and helps the pans to last longer. GREAT PRODUCT!

Excellent buy! Non stick works great and incredible price. Worth every penny

This was a really good deal. Delivery was very fast.

food cook fantastic no sticking easy to clean

These are solid pans that heat up fast, but they are not truly non stick. You will need to put oil in the pan and move it around first. Overall good

Hi, for those of you who are looking, these are Tfal's Signature series (which they don't tell you) and they are about 1.5" deep. Great price so I bought two sets. I was however looking for deeper pans like the pictures on this listing but every picture but the first are NOT of this product. The first picture doesn't tell much as there is no straight on side on views indicating how deep they may be. I am sure that they are good pans but Tfal needs to step up with accurate pictures and measurements as it is the only thing we have to go by. I wanted a 2" deep pan but only now I see that the pictures are not of what I bought. Sending both sets back hopefully on Tfals dime for misleading information.
'''

SAMPLE_RES = '''Summary:
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
    Given multiple customer reviews for the product {name} from Amazon, generate a summary, pros, and cons in the following format (NOTE: DON'T FORGET THE ---):
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
    response = openai.ChatCompletion.create(
    model=MODEL,
    messages=[
        {"role": "system", "content": system_string},
        {"role": "user", "content": f"Here are the reviews: {reviews}\n, please generate the specified summary"},
    ]
    )['choices'][0]['message']['content']
    extracted = extract_to_list(response)
    # print(extracted, '*****\n')
    stripped = strip_response(extracted)
    return stripped



def product_question(outputs: list[dict], prompt):
    names = []
    reviews = []

    for output in outputs:
        names.append(output['name'])
        reviews.append(output['reviews'])


    system_string = f"""Take in a list of products and reviews and use that information to answer a prompt"""
    user_string = "Here are the products and corresponding reviews:\n"
    for i in range(len(names)):
        user_string += f"[Product name: {names[i]} \nReviews: \n{reviews[i]}]\n\n"

    response = openai.ChatCompletion.create(
    model=MODEL,
    messages=[
        {"role": "system", "content": system_string},
        {"role": "user", "content": f"{user_string} Please answer the following question using the information provided: {prompt}. Use specific information from the reviews to justify the answer."},
    ]
    )['choices'][0]['message']['content']

    return response

def extract_to_list(response):
    keywords = ['summary:', 'pros:', 'cons:']
    lengths = [len(i) for i in keywords]
    idxs = [response.lower().index(i) for i in keywords]
    # print(idxs)
    first = response[idxs[0]:idxs[1]]
    second = response[idxs[1]:idxs[2]]
    third = response[idxs[2]:]
    res = [first, second, third]

    for i in range(len(keywords)):
        # try:
        assert keywords[i] in res[i].lower()
        # except:
        #     pass
            # print(response, res, 'bad', sep='\n!!!!\n')
    return res

def strip_response(response):



    response_dict = {}
    summary_res = response[0]
    summary = summary_res[summary_res.index('\n') + 1:].replace('\n\n---\n', '')

    pros, cons = response[1].replace('\n\n---\n', '').replace("\n\n", "").split('\n')[2:], response[2].replace('\n\n---\n', '').replace("\n\n", "").split('\n')[2:]
    # print(pros, cons)
    # print(response[1])
    # print(response[2])
    for lst in [pros, cons]:
        for i in range(len(lst)):
            lst[i] = lst[i][2:]
    response_dict['summary'] = summary
    response_dict['pros'] = pros
    response_dict['cons'] = cons
    return response_dict



# print(generate_analysis('T-Fal Frying Pan Set', TEST_REVIEWS))


def save_response(name, reviews):
    analyses = []
    for review in reviews:
        analysis = generate_analysis(review["name"], review["reviews"])
        clean_response(analysis["pros"])
        clean_response(analysis["cons"])

        analyses.append(analysis)
        print(analysis)
    with open(f'app/analyses/{name}.pkl', 'wb') as file:
        pickle.dump(analyses, file)


def clean_response(response: list):
    if "-" in response:
        response.remove("-")
        clean_response(response)

    if "" in response:
        response.remove("")
        clean_response(response)


def load_response(name: str):
    # Reading the list from the file
    with open(f'app/analyses/{name}.pkl', 'rb') as file:
        loaded_list = pickle.load(file)
    return loaded_list


# stored_products = [
#     "laptop",
#     "monitor",
#     "office table",
#     "projector",
#     "running shoes"
# ]

# for product in stored_products:
#     reviews = load_product(product)
#     save_response(product, reviews)

# for product in stored_products:
#     analyses = load_response(product)
#     for analysis in analyses:
#         print(analysis)
