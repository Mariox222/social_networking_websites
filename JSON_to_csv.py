import csv
import json  
  
# Opening JSON file and loading the data 
# into the variable data 
with open('public/filteredJson.json') as json_file: 
    data = json.load(json_file) 
  
#print(data[0])

with open('public/filteredCsv.csv', 'w', newline='') as csvfile:
    writer = csv.writer(csvfile, delimiter=',', quotechar='\"', quoting=csv.QUOTE_MINIMAL)
    
    header = list(data[0].keys())
    header.pop(-1)
    header.append("founder_first_name")
    header.append("founder_last_name")
    writer.writerow(header)

    for network in data:
        
        firstPart = list(network.values())[:-1]
        
        for founder in network.get("founders"):
            row = []
            row = firstPart.copy()

            row.append(founder.get("first_name"))
            row.append(founder.get("last_name"))
            
            writer.writerow(row)
            
            
