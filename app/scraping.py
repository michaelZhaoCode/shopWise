from selenium import webdriver
from time import sleep
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as ec

REVIEW_AMOUNT = 10


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
    driver.get(url)

    results = driver.find_elements(By.CSS_SELECTOR, "div[data-component-type='s-search-result']")

    for result in results[:10]:
        header = result.find_element(By.CSS_SELECTOR,
                                     'div[class="a-section a-spacing-small puis-padding-left-small '
                                     'puis-padding-right-small"]')
        if "Sponsored" not in header.text:
            link = result.find_element(By.CSS_SELECTOR,
                                       "a[class='a-link-normal s-underline-text s-underline-link-text s-link-style "
                                       "a-text-normal']")
            links.append(link.get_attribute('href'))

    return links[:3]


def review_lookup(url: str):
    driver = initialize_driver()

    positive_reviews = ""
    negative_reviews = ""

    driver.get(url)
    name = driver.find_element(By.ID, "productTitle").text
    price = driver.find_element(By.CLASS_NAME, 'a-price').text
    try:
        WebDriverWait(driver, 20).until(
            ec.presence_of_element_located((By.LINK_TEXT, 'See more reviews'))
        )
        review_button = driver.find_element(By.LINK_TEXT, 'See more reviews')
        review_button.click()
        sleep(1)
        rating = driver.find_element(By.CSS_SELECTOR, 'span[data-hook="rating-out-of-text"]').text
        # find positive reviews
        driver.find_element(By.LINK_TEXT, "Positive reviews").click()
        sleep(1)
        reviews = driver.find_elements(By.CSS_SELECTOR, 'div[data-hook="review"]')
        for i, review in enumerate(reviews[:REVIEW_AMOUNT]):
            review_text = review.find_element(By.CSS_SELECTOR, 'div[class="a-row a-spacing-small review-data"]')
            positive_reviews += f"Positive Review {i + 1}: \n" + review_text.text + "\n\n"

        # find negative reviews
        driver.find_element(By.LINK_TEXT, "Critical reviews").click()
        sleep(1)
        reviews = driver.find_elements(By.CSS_SELECTOR, 'div[data-hook="review"]')
        for i, review in enumerate(reviews[:REVIEW_AMOUNT]):
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
    except:
        raise Exception
