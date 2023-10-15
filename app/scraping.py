from selenium import webdriver
from time import sleep
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as ec
from selenium.common.exceptions import TimeoutException, NoSuchElementException
import threading
import pickle
# from sentiment import classify 

REVIEW_AMOUNT = 7


def initialize_driver():
    options = Options()
    options.add_argument("--disable-extensions")
    options.add_argument("--headless")
    driver = webdriver.Chrome(options=options)

    return driver


def product_lookup(name: str):

    driver = initialize_driver()

    links = []
    url_name = name.replace(" ", "+")

    url = f"https://www.amazon.ca/s?k={url_name}&crid=G9GEWK0ELRDA&sprefix=%2Caps%2C112&ref=nb_sb_ss_sx-trend-t-ps-d-purchases-ten-ca_8_0 "
    print("Finding: " + url)
    driver.get(url)
    try:
        WebDriverWait(driver, 3).until(
            ec.presence_of_element_located((By.CSS_SELECTOR, "div[data-component-type='s-search-result']"))
        )

        results = driver.find_elements(By.CSS_SELECTOR, "div[data-component-type='s-search-result']")
        print("Found", len(results))

        for result in results[:10]:
            try:
                WebDriverWait(driver, 2).until(
                    ec.presence_of_element_located((By.CSS_SELECTOR, 'div[class="a-section a-spacing-none a-spacing-top-small s-title-instructions-style"]'))
                )
                header = result.find_element(By.CSS_SELECTOR,
                                             'div[class="a-section a-spacing-none a-spacing-top-small s-title-instructions-style"]')
                try:
                    # find the amount of ratings
                    rating_amount = result.find_element(By.CSS_SELECTOR, 'span[class="a-size-base s-underline-text"]').text
                    # if not sponsored and more than 99 ratings
                    if "Sponsored" not in header.text and len(rating_amount) > 2:
                        link = result.find_element(By.CSS_SELECTOR,
                                                   "a[class='a-link-normal s-underline-text s-underline-link-text s-link-style "
                                                   "a-text-normal']")
                        links.append(link.get_attribute('href'))
                # rating doesn't exist
                except NoSuchElementException:
                    pass
            except TimeoutException:
                print("e")

        return links[:3]
    except TimeoutException:
        pass


def review_lookup(url: str):
    driver = initialize_driver()

    positive_reviews = ""
    negative_reviews = ""

    driver.get(url)
    name = driver.find_element(By.ID, "productTitle").text
    price = driver.find_element(By.CLASS_NAME, 'a-price').text
    try:
        WebDriverWait(driver, 2).until(
            ec.presence_of_element_located((By.LINK_TEXT, 'See more reviews'))
        )
        review_button = driver.find_element(By.LINK_TEXT, 'See more reviews')
        review_button.click()
        sleep(1)
        rating = driver.find_element(By.CSS_SELECTOR, 'span[data-hook="rating-out-of-text"]').text
        # find positive reviews
        current_url = driver.current_url
        driver.get(current_url.replace("all_stars", "positive"))
        sleep(1)
        reviews = driver.find_elements(By.CSS_SELECTOR, 'div[data-hook="review"]')
        for i, review in enumerate(reviews[:REVIEW_AMOUNT]):
            review_text = review.find_element(By.CSS_SELECTOR, 'div[class="a-row a-spacing-small review-data"]')
            positive_reviews += f"Positive Review {i + 1}: \n" + review_text.text + "\n\n"

        # find negative reviews
        current_url = driver.current_url
        
        driver.get(current_url.replace("positive", "critical"))
        sleep(1)
        reviews = driver.find_elements(By.CSS_SELECTOR, 'div[data-hook="review"]')
        for i, review in enumerate(reviews[:REVIEW_AMOUNT]):
            # classified = classify(review)
            review_text = review.find_element(By.CSS_SELECTOR, 'div[class="a-row a-spacing-small review-data"]')
            positive_reviews += f"Negative Review {i + 1}: \n" + review_text.text + "\n\n"

        final_reviews = positive_reviews + negative_reviews
        output = {
            "name": name,
            "price": price,
            "rating": rating,
            "reviews": final_reviews
        }

        return output
    except TimeoutException:
        raise TimeoutException


def _helper(outputs, url):
    try:
        print("Trying url: " + url)
        outputs.append(review_lookup(url))
    except TimeoutException:
        _helper(outputs, url)


def reviews_from_urls(urls: list[str]):
    outputs = []
    threads = []

    for url in urls:
        thread = threading.Thread(target=_helper, args=(outputs, url))
        threads.append(thread)

    for thread in threads:
        thread.start()

    for thread in threads:
        thread.join()

    return outputs

def save_product(outputs: list, name: str):
    with open(f'app/saved/{name}.pkl', 'wb') as file:
        pickle.dump(outputs, file)


def load_product(name: str):
    # Reading the list from the file
    with open(f'app/saved/{name}.pkl', 'rb') as file:
        loaded_list = pickle.load(file)
    return loaded_list


def save_url(output, name):
    with open(f'app/saved/{name}.pkl', 'wb') as file:
        pickle.dump(output, file)

def load_url(name):
    with open(f'app/saved/{name}.pkl', 'rb') as file:
        output = pickle.load(file)
    return output


products = [
    "laptop",
    "monitor",
    "office table",
    "projector",
    "running shoes"
]

urls = [
    'https://www.amazon.ca/GoodValue-Running-Waterproof-Non-Slip-All-Terrain/dp/B08ZHTSMVS/ref=sr_1_20?crid=1GFM4LDBMUORW&keywords=running+shoes&qid=1697318976&sprefix=running+shoe%2Caps%2C102&sr=8-20',
    "https://www.amazon.ca/Running-Breathable-Comfortable-Sneakers-Athletic/dp/B098CWPL2B/ref=sr_1_22_sspa?crid=1GFM4LDBMUORW&keywords=running+shoes&qid=1697318976&sprefix=running+shoe%2Caps%2C102&sr=8-22-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9tdGY&psc=1"
]

# for product in products:
#     foundurls = product_lookup(product)
#     outputs = reviews_from_urls(foundurls)
#     save_product(outputs, product)
#
# for i, url in enumerate(urls):
#     output = review_lookup(url)
#     save_url(url, str(i))
print(load_product('running shoes'))