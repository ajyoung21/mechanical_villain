from flask import Flask, render_template, redirect, jsonify
from flask_pymongo import PyMongo
import pymongo
import os

app = Flask(__name__)

# Use flask_pymongo to set up mongo connection
app.config["MONGO_URI"] = "mongodb+srv://Taylor:Tay22894@islandcluster-or9h1.mongodb.net/test?retryWrites=true&w=majority"
mongo = PyMongo(app)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/data_one")
def data_grab():
    conn = 'mongodb+srv://Taylor:Tay22894@islandcluster-or9h1.mongodb.net/test?retryWrites=true&w=majority'
    client = pymongo.MongoClient(conn)
    islands = client.island_base.island_base.find_one()
    islands.pop("_id")
    return jsonify(islands)

@app.route("/data_two")
def data_grab_2():
    conn = 'mongodb+srv://Taylor:Tay22894@islandcluster-or9h1.mongodb.net/test?retryWrites=true&w=majority'
    client = pymongo.MongoClient(conn)
    countries = client.island_base.island_base.find()
    countries = countries[1]
    countries.pop("_id")
    return jsonify(countries)

@app.route("/about_us")
def about():
    return render_template("contact_information.html")

@app.route("/data_table")
def data_table():
    return render_template("data_table.html")

if __name__ == '__main__':
	port = int(os.environ.get('PORT', 5000))
	app.run(host='0.0.0.0', port=port)
    #app.run(debug=True)