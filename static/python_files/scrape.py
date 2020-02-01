# import dependancies
import requests
import urllib
from bs4 import BeautifulSoup as bs
from splinter import Browser
from selenium import webdriver
import time
import pandas as pd

# Initiate Browser instance
#executable_path = {"executable_path":"chromedriver.exe"}
#browser = Browser("chrome", **executable_path, headless=False)

# Visit the URL
#url = "https://www.privateislandsonline.com/search?availability=sale"
#browser.visit(url)



def scrape(browser):
    # Set up SOUP object
    html = browser.html
    soup = bs(html, "html.parser")

    # Find all island by loopiing through grid object in soup
    names = []
    acres = []
    countrys = []
    links = []
    lats = []
    lngs = []
    all_spans = []
    prices = []
    attributes_dict = {}

    # Get the link to island
    for grid in soup.find_all(attrs={'class': 'grid-content island-content'}):

        #Get the link
        isle_link = grid.find('a')['href']
        links.append(isle_link)

        # Get the name
        name = grid.find(attrs={'class': 'name'}).text.strip()
        name = name.replace(".", "")
        
        if name in names:
            name = ("x" + name + "x")
            names.append(name)
        else:
            names.append(name)

        # Get the acreage
        try:
            acre = grid.find(attrs={'class': 'num'}).text.strip()
            acres.append(int(acre))
        except Exception:
            acres.append(0)

        # get the location
        for thing in grid.find_all(attrs={'class': 'list-name'}):
            try:
                location = thing.find_all('a')
                region = location[-1].text
                country = location[-2].text
                if region == "United States":
                    country = "United States of America"
                elif region == "Canada":
                    country = "Canada"
                elif country == "US Virgin Islands":
                    country = "United States of America"
                elif country == "French Polynesia":
                    country = "France"
                elif country == "British Virgin Islands":
                    country = "United Kingdom"
                else:
                    country = location[-2].text
                countrys.append(country)
            except Exception:
                countrys.append("NA")
        
        # Set up counter variable, empty list, and dictionary
        y = 0
        current_spans = []
        attributes_dict[name] = ['hey']

        # The goal here is to get all of those island attributes
        for span in grid.find_all('span'):
            # Gotta start at the third span that is found
            if y > 3:
                stuff = span.text.strip()
                all_spans.append(stuff)
                current_spans.append(stuff)
            y = y+1

        # Append the spans to the attributes_dict
        if len(current_spans) == 0:
            attributes_dict[name] = ["NA"]
        else:
            attributes_dict[name] = current_spans

    # Here we go island by island to get the latitude and longitude and price
    for link in links:
        # Visit the link
        browser.visit(link)

        # Beautiful Soup magic
        html = browser.html
        soup = bs(html, "html.parser")

        tags = soup.find_all('div', {'class': 'hide'})
        y = 0

        # loop through to get the lat and lng
        for tag in tags:
            try:
                lat = tag['data-lat']
                lng = tag['data-lon']
                lats.append(lat)
                lngs.append(lng)
                y = y+1
                break
            except Exception:
                pass
    
        price = soup.find(attrs={'class': 'price'}).text.strip()
        price = price.replace(',', '')
        prices.append(price)
    # Now I want to get a list of all unique attributes and then compare each island to that list to see if they have the attribute
    all_unique_attributes = list(dict.fromkeys(all_spans))

    # Set up an initial dictionary
    island_attributes_dict = {
        "Island_Name": names,
        "Acreage": acres,
        "Country": countrys,
        "latitude": lats,
        "longitude": lngs,
        "price": prices}

    # Loop through each island and each attribute, compare them, and put in the dictionary a yes or no based on if the country has the attribute
    for item in all_unique_attributes:
        has_attribute_list = []
        y = 0
        for key in attributes_dict:
            if item in attributes_dict[key]:
                has_attribute_list.append("yes")
            else:
                has_attribute_list.append("no")
            y = y+1

        island_attributes_dict[item] = has_attribute_list

    #Create a dataframe
    df = pd.DataFrame(island_attributes_dict)

    return df

#df = scrape(browser)