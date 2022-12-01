from connection import getRawData
from connection import initializeConnection
from connection import insertRecord
from flask import Flask, request, render_template
import os
import logging
import requests
import json
from flask_cors import CORS, cross_origin
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import pandas as pd

app = Flask(__name__,  template_folder='templates', static_folder='static')
CORS(app)

@app.route('/', methods =["post","get"])
def home():
    return "Welcome to health care"

@cross_origin()
@app.route('/states', methods=["get"])
def getStates():
    f = open('states_hash.json')
    return json.load(f)

@cross_origin()
@app.route('/get_icu_beds_graph', methods=["get"])
def getIcuBedsGraph():
    response_plain = requests.get('https://api.covidactnow.org/v2/states.json?apiKey=fc593baa1c87446aa919e5b396abba95')
    response = response_plain.json()
    states=[]
    total_beds=[]
    used_beds=[]
    covid_used_beds=[]

    for item in response:
        states.append(item['state'])
        if(item['actuals']['icuBeds']['capacity']!=None):
            total_beds.append(item['actuals']['icuBeds']['capacity'])
        else:
            total_beds.append(0)
        
        if(item['actuals']['icuBeds']['currentUsageCovid']!=None):
            covid_used_beds.append(item['actuals']['icuBeds']['currentUsageCovid'])
        else:
            covid_used_beds.append(0)
        
        if(item['actuals']['icuBeds']['currentUsageTotal']!=None and item['actuals']['icuBeds']['currentUsageCovid']!=None):
            used_beds.append(item['actuals']['icuBeds']['currentUsageTotal']-item['actuals']['icuBeds']['currentUsageCovid'])
        elif item['actuals']['icuBeds']['currentUsageTotal']!=None:
            used_beds.append(item['actuals']['icuBeds']['currentUsageTotal'])
        else:
            used_beds.append(0)
    response_data = {  'labels':states,
                        'datasets': [
                            {
                            'label': 'Available Beds',
                            'data': total_beds,
                            'backgroundColor': 'rgb(75, 192, 192)',
                            },
                            {
                            'label': 'Beds Occupied by Covid patient',
                            'data': covid_used_beds,
                            'backgroundColor': 'rgb(255, 99, 132)',
                            },
                            {
                            'label': 'Beds Occupied by Others',
                            'data': used_beds,
                            'backgroundColor': 'rgb(53, 162, 235)',
                            },
                        ],
                    }
    return {"response":response_data}


@cross_origin()
@app.route('/get_beds_graph', methods=["get"])
def getBedsGraph():
    response_plain = requests.get('https://api.covidactnow.org/v2/states.json?apiKey=fc593baa1c87446aa919e5b396abba95')
    response = response_plain.json()
    states=[]
    total_beds=[]
    used_beds=[]
    covid_used_beds=[]

    for item in response:
        states.append(item['state'])
        if(item['actuals']['hospitalBeds']['capacity']!=None):
            total_beds.append(item['actuals']['hospitalBeds']['capacity'])
        else:
            total_beds.append(0)
        
        if(item['actuals']['hospitalBeds']['currentUsageCovid']!=None):
            covid_used_beds.append(item['actuals']['hospitalBeds']['currentUsageCovid'])
        else:
            covid_used_beds.append(0)
        
        if(item['actuals']['hospitalBeds']['currentUsageTotal']!=None and item['actuals']['hospitalBeds']['currentUsageCovid']!=None):
            used_beds.append(item['actuals']['hospitalBeds']['currentUsageTotal']-item['actuals']['hospitalBeds']['currentUsageCovid'])
        elif item['actuals']['hospitalBeds']['currentUsageTotal']!=None:
            used_beds.append(item['actuals']['hospitalBeds']['currentUsageTotal'])
        else:
            used_beds.append(0)
    response_data = {  'labels':states,
                        'datasets': [
                            {
                            'label': 'Available Beds',
                            'data': total_beds,
                            'backgroundColor': 'rgb(75, 192, 192)',
                            },
                            {
                            'label': 'Beds Occupied by Covid patient',
                            'data': covid_used_beds,
                            'backgroundColor': 'rgb(255, 99, 132)',
                            },
                            {
                            'label': 'Beds Occupied by Others',
                            'data': used_beds,
                            'backgroundColor': 'rgb(53, 162, 235)',
                            },
                        ],
                    }
    return {"response":response_data}


