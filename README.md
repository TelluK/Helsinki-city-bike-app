# Helsinki-city-bike-app

To connect to MongoDB, needs a .env file with MONGODB_URI that contains the address to the database. Add .env file to root of this repository. 

### Instructions how to import data from csv files to empty MongoDB collection
Download three datasets of journey data. The data is owned by City Bike Finland.

* <https://dev.hsl.fi/citybikes/od-trips-2021/2021-05.csv>
* <https://dev.hsl.fi/citybikes/od-trips-2021/2021-06.csv>
* <https://dev.hsl.fi/citybikes/od-trips-2021/2021-07.csv>

Download also dataset that has information about Helsinki Region Transport’s (HSL) city bicycle stations.

* Stations dataset: <https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.csv>
* License and information: <https://www.avoindata.fi/data/en/dataset/hsl-n-kaupunkipyoraasemat/resource/a23eef3a-cc40-4608-8aa2-c730d17e8902>

Rename stations dataset to be bikeStations.csv .
The three journey datasets names stay the same: 2021-05.csv, 2021-06.csv, 2021-07.csv .
Move these csv files to folder csvFiles.

To import this one stations (bikeStations.csv) file to an empty collection in MongoDb run command: 
node parseStationsCsvFiles.js

To import those three journey files to an empty collection in MongoDb run command:
node parseJourneyCsvFiles.js

I'm using MongoDB's free M0 shared cluster, where storage size is only 512 MB. So I could not add all journeys to database. I imported 457 stations and 1804278 journeys to MongoDB.

### Server side
To start server side run commmand: npm start 

To start server side with nodemon run command: npm run dev 
