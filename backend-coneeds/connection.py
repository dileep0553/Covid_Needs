from pymongo import MongoClient
  
def initializeConnection():  
    client = MongoClient("mongodb://mongo:mongo@mongo:27017/")
    mydatabase = client["health-care"]
    testCollection=mydatabase["test_col"]
  
    recDict={
    'title': 'MongoDB and Python', 
    'description': 'MongoDB is no SQL database', 
    'tags': ['mongodb', 'database', 'NoSQL'], 
    'viewers': 104 
    }
    
    rec = testCollection.insert_one(recDict)
    print(rec)
  