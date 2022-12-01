from pymongo import MongoClient
import pandas as pd

def initializeConnection():  
    client = MongoClient("mongodb://mongo:mongo@mongo:27017/")
    mydatabase = client["admin"]
    
    #symptom={'Fever':1,'Tiredness':1,'Dry-Cough':1,'Difficulty-in-Breathing':1,'Sore-Throat':1,'Pains':0,'Nasal-Congestion':0,'Runny-Nose':0,'Diarrhea':1,'Severity':1}
    
    if 'covid_symptoms' not in (mydatabase.list_collection_names()):
        symptoms=mydatabase["covid_symptoms"]
        df = pd.read_csv('Cleaned-Data.csv')
        df = df.assign(Severity=df.apply(set_severity, axis=1))
        X = df[['Fever','Tiredness','Dry-Cough','Difficulty-in-Breathing','Sore-Throat','Pains','Nasal-Congestion','Runny-Nose','Diarrhea','Severity']]
        symptoms.insert_many(X.to_dict('records'))
   
def set_severity(row):
        if row["Severity_Mild"] == 1:
            return 1
        elif row["Severity_Moderate"] == 1:
            return 2
        elif row['Severity_Severe']==1:
            return 3
        else:
            return 0

def getRawData():
    client = MongoClient("mongodb://mongo:mongo@mongo:27017/")
    mydatabase = client["admin"]
    symptoms=mydatabase["covid_symptoms"]
    return pd.DataFrame(list(symptoms.find()))

def insertRecord(record):
    client = MongoClient("mongodb://mongo:mongo@mongo:27017/")
    mydatabase = client["admin"]
    symptoms=mydatabase["covid_symptoms"]
    symptoms.insert_one(record)