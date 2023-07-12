import argparse, urllib, json
import sys
from pymongo import MongoClient, GEOSPHERE
from pymongo.errors import (PyMongoError, BulkWriteError)
from chance import chance
import datetime
import csv

userslist = ["josefano", "dadad", "d1d29j1d121d21d1", "dadajijid1", "fsvamivasacsac", "DSdadaadsaa"]

def generate_fake_users(count=5):
    i = 0
    users = []
    # d = datetime.datetime.strptime("2017-10-13T10:53:53.000Z", "%Y-%m-%dT%H:%M:%S.000Z")
    now = datetime.datetime.now()
    while i < count:
        users.append(
            {
                "username": chance.pickone(userslist),
                "password": "test",
                "isDriver": False,
                "role": 1,
                "createdAt": now,
                "lastSeenOnline": now
            }
        )
        i += 1

    return users

# def insert_users(client):
#     continue

def insert_equipment(db):
    with open('misc/equipdataset.csv') as csv_file:
        csv_reader = csv.DictReader(csv_file, delimiter=',')
        line_count = 0
        for row in csv_reader:
            if line_count == 0:
                print(f'Column names are {", ".join(row)}')
                line_count += 1
            else:
                row_dict = dict(row)
                db.equipment.insert_one({
                    "eqpNum": row_dict["EQP_NR"],
                    "eqpModelYear": row_dict["EQP_MDL_YR_DT"],
                    "eqpMake": row_dict["EQP_MNU_ABR_NA"],
                    "eqpTypeCode": row_dict["EQP_CGP_CD"],
                    "buildingCode": row_dict["MTN_FAC_MNM_NA"],
                    "reportedMissing": False,
                    "reportedMissingDate": None,
                    "lastUpdated": datetime.datetime.now(),
                })
                line_count += 1

        print(f'Processed {line_count} lines.')

# def insert_buildings():


def main():
    parser = argparse.ArgumentParser()
    # Define the script command arguments   
    # parser.add_argument(
    #     '--to', 
    #     type= str, 
    #     required=True
    # )
    # parser.add_argument(
    #     '--subject',
    #     type= str,
    #     required=True
    # )
    # parser.add_argument(
    #     '--attachment',
    #     type= str,
    #     required=True
    # )
    args = vars(parser.parse_args()) 
    print("hello world")

    try:
        client = MongoClient()
    except: 
        sys.exit("Error connecting to mongodb")
       
    db = client["hackathon2023"]
    print(db)
    users = db["users"]
    fake_users = generate_fake_users(4)
    results = users.insert_many(fake_users)
    print(results.inserted_ids)

    insert_equipment(db)

if __name__ == "__main__":
    main()