[![Build Status](https://travis-ci.org/steve-delp/threatmap.svg?branch=master)](https://travis-ci.org/steve-delp/threatmap)

Threatmap
===========

This is a simple React app that displays sites known to have distributed malware.  The app currently only displays ransomware sites within the United States.


Features
--------

 * Zoomable map to visualize geo-location of the sites.
 * Grid control to present tabular data about the sites displayed on the map
 * Search control to filter the data displayed.  
 * Consumes site data from a web service via a REST API.  


Installation and Usage
----------------------

- Copy or clone this git repo [threatmap_service](https://github.com/steve-delp/threatmap_service.git)
- Start the service.  The service will load an in-memory h2 database with the site data.  This might take ~30 seconds depending on your system.
```sh
$ cd threatmap_service
$ ./gradlew bootRun
```

- Copy or clone this git repo [threatmap](https://github.com/steve-delp/threatmap.git)
- Get an API key for google maps from [developers.google.com](https://developers.google.com/maps/documentation/javascript/get-api-key)
- Add the key to the top of the ThreatMap.js file.
- Start the app.
```sh
$ cd threatmap
$ npm start
```

Credits
-------

- The ransomware site data was provided by [Ransomware Tracker](https://ransomwaretracker.abuse.ch/feeds).  
- The location data was provided by [IP2Location](https://lite.ip2location.com/).  
- The map component used is courtesy of [react-gmaps](https://github.com/MicheleBertoli/react-gmaps). 
- The data grid component used is courtesy of [fixed-data-table](https://github.com/schrodinger/fixed-data-table-2).
