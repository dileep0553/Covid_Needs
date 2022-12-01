from connection import initializeConnection
from flask import Flask, request, render_template
import os
import logging
import requests
import wget

def home():
    try:
        url = ('https://api.us.castlighthealth.com/vaccine-finder/v1/provider-locations/search?medicationGuids=b4d4d673-4279-477d-a2d4-d9921c60e7a3&lat=33.590937&long=-86.490817&appointments=false')
      
        response = wget.download(url, "instagram.json")
    except Exception as e:
        print(e)
        return e
    return x

home()