@cross_origin()
@app.route('/get_vaccinated', methods=["get"])
def get_vaccinated_count():
    response_plain = requests.get('https://api.covidactnow.org/v2/states.json?apiKey=fc593baa1c87446aa919e5b396abba95')
    response = response_plain.json()
    states=[]
    population=[]
    vaccinationsCompleted=[]
    vaccinationsInitiated=[]
  

    for item in response:
        states.append(item['state'])
        if(item['population']!=None):
            population.append(item['population'])
        else:
            population.append(0)

        if(item['actuals']['vaccinationsInitiated']!=None):
            vaccinationsInitiated.append(item['actuals']['vaccinationsInitiated']-item['actuals']['vaccinationsCompleted'])
        else:
            vaccinationsInitiated.append(0)

        if(item['actuals']['vaccinationsCompleted']!=None):
            vaccinationsCompleted.append(item['actuals']['vaccinationsCompleted'])
        else:
            vaccinationsCompleted.append(0)
        
        
    response_data = {  'labels':states,
                        'datasets': [
                            {
                            'label': 'Remaining population not vaccinated',
                            'data': population,
                            'backgroundColor': 'rgb(75, 192, 192)',
                            },
                            {
                            'label': 'Population vaccinated with one dose',
                            'data': vaccinationsInitiated,
                            'backgroundColor': 'rgb(255, 99, 132)',
                            },
                            {
                            'label': 'Vaccination completed population',
                            'data': vaccinationsCompleted,
                            'backgroundColor': 'rgb(53, 162, 235)',
                            },
                          
                        ],
                    }
    return {"response":response_data}

@cross_origin()
@app.route('/get_positive_case', methods=["get"])
def get_positive_case():
    response_plain = requests.get('https://api.covidactnow.org/v2/states.json?apiKey=fc593baa1c87446aa919e5b396abba95')
    response = response_plain.json()
    states=[]
    postiveCase=[]
    deaths=[]
  

    for item in response:
        states.append(item['state'])
        if(item['actuals']['positiveTests']!=None):
            postiveCase.append(item['actuals']['positiveTests'])
        else:
            postiveCase.append(0)

        if(item['actuals']['deaths']!=None):
            deaths.append(item['actuals']['deaths'])
        else:
            deaths.append(0)

        
        
    response_data = {  'labels':states,
                        'datasets': [
                            {
                            'label': 'Positive Covid cases',
                            'data': postiveCase,
                            'backgroundColor': 'rgb(75, 192, 192)',
                            },
                            {
                            'label': 'deaths by covid',
                            'data': deaths ,
                            'backgroundColor': 'rgb(255, 99, 132)',
                            }
                        ],
                    }
    return {"response":response_data}

@cross_origin()
@app.route('/get_today_positive_case', methods=["get"])
def get_today_positive_case():
    response_plain = requests.get('https://api.covidtracking.com/v1/states/current.json')
    response = response_plain.json()
    states=[]
    postiveCase=[]
    deaths=[]
  

    for item in response:
        states.append(item['state'])
        if(item['positive']!=None):
            postiveCase.append(item['positive'])
        else:
            postiveCase.append(0)

        if(item['death']!=None):
            deaths.append(item['death'])
        else:
            deaths.append(0)

        
        
    response_data = {  'labels':states,
                        'datasets': [
                            {
                            'label': 'Positive Covid cases',
                            'data': postiveCase,
                            'backgroundColor': 'rgb(75, 192, 192)',
                            },
                            {
                            'label': 'deaths by covid',
                            'data': deaths ,
                            'backgroundColor': 'rgb(255, 99, 132)',
                            }
                        ],
                    }
    return {"response":response_data}

@cross_origin()
@app.route('/get_today_positive_stat', methods=["get"])
def get_today_positive_stat():
    response_plain = requests.get('https://api.covidtracking.com/v1/states/current.json')
    response = response_plain.json()
    response_data=[]
    f = open('states_hash.json')
    states_map= json.load(f)
  

    for item in response:
        positive=0
        if(item['positive']!=None):
            positive= (item['positive'])
       
        response_data.append({"state":states_map[item['state']],"positive":positive})
    return {"response":response_data}

@cross_origin()
@app.route('/get_symptom_prediction', methods=["get","post"])
def get_symptom_prediction():
    regressor = LinearRegression()
    df = getRawData()
    y = df['Severity']
    X = df[['Fever','Tiredness','Dry-Cough','Difficulty-in-Breathing','Sore-Throat','Pains','Nasal-Congestion','Runny-Nose','Diarrhea']]
    SEED = 42
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2,random_state=SEED)
    X.shape # (48, 4)
    regressor = LinearRegression()
    regressor.fit(X_train, y_train)
    LinearRegression()
    print(request.json)
    data = [request.json]
    
    actual = pd.DataFrame(data)
    y_pred = regressor.predict(actual)
    predictedData = data[0]
    predictedData['Severity']=2 if y_pred[0]>=1.5 else 0
    insertRecord(predictedData)
    return {"prediction":"You have Covid Symptoms" if y_pred[0]>=1.5 else "You don't have Covid Symptoms"}
# Creates DataFrame.

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 4000))
    initializeConnection()
    app.run(debug=True, host='0.0.0.0', port=port)