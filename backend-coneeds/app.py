from connection import initializeConnection
from flask import Flask, request, render_template
import os
import logging

app = Flask(__name__,  template_folder='templates', static_folder='static')

@app.route('/', methods =["post","get"])
def home():
    return "Welcome to Health Care System"


if __name__ == "__main__":
    port = int(os.environ.get('PORT', 4000))
    initializeConnection()
    app.run(debug=True, host='0.0.0.0', port=port)