# JobIO

#### Epicodus Capstone Project - Last Updated July 30th, 2020

#### By _**Matt Stroud**_

## Description
JobIO is a job application manager created to simplify your job search by increasing the efficiency of managing and tracking your application status, interviews, and follow ups.  

Users can search for jobs on the site, which will display webscraped results from popular job boards. These jobs can be added to their pipeline, after which users can view detailed analytics, and easily manage their applications.

## Screenshots
![JobIO dashboard screenshot.](https://raw.githubusercontent.com/mlstroud/JobIO/styling/client/src/img/dashboard.png)

![JobIO job search screenshot.](https://github.com/mlstroud/JobIO/blob/styling/client/src/img/search.png?raw=true)

![JobIO interview editing screenshot.](https://github.com/mlstroud/JobIO/blob/styling/client/src/img/interview.png?raw=true)

## Component Diagram

![Component diagram for tap room application.](https://raw.githubusercontent.com/mlstroud/JobIO/master/componentdiagram.png)

## Minimum Viable Product

| |Features|
|--|-------|
| :heavy_check_mark: |Users can search for jobs |
| :heavy_check_mark: |JobIO Webscrapes job boards for data |
|:heavy_check_mark: | Users can add jobs to their pipeline |
| :heavy_check_mark: |Users can view all tracked applications |

## Stretch Goals

| |Features |
|--|-------|
| :heavy_check_mark: |Authentication & Authorization |
| :heavy_check_mark: |User specific data |
| :heavy_check_mark: |Styled UI |
| :heavy_check_mark: |Application Analytics |
| |Result Filtering |
| |Hosting |

## Setup/Installation Requirements

1. Navigate to the parent directory you would like to store the project's directory in.
```
cd DIRECTORYNAME
```
2. Clone the repository from github, and navigate to its directory.
```
git clone https://github.com/mlstroud/JobIO.git
cd merch-site
```
3. Navigate to client directory and install required dependencies.
```
cd client
npm install
```
4. Navigate to server directory and install required dependencies.
```
cd server
npm install
```
5. Start the server and client applications (you should still be in the server directory at this point).
```
npm start
cd ..
cd client
npm start
```
> If the browser does not automatically launch, you can generally view it at https://localhost:3000

## Known Bugs
 
## Support and contact details

_Have a bug or an issue with this application? [Open a new issue](https://github.com/mlstroud/JobIO/issues) here on GitHub._

## Technologies Used

| | | |
|--|--|--|
| React | JavaScript | Express |
| Redux | JSX | Firestore |
| Axios | Cheerio | CORS |
| Google Charts | Reactstrap | Material-UI |
| HTML | CSS | Git |

### License

This software is licensed under the MIT license.

Copyright © 2020 **_Matt Stroud_**