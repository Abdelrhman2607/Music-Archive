from flask import Flask
import psycopg

app = Flask(__name__)

@app.route("/newEntry", methods=["POST"])
def newEntry():
    return("test")

@app.route("/updateEntry", methods=["PUT"])
def updateEntry():
    return("test")

@app.route("/removeEntry", methods=["DELETE"])
def removeEntry():
    return("test")


@app.route("/newArtist", methods=["POST"])
def newArtist():
    return("test")

@app.route("/updateArtist", methods=["PUT"])
def updateArtist():
    return("test")

@app.route("/removeArtist", methods=["DELETE"])
def removeArtist():
    return("test")


@app.route("/newTag", methods=["POST"])
def newTag():
    return("test")

@app.route("/updateTag", methods=["PUT"])
def updateTag():
    return("test")

@app.route("/removeTag", methods=["DELETE"])
def removeTag():
    return("test")


@app.route("/newCategory", methods=["POST"])
def newCategory():
    return("test")

@app.route("/updateCategory", methods=["PUT"])
def updateCategory():
    return("test")

@app.route("/removeCategory", methods=["DELETE"])
def removeCategory():
    return("test")

