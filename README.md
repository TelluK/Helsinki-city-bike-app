# Helsinki-city-bike-app

City Bikes web application lists city bicycle stations in Helsinki and Espoo and also displays journey details from 2021 data. Project backend is running on a free hosting service, check [City Bikes]( https://city-bikes.onrender.com/).

Application was developed as a response for [Solita Dev Academy 2023 pre-assignment](https://github.com/solita/dev-academy-2023-exercise).

## Features

### How data was imported

 * Data was imported from csv files to database in MongoDB.
 * Mongoose was used to define journey and station schemas, models and communicating with database in MongoDB.
 * CSV parser was used when data was read from CSV file and each row was validated.
 * In this project data validation means: 
    - doesn't import journeys that have duration less than ten seconds or covered distance is shorter than 10 meters.


### Journeys view
 
 * List journeys in table. Showing journey departure and return times, departure and return stations, covered distance in kilometers and journey duration in minutes.
 * Station name is a link to station details view. 
 * Pagination is implemented. User can select how many rows (options: 15, 20, 25, 50, 100) are shown per page. 

### Stations view

 * List stations in table. Showing station name, address and city.
 * Station name is a link to station details view. 
 * Search by station name.
 * Pagination is implemented. User can select how many rows (options: 15, 20, 25, 50, 100) are shown per page. Also search results are paginated.

 ### Station details view

* Show single station name and address.
* Requests stats from database. Shows the number of journeys
    - starting from the station
    - ending at the station


## Technologies used

* [Node](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [Mongoose](https://mongoosejs.com/)
* [React](https://reactjs.org/)
* [Axios](https://github.com/axios/axios)
* [Material UI](https://mui.com/)
* [React Router](https://reactrouter.com/en/main)
* [CSV parser](https://www.npmjs.com/package/csv-parse)

This single-page application ([SPA](https://developer.mozilla.org/en-US/docs/Glossary/SPA)) uses client-server design.  
Project was developed on Windows computer using Node version 16. I used VS Code editor with [Prettier](https://prettier.io/) and 
[REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extensions. I had not used Material UI and CSV parsing before this project, other technologies were little bit familiar from courses like [Full Stack Open](https://fullstackopen.com/en/). 

I'm using MongoDB's free M0 shared cluster, where storage size is only 512 MB. So, I couldn’t add all journeys to database. I imported 457 stations and 1804278 journeys to MongoDB database.


## Running it locally

[Git](https://git-scm.com/) and [Node](https://nodejs.org/en/) (comes with npm) need to be installed on computer. Node version 16 was used in development.
1. clone this repository 
2. `cd Helsinki-city-bike-app` 
3. add .env file to root of this repository. To connect to MongoDB, needs a .env file with MONGODB_URI that contains the address to the database, file contains also server side PORT number.
4. to install server side dependencies run `npm install`
5. `cd client`
6. to install client side dependencies run `npm install`

Now all dependencies should be installed.

7. to start server run `npm start` at root of this repository.
8. to start client run `npm start` in client folder.

If client side compiled successfully, then application can be viewed in the browser by opening [http://localhost:3000](http://localhost:3000) .


## Database

MongoDB database is used to store journeys and stations collections. Mongoose is used to define journey and station schemas, models and communicating with database in MongoDB. Folder `models` contains journey and station schema and model.

MongoDB stores data as documents that have field-value pairs. When data is inserted to MongoDB, it adds _id field and generates ObjectID values to every document. 

### Journey document object example

```javascript
{
  departureTime: "2021-05-31T23:41:33",
  returnTime: "2021-06-01T00:06:01",
  departureStationId: 30,
  departureStationName: "Itämerentori",
  returnStationId: 19,
  returnStationName: "Rautatientori / itä",
  coveredDistanceM: 2964,
  durationSec: 1464
}
```

### Station document object example

```javascript
{
  FID: 1,
  ID: 501,
  Nimi: "Hanasaari",
  Namn: "Hanaholmen",
  Name: "Hanasaari",
  Osoite: "Hanasaarenranta 1",
  Adress: "Hanaholmsstranden 1",
  Kaupunki: "Espoo",
  Stad: "Esbo",
  Operaattor: "CityBike Finland",
  Kapasiteet: 10,
  x: 24.840319,
  y: 60.16582
}
```
### Instructions how to import data from csv files to empty MongoDB collection

If your MongoDB database allready contains stations and journeys data, skip this part.

Download three datasets of journey data. The data is owned by City Bike Finland.

* <https://dev.hsl.fi/citybikes/od-trips-2021/2021-05.csv>
* <https://dev.hsl.fi/citybikes/od-trips-2021/2021-06.csv>
* <https://dev.hsl.fi/citybikes/od-trips-2021/2021-07.csv>

Download also dataset that has information about Helsinki Region Transport’s (HSL) city bicycle stations.

* Stations dataset: <https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.csv>
* License and information: <https://www.avoindata.fi/data/en/dataset/hsl-n-kaupunkipyoraasemat/resource/a23eef3a-cc40-4608-8aa2-c730d17e8902>

Rename stations dataset to be bikeStations.csv .
The three journey datasets names stay the same: 2021-05.csv, 2021-06.csv, 2021-07.csv .
Move these csv files to folder `csvFiles`.

To import this one stations (bikeStations.csv) file to an empty collection in MongoDb run command: 
`node parseStationsCsvFiles.js` at root of this repository.

To import those three journey files to an empty collection in MongoDb run command:
`node parseJourneyCsvFiles.js` at root of this repository.

I'm using MongoDB's free M0 shared cluster, where storage size is only 512 MB. So I could not add all journeys to database. I imported 457 stations and 1804278 journeys to MongoDB.

## Client side

All frontend code is in `client` folder, where `package.json` file contains all client side dependencies.

To start client side run commmand `npm start`

## Server side

Everything exect client folder is server side code. At root of this repository is `package.json` file that contains all server side dependencies.

To start server run commmand `npm start` 

To start server in development mode with [nodemon](https://www.npmjs.com/package/nodemon) run command `npm run dev`

## API

### stations operations

|        |           |           |
| -----  | --------- |  --------- |
| GET    | /stations?page&rowsPerPage&searchForName | get stations list with pagination and search |
| GET    | /stations/{stationID} | get single station  |
| GET    | /stations/search/{stationNameString} | search stations by name, get stations list (not used in app) |
| POST   | /stations | create a new station (server has endpoint, not used in app)  |

### journeys operations

|        |           |           |
| -----  | --------- |  --------- |
| GET    | /journeys?page&rowsPerPage | get journeys list with pagination |
| GET    | /journeys/{stationID} | get journey stats for single station  |
| POST   | /journeys | create a new journey (server has endpoint, not used in app)  |

## File hierarchy

```
│   .env                      ## add .env file locally
│   .gitignore
│   .prettierignore
│   .prettierrc.json
│   app.js
│   index.js
│   package-lock.json
│   package.json
│   parseJourneyCsvFiles.js
│   parseStationsCsvFiles.js
│   README.md
│
├───client
│   │   .gitignore
│   │   package-lock.json
│   │   package.json
│   │   README.md
│   │
│   ├───public
│   │       favicon.ico
│   │       index.html
│   │
│   └───src
│       │   App.js
│       │   index.js
│       │
│       ├───components
│       │       Footer.js
│       │       Home.js
│       │       Journeys.js
│       │       Navbar.js
│       │       Search.js
│       │       StationDetails.js
│       │       Stations.js
│       │       TablePagination.js
│       │
│       └───services
│               journeys.js
│               stations.js
│
├───controllers
│       journeys.js
│       stations.js
│
├───csvFiles
│       info.txt
│
├───models
│       journey.js
│       station.js
│
└───requests
        create_journey.rest
        create_station.rest
        get_journey.rest
        get_station.rest
        get_stations_if_name_contains.rest
```
