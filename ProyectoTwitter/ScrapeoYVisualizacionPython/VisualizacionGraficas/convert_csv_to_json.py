import csv
import json


def csvConvert(csv_path,json_path):
    jsonData = {}

    with open(csv_path, encoding='utf-8') as csvfile:
        csvData = csv.DictReader(csvfile)
        for rows in csvData:
            key = rows['user.name']
            jsonData[key] = rows


    with open(json_path,'w', encoding='utf-8' ) as jsonfile:
        jsonfile.write(json.dumps(jsonData))



csv_path = r'data_tweets.csv'
json_path = r'data_tweets.json'

csvConvert(csv_path,json_path)

print("Todo transformado correctamente")