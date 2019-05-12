//setup global map variable

var rail = aucklandRail;
var stations = trainNames;
var busS = bus;
var busRR = busRoute;
var cycleR = cycles;
var parkE = parkExtent;
console.log(rail);
//console.log(stations);
//console.log(busS);
//console.log(busRR);
//console.log(cycleR);
//console.log(parkE);

var info, map, layer, busGroup, cycleGeo, railLines, ferryRoutes, Bmarkers, slideMenu, parkExtentLayer, transitResult, box, buffStops, buffStopsTwo, trainDistOne, trainDistTwo, dissolvedGeo, trainExtent, trainExtentGroup, start, end, startName, endName, markerStart, markerEnd, walkingPaths, geojson ;

layer = geojson;
if (layer){
    map.removeLayer(layer)
};

function defaultSidebar (){
    // setting the default slide menu contents using innerHTML
    // NB the quotes are necessary for innerHTML
    contents = '<div><id="slide-menu-start-page"><br><h1>Auckland Public Transit and Recreation Map</h1></div>';
    // NB the += sign which means the bottom text is added to the above text
    contents += '<br><p>Welcome to the Auckland Transit alternative transportation and recreation webapp! This is an interactive map designed to facilitate low carbon travel, and to show alternative methods of mobility in and around Auckland. Press any of the buttons along the bottom to show differing layers. This sidebar will also update with functionality depending on which layer is selected. If you right click on the map and press "Get Cycling Isochrones" you can see how far you can get within 30 minutes of the click. Try it out! Also shown are some of Aucklands most famous walks, with turn by turn directions provided. The train network layer is useful for people who are planning to move house, and want to be served on a commuter rail line. This can show distances of 1km and 2km from the Auckland Metro stations. Finally a layer with all of Aucklands parks, and a few of the most striking can be found and zoomed too! Enjoy facilitating your new low carbon opportunities';

    // the function to set the contents using the variable contents
    slideMenu.setContents(contents);
}

// the function to clear the route input and routes
function clearButton() {
    document.getElementById('start').value = "Start Location..."; // reset the search box
    document.getElementById('end').value = "End Location..."; // reset the search box
    map.setView([-36.848461, 174.763336,], 11); // reset the view
    map.removeLayer(geojson); // remove the route geoJson
    map.removeLayer(markerStart); // remove the markers
    map.removeLayer(markerEnd); // remove the markers
    document.getElementById('directions').innerHTML = "Type in two locations or select a preset route to show directions";} // reset the table



// the function to populate the geocode routes with preset walks
function populateRoutes(){
    //remove the old layer
    console.log(geojson);
    document.getElementById('start').value = "Silo Park, Auckland"; // using a .value tag to append the search box value
    document.getElementById('end').value = "Beachcroft Ave, Auckland"; // using a .value tag to append the search box value

}

// the function to populate the geocode routes with preset walks
function populateRoutesTwo(){

    console.log(geojson);

    document.getElementById('start').value = "Shelly Beach Rd, Herne Bay, Auckland"; // using a .value tag to append the search box value
    document.getElementById('end').value = "25 Judges Bay Rd, Auckland"; // using a .value tag to append the search box value

}

// the function to populate the geocode routes with preset walks
function populateRoutesThree(){
    console.log(geojson);

    document.getElementById('start').value = "Devonport, Auckland 0624, New Zealand"; // using a .value tag to append the search box value
    document.getElementById('end').value = "Beach Rd, Long Bay, Auckland 0792, New Zealand"; // using a .value tag to append the search box value

}



function reachabilityFunction(button){
    var marker;
    if (marker){
        map.removeLayer(marker);
    }

    if (button.value === "1"){
        map.flyTo([-36.844014, 174.76701], 15);


    } else if (button.value === "2"){
        map.flyTo([-36.8696262, 174.7788817], 15);

    } else if (button.value === "3"){
        map.flyTo([-36.9100, 174.8167], 15);

    } else if (button.value === "4"){
        map.flyTo([-36.9416629, 174.83333], 15);

    } else if (button.value === "5"){
        map.flyTo([-36.989082, 174.855706], 15);

    }
}

console.log(geojson);
// the function created to switch layers using radio buttons
function switchLayer(radio) {

    //remove the old layer
    if (layer){
        map.removeLayer(layer);
    }

    //add new layer
    if(radio.value === "1"){
        layer = busGroup.addTo(map);
        map.fitBounds(busGroup.getBounds()); // using fit bounds to zoom to the extent of the layer
    } else if (radio.value === "2"){
        layer = cycleRouteLayer.addTo(map);
        map.fitBounds(cycleRouteLayer.getBounds()); // using fit bounds to zoom to the extent of the layer
    } else if (radio.value === "3"){
        layer = ferryRoutes.addTo(map);
        map.fitBounds(ferryRoutes.getBounds()); // using fit bounds to zoom to the extent of the layer
    } else if (radio.value === "4"){
        layer = trainGroup.addTo(map);
        map.fitBounds(trainGroup.getBounds().pad(0.5)); // using fit bounds to zoom to the extent of the layer
    } else if (radio.value === "5"){
        layer = transitResult.addTo(map);
        map.fitBounds(transitResult.getBounds());
        reachabilitySidebar(); // using fit bounds to zoom to the extent of the layer
    } else if (radio.value === "6"){
        layer = box.addTo(map);
        map.fitBounds(box.getBounds()); // using fit bounds to zoom to the extent of the layer
    } else if (radio.value === "7"){
        layer = parkExtentLayer.addTo(map);
        map.fitBounds(parkExtentLayer.getBounds()); // using fit bounds to zoom to the extent of the layer
    } else if (radio.value === "8"){
        layer = walkingPaths.addTo(map);
        map.fitBounds(walkingPaths.getBounds()); // using fit bounds to zoom to the extent of the layer
    }

}

// the function to change the extent shown from the slideMenu
function changeExtent(button){
    //remove the old layer
    if (layer){
        map.removeLayer(layer);
    } if (button.value === "1") {
        layer = trainExtent.addTo(map) // adding the new layer
    } else if (button.value === "2") {
        layer = box.addTo(map) // adding the new layer
    }
}


// switching the distance from train station button
function switchTrainDist (button){
    //remove the old layer
    if (layer){
        map.removeLayer(layer);
    }
    //add new layer
    if(button.value === "1"){
        layer = trainDistOne.addTo(map); //add new layer
    } else if (button.value === "2") {
        layer = trainDistTwo.addTo(map); //add new layer
    } else if (button.value === "3") {
        layer = trainGroup.addTo(map); //add new layer
    }
}

// the function for the clear map button
function clearLayers(button){
    map.removeLayer(layer); // removing layers
    defaultSidebar();
    map.removeLayer(geojson); // removing geocode routes
    map.removeLayer(markerStart); // removing geocode markers
    map.removeLayer(markerEnd); // removing geocode markers

};

// the function to not allow a button press until the search bar is filled!
function noButtonPress(){
    if (document.getElementById('start').value === ""){
        document.getElementById('submitButton').disabled = true;
    } else {
        document.getElementById('start').addEventListener('keyup', function() {
            document.getElementById('submitButton').disabled = false;
            console.log('Got keyup event.');
        })
    }
}

function reachabilitySidebar() {
    contents = '<br><h1>Auckland Transit Reachability</h1><br>';
    contents += '<p>The transit reachability for Auckland uses the Targomo API to generate geoJson isochrones from the major transit hubs in Auckland. Targomo is generally a paid service, but has a free tier. It was used instead of OpenRouteService (ORS), as ORS does not do transit reachability isochrones. For more information on Targomo click <a href="https://www.targomo.com/" target="_blank">here</a>';
    contents += '<br>';
    contents += '<button class="reachBtn" id="britomarketButton" value="1" onclick="reachabilityFunction(this)">Britomart Train Station</button>';
    contents += '<button class="reachBtn" id="newmarketButton" value="2" onclick="reachabilityFunction(this)">Newmarket Train Station</button>';
    contents += '<button class="reachBtn" id="penroseButton" value="3" onclick="reachabilityFunction(this)">Penrose Train Station</button>';
    contents += '<button class="reachBtn" id="otahuhButton" value="4" onclick="reachabilityFunction(this)">Otahuh Train Station</button>';
    contents += '<button class="reachBtn" id="puhinuiButton" value="5" onclick="reachabilityFunction(this)">Puhinui Train Station</button>';
    contents += '<br>';
    contents += '<h1>Transit Reachability Legend</h1>';
    contents += '<i id="circle" style="background:#038c06"></i>' + '<span id="travel-times-one">10 minutes</span>';
    contents += '<br>';
    contents += '<br>';
    contents += '<i id="circle" style="background:#ffa800"></i>' + '<span id="travel-times-two">20 minutes</span>';
    contents += '<br>';
    contents += '<br>';
    contents += '<i id="circle" style="background:#7a0d00"></i>' + '<span id="travel-times-three">30 minutes</span>';
    contents += '<br>';
    contents += '<br>';

    slideMenu.setContents(contents);
}


// the functions to zoom to the parks
function zoomPark(button){
    // else if statement using button values
    if (button.value === "1"){map.flyTo([-36.8591584, 174.7758079], 15)} // if button X is pressed fly to these coordinates
    else if (button.value === "2"){map.flyTo([-36.94632488894792, 174.52880859375], 11.8)} // if button X is pressed fly to these coordinates
    else if (button.value === "3"){map.flyTo([-36.866667, 174.733333], 15)} // if button X is pressed fly to these coordinates
    else if (button.value === "4"){map.flyTo([-36.83030982582071, 174.42787170410153], 14)} // if button X is pressed fly to these coordinates

}

// the button to start geocoding for walking directions
// document.getElementById('submitButton').onclick = startGeocoding;
/**
 * Initialise the Map
 */

async function initMap() {



    // initialising the variables for the start and end names for geocoding
    startName;

    endName;


   // this is a variable that holds the reference to the Leaflet map object
    window.map = L.map('map', {zoomControl: false, minZoom: 8,  contextmenu: true,
        contextmenuWidth: 200, // the context menu for the cycling isochrones
        contextmenuItems: [
            {
                text: 'Get Cycling Isochrones',
                callback: getRightClick // callback to the ORS API isochrone function
            }, {text: 'Clear', callback: clearIsochrones} // the clear right click button
        ]}).setView([-36.848461, 174.763336,], 11);   //this will give a map of Auckland


        // create targomo client for the transit reachability, as ORS does not offer this yet.
        const client = new tgm.TargomoClient('australia', 'IU7K3S894FQCYDT1VGCG156909942');

        // Coordinates centered on Britomart Transit station, the main hub for public transit in central Auckland
        const center = [-36.844014, 174.76701];
        // coordinates centered on Newmarket Station
        const centerTwo = [-36.8696262, 174.7788817];
        // coordinates centered on Penrose Station
        const centerThree = [-36.9100, 174.8167];
        // coordinates centered on Otahuhu Station
        const centerFour = [-36.9416629, 174.83333];
        // coordinates centered on Puhinui Station
        const centerFive = [-36.989082, 174.855706];

        // The next segment is Targomo Options
        // polygons time rings
        const travelTimes = [600, 1200, 1800];

        // options for the targomo plugin
        const options = {
            travelType: 'transit',
            travelEdgeWeights: travelTimes,
            maxEdgeWeight: 1800,
            transitMaxTransfers: 2,
            edgeWeight: 'time',
            srid: 4326,
            serializer: 'geojson'
        };

        // define the starting point using center Coordinates above
        const sources = [{id: 0, lat: center[0], lng: center[1]}, {id: 1, lat: centerTwo[0], lng: centerTwo[1]}, {id: 1, lat: centerThree[0], lng: centerThree[1]}, {id: 1, lat: centerFour[0], lng: centerFour[1]}, {id: 1, lat: centerFive[0], lng: centerFive[1]}];

       // Add markers for the sources on the map. (Removed this but will re-add)
        sources.forEach(source => {L.marker([source.lat, source.lng])
         });


        // the code to fetch the targomo reachability then turn it into geoJson using a short hand function
        client.polygons.fetch(sources, options).then((result) => {
            transitResult = L.geoJson(result, {style: styleTransitTime
            });
            // having some issues parsing geoJson from this.
        });

        // the radio removal function
        layer = transitResult;
        if (layer){
            map.removeLayer(layer)
        }

        // The function to style the transit reachability layer using the values from "travelTimes"
        function travelTimeColours(time){
            var colour;
            if (time === 600){
                colour = '#038c06'
            } else if (time === 1200){
                colour = '#ffa800'
            } else if (time === 1800){
                colour = '#7a0d00'
            }
            return colour;
        }

        function reachabilitySidebar(){
            var contents = 'Test';
            slideMenu.setContents(contents);
        }

    /**
     *  This function styles the Transit reachabilty layer
     */
    function styleTransitTime(feature) {
        //return a style
        return {
            weight: 2,
            color: travelTimeColours(feature.properties.time), // from the function made above
            opacity: 1,
            //the colour is set using a function
        };
    };


    // the callback function for the context menu
    function getRightClick(e){
        getIsochrones([e.latlng.lng,e.latlng.lat]); // getting the lat long on mouse click
    }

    // The function to do the cycling isochrones
    function getIsochrones(point){
        $.ajax({  // using JQERY for the GET command
            type: "GET", //rest Type
            dataType: 'json',
            url: "https://api.openrouteservice.org/isochrones?locations=" + String(point[0]) + "," + String(point[1]) +"&profile=cycling-regular&range_type=time&interval=300&range=1800&units=&location_type=start&intersections=false&api_key=5b3ce3597851110001cf6248c200fe68aa1c44359374f4a513372658", // the string(point) gets the users latlong from the click, and turns it into a string where it is put into the ORS url text
            async: false,
            contentType: "application/json; charset=utf-8",
            success: function (data) { // on success create a data layer
                map.eachLayer(function (layer) {
                    if (layer.id === 'access'){// if layer = access then remove for the next layer
                        map.removeLayer(layer); // adding the removal for the next time the map is clicked
                    }
                });
                // using the turf difference to make sure the polygons do not overlap
                var difference=[]; // a loop to subtract the smaller polyons from the larger ones in a loop
                for (i=0; i<(data.features.length-1); i++){
                    console.log(i);
                    difference.push(turf.difference(data.features[i+1],data.features[i])); // push the data.features in a +1 iteration and the simple iteration for data.features
                }
                difference.push(data.features[0]); // pushing the difference so the rings are made hollow and do not overlap
                data.features=difference; // overwritting data.features with the difference created
                // creating a variable called access and adding the data to it using L.geoJson.
                access = new L.geoJson(data,{
                    onEachFeature: function(feature,layer){
                        layer.bindPopup("Isochrone: " + feature.properties.value);
                    },
                    style: function(feature) {
                        ratio=feature.properties.value/1800; // setting a style function using an RGB calculation based on the ratio of the time value compared to the maximal value of 30 mins
                        return {color :"rgb(" + String(Math.round(255*ratio)) + "," + String(Math.round(255*(1-ratio)))+ ", 0)",
                            opacity: 0.6};
                    }
                }).addTo(map);
                access.id="access";
            }
        });
    }

    // function to clear the isochrones
    function clearIsochrones(e){map.removeLayer(access)}

    // creating a get function to get the train schedule
    function getSchedule(){
        $.ajax({
            type: "GET",
            dataType: 'json',
            url: "https://transit.land/api/v1/schedule_stop_pairs?feed_onestop_id=f-rck-gowest~sealinkgroup~atairporter~atmetro~thepartybuscompany",
            async: false,
            contentType: "application/json; charset=utf-8",
            success: function (data) {console.log(data);

            }
        });
    };

    getSchedule();


    // add the zoom/home control to the map
    var zoomHome = new L.Control.zoomHome();
    zoomHome.addTo(map);

    // this adds the basemap tiles to the map
    var regular = L.tileLayer('https://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png', {});
    // adding various map tile layers so the user can change this
    var greyscaleNew = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(map);
    // adding various map tile layers so the user can change this
    var nightMode = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
    });
    // adding various map tile layers so the user can change this
    var Stamen_Terrain = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        subdomains: 'abcd',
        minZoom: 0,
        maxZoom: 18,
        ext: 'png'
    });
    // adding various map tile layers so the user can change this
    var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });


    // adding the slide menu plugin (uses setContent("content") to fill.
    slideMenu = L.control.slideMenu('', {
        position: 'topright',
        menuposition: 'right',
        height: '100%',
        direction: 'vertical',
        delay: '25'
    }).addTo(map);

    // setting the default slide menu contents using innerHTML
    // NB the quotes are necessary for innerHTML
    contents = '<div><id="slide-menu-start-page"><br><h1>Auckland Public Transit and Recreation Map</h1></div>';
    // NB the += sign which means the bottom text is added to the above text
    contents += '<br><p>Welcome to the Auckland Transit alternative transportation and recreation webapp! This is an interactive map designed to facilitate low carbon travel, and to show alternative methods of mobility in and around Auckland. Press any of the buttons along the bottom to show differing layers. This sidebar will also update with functionality depending on which layer is selected. If you right click on the map and press "Get Cycling Isochrones" you can see how far you can get within 30 minutes of the click. Try it out! Also shown are some of Aucklands most famous walks, with turn by turn directions provided. The train network layer is useful for people who are planning to move house, and want to be served on a commuter rail line. This can show distances of 1km and 2km from the Auckland Metro stations. Finally a layer with all of Aucklands parks, and a few of the most striking can be found and zoomed too! Enjoy facilitating your new low carbon opportunities';

    // the function to set the contents using the variable contents
    slideMenu.setContents(contents);

    // load the train line geojson data, style it, set events and add to map
    railLines = L.geoJson(rail, {
        style: styleTrainRoute,
        onEachFeature: setEventsFive,

    });

    // load the walking path geojson data
    walkingPaths = new L.GeoJSON.AJAX("walking-tracks-clipped-two.geojson", {style: {color: '#ffce00', weight: 0.5}});
    // the radio removal function
    layer = walkingPaths;
    if (layer){
        map.removeLayer(layer)
    };

    // Train extent layer
    trainExtent = new L.GeoJSON.AJAX("https://transit.land/api/v1/operators/o-rckm-atmetro.geojson?per_page=false", {style: {color: 'black', fillColor: 'grey', fillOpacity: 0.25}});
    // the radio removal function
    layer = trainExtent;
    if (layer){
        map.removeLayer(layer)
    };


    // loading the ferry routes from the Auckland Transport OpenData store using Ajax! Should have done this the whole time >.< !
    ferryRoutes = new L.GeoJSON.AJAX("https://opendata.arcgis.com/datasets/e84fd237aa8849c99bc07e58dd471e90_1.geojson", {
        style: styleFerry,
        onEachFeature: setEventsSix
    });
    // the radio removal function
    layer = ferryRoutes.addTo(map);
    if (layer){
        map.removeLayer(layer)
    }

    // setting the style for the ferry routes
    function getColourFerry(ROUTENUMBER) {
        var colour; // RouteNumber
        // assign colour based on RouteNumber
        if (ROUTENUMBER === 'BIRK') {
            colour = '#a6cee3'
        } else if (ROUTENUMBER === 'RAK') {
            colour = '#1f78b4'
        } else if (ROUTENUMBER === 'BAYS') {
            colour = '#b2df8a'
        } else if (ROUTENUMBER === 'DEV') {
            colour = '#33a02c'
        } else if (ROUTENUMBER === 'HOBS') {
            colour = '#fb9a99'
        } else if (ROUTENUMBER === 'PINE') {
            colour = '#e31a1c'
        } else if (ROUTENUMBER === 'SBAY') {
            colour = '#fdbf6f'
        } else if (ROUTENUMBER === 'WSTH') {
            colour = '#ff7f00'
        } else if (ROUTENUMBER === 'GULF') {
            colour = '#cab2d6'
        } else if (ROUTENUMBER === 'HMB') {
            colour = '#6a3d9a'
        } else if (ROUTENUMBER === 'MTIA') {
            colour = '#ffff99'
        }
        return colour;
    }

    /**
     *  This function styles the ferry routes
     */
    function styleFerry(feature) {
        //return a style
        return {
            weight: 1.25,
            color: getColourFerry(feature.properties.ROUTENUMBER),
            opacity: 1,
            //the colour is set using a function
        };
    }


    // the side bar legend for the ferry routes, and the coloured circles are populated using the getColours functions
    function ferrySidebar(){
        var labels = ['<strong>Route Number</strong><br>']; // the title
        var grades = ['BIRK', 'RAK', 'BAYS', 'DEV', 'HOBS', 'PINE', 'SBAY', 'WSTH', 'GULF', 'HMB', 'MTIA']; // the grades (same as the colour grades)
        ferryRouteNames = ['Birkenhead ferry', 'Rakino Island ferry', 'Bayswater ferry', 'Devonport ferry', 'Hobsonville and Beach Haven ferry', 'Pine Harbour ferry', 'Stanley Bay ferry', 'West Harbour ferry ', 'Gulf Harbour ferry', 'Half Moon Bay ferry', 'MTIA']; // the agency name
        var contents = labels; // overwritting contents with labels

        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
            contents += // += to add to the contents variable
                labels.push(
                    '<i id="circle" style="background:' + getColourFerry(grades[i]) + '"></i>' +
                    ferryRouteNames[i] + ('<br>'));
        }; // iterate through get colours and iterate through busAgencyName

        contents = labels.join('<br>'); // joining the contents and labels
        slideMenu.setContents(contents); // setting the slideMenu contents
    }


    // creating the custom train stop icon
    var myIcon = L.icon({
        iconUrl: 'location.png', // using a user created logo
        iconSize: [25, 25],
        iconAnchor: [12, 25],
        popupAnchor: [0, -25] // the popup anchor determines where the icon pops up from

    });

    // adding train stops
    trainStops = new L.GeoJSON.AJAX("https://opendata.arcgis.com/datasets/c82756c875ff4e9fad0bc7a9f97ef7a8_0.geojson", {
        onEachFeature: setEvents,
        pointToLayer: function (feature, latlng) {
            return new L.marker(latlng, {
                    icon: myIcon,
                } // pointToLayer which converts geoJSON into clickable points
            );

        }
    });

    // adding cycle routes
    cycleRouteLayer = L.geoJson(cycleR, {
        onEachFeature: setEventsFour,
        style: styleThree,
    });
    // the radio removal function
    layer = cycleRouteLayer.addTo(map);
    if (layer){
        map.removeLayer(layer)
    }

    // adding the cycle type function
    function getColourTwo(TYPEOFFACI) {
        var colour; // TYPEOFFACI = type of cycle lane value
        // assign a colour based in the value
        if (TYPEOFFACI === 'On-road unbuffered cycle lane') {
            colour = '#e41a1c';
        } else if (TYPEOFFACI === 'Off-road shared path') {
            colour = '#377eb8';
        } else if (TYPEOFFACI === 'Off-road cycleway') {
            colour = '#4daf4a';
        } else if (TYPEOFFACI === 'Local area traffic management') {
            colour = '#984ea3';
        } else if (TYPEOFFACI === 'Off-road trail') {
            colour = '#ff7f00';
        } else if (TYPEOFFACI === 'On-road buffered cycle lane') {
            colour = '#ffff33';
        } else if (TYPEOFFACI === 'On-road protected cycle lane') {
            colour = '#a65628';
        } else if (TYPEOFFACI === 'Shared zone') {
            colour = '#f781bf';
        } else {
            colour = '#70D6E5'
        }
        return colour;
    }


    // cycle route style
    function styleThree(feature) {
        //return a style
        return {
            weight: 2.5,
            color: getColourTwo(feature.properties.TYPEOFFACI),

            opacity: 1,

            //the colour is set using a function
        };
    }

    // the side bar legend for the cycle routes, and the coloured circles are populated using the getColours functions
    function cycleSidebar(){
        var labels = ['<strong>Type of Cycle Lane</strong><br>']; // the title
        var grades = ['On-road unbuffered cycle lane', 'Off-road shared path', 'Local area traffic management', 'Off-road trail', 'On-road buffered cycle lane', 'On-road protected cycle lane', 'Shared zone']; // the agency name
        var contents = labels; // overwritting contents with labels

        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
            contents += // += to add to the contents variable
                labels.push(
                    '<i id="circle" style="background:' + getColourTwo(grades[i]) + '"></i>' +
                    grades[i] + ('<br>'));
        }; // iterate through get colours and iterate through busAgencyName

        contents = labels.join('<br>'); // joinin the contents and labels
        slideMenu.setContents(contents); // setting the slideMenu contents
    };


    // adding the bus routes
    busRoutesLayer = L.geoJson(busRR, {
        onEachFeature: setEventsTwo,
        style: style,
    });

    /* TESTING A FUNCTION TO FILTER GEOJSON DATA TO SHOW DIFFERENT BUS ROUTES
    var agencyTest = L.geoJson(busRR, {filter: agencyFilter});

    function agencyFilter(feature){
        if (feature.properties.AGENCYNAME === "NZB")return true
    }

    layer = agencyTest.addTo(map);
    if (layer){
        map.removeLayer(layer)
    }
    */

    //setting style for bus routes
    // function to style the geoJSON layer using the "Agency Name" property
    function getColour(AGENCYNAME) {
        //create a variable to hold the colour
        var colour;

        //assign a colour based upon the bus agency

        if (AGENCYNAME === 'GBT') {
            colour = '#EB8690';
        } else if (AGENCYNAME === 'NZB') {
            colour = '#D88EB2';
        } else if (AGENCYNAME === 'RTH') {
            colour = '#B39DC9';
        } else if (AGENCYNAME === 'PC') {
            colour = '#82ACCD';
        } else if (AGENCYNAME === 'WBC') {
            colour = '#59B6BE';
        } else if (AGENCYNAME === 'BTL') {
            colour = '#55BB9F';
        } else if (AGENCYNAME === 'ABEXP') {
            colour = '#74BA7B';
        } else if (AGENCYNAME === 'ATMB') {
            colour = '#9EB55D';
        } else if (AGENCYNAME === 'HE') {
            colour = '#C6AB51';
        } else if (AGENCYNAME === 'TZG') {
            colour = '#E99E5D';
        }


        //return the resulting colour
        return colour;
    }

    /**
     *  This function styles the bus routes
     */
    function style(feature) {
        //return a style
        return {
            weight: 2,
            color: getColour(feature.properties.AGENCYNAME),
            opacity: 1,
            //the colour is set using a function
        };
    };

    // the legend for the train lines.

    var trainRouteLegend = L.control({position: 'bottomright'});
    // adding legend to the map
    trainRouteLegend.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend'),
            grades = ['EAST', 'WEST', "STH", 'ONE', 'PUK'],
            labels = ['<strong>Route Number</strong><br>'];
        var contents; // initalising the contents varible
        var contents = labels;
        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
            contents +=
                labels.push(
                    '<i id="circle" style="background:' + getColourTrainRoute(grades[i]) + '"></i>' +
                    grades[i] + ('<br>'));
        }
        contents = labels.join('<br>');
        slideMenu.setContents(contents); // adding the contents of the legend to the slide menu
        return div;
    };

    // the side bar legend for the train routes, and the coloured circles are populated using the getColours functions
    function trainSidebar(){
        var labels = ['<strong>Route Number</strong><br>']; // the title
        var grades = ['EAST', 'WEST', "STH", 'ONE', 'PUK']; // the agency name
        var contents = labels; // overwritting contents with labels

        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
            contents += // += to add to the contents variable
                labels.push(
                    '<i id="circle" style="background:' + getColourTrainRoute(grades[i]) + '"></i>' +
                    grades[i] + ('<br>'));
        }; // iterate through get colours and iterate through busAgencyName
        // the slide menu for the distance from stations buttons
        contents = labels.join('<br>'); // joinin the contents and labels
        contents += ('<br>'); // breaks
        contents += ('<br>'); // breaks
        contents += ('<strong>Distance from stations</strong>'); // title
        contents += ('<br>'); // breaks
        contents += ('<button class="distBtn" id="oneKMbutton" value="1" onclick="switchTrainDist(this);">1km</button>'); // the button for 1km
        contents += ('<br>'); // breaks
        contents += ('<button class="distBtn" id="twoKMbutton" value="2" onclick="switchTrainDist(this);">2km</button>'); // the button for 2km
        contents += ('<button class="distBtn" id="reset" value="3" onclick="switchTrainDist(this);">Show stops and routes</button>'); // default button
        slideMenu.setContents(contents); // setting the slideMenu contents
    }

    // function to get the colours for the train route based on route number
    function getColourTrainRoute(ROUTENUMBE) {
        //create a variable to hold the colour
        var colour;

        //assign a colour based upon the crime value

        if (ROUTENUMBE === 'GBT') {
            colour = '#1C2B4B';
        } else if (ROUTENUMBE === 'EAST') {
            colour = '#41345F';
        } else if (ROUTENUMBE === 'WEST') {
            colour = '#6B3A6E';
        } else if (ROUTENUMBE === 'STH') {
            colour = '#963C75';
        } else if (ROUTENUMBE === 'ONE') {
            colour = '#C03E74';
        } else if (ROUTENUMBE === 'PUK') {
            colour = '#E7446B';
        }


        //return the resulting colour
        return colour;
    }

    // function to style the train routes
    function styleTrainRoute(feature) {
        return {
            color: (getColourTrainRoute(feature.properties.ROUTENUMBE)),
            weight: 2.5,
            dashArray: '2, 2',
        }

    };


    // Hover over a train stop info box
    // create a Leaflet control (generic term for anything you add to the map)
    infoTrains = L.control({position: 'topleft'});

    //create the info box to update with frog type on hover
    infoTrains.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info');
        this.update();
        return this._div;
    };

    //create a function called update() that updates the contents
    infoTrains.update = function (props) {
        //if properties have been passed, then use them to fill in the info box
        if (props) {
            this._div.innerHTML = '<b>' + props.STOPNAME + '</b>';
            //otherwise, just set to a message
        } else {
            this._div.innerHTML = 'Hover over a stop';
        }

    };


    // create an info box that shows the bus route name
    // create a Leaflet control (generic term for anything you add to the map)
    busInfo = L.control({position: 'topleft'});

    //create the info box to update with frog type on hover
    busInfo.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info');
        this.update();
        return this._div;
    };

    //create a function called update() that updates the contents
    busInfo.update = function (props) {
        //if properties have been passed, then use them to fill in the info box
        if (props) {
            this._div.innerHTML = '<b>' + props.ROUTENAME + '</b>';
            //otherwise, just set to a message
        } else {
            this._div.innerHTML = 'Hover over a bus route';
        }

    };


    // park name info box
    // create a Leaflet control (generic term for anything you add to the map)
    parkInfo = L.control({position: 'topleft'});

    //create the info box to update with frog type on hover
    parkInfo.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info');
        this.update();
        return this._div;
    };

    //create a function called update() that updates the contents
    parkInfo.update = function (props) {
        //if properties have been passed, then use them to fill in the info box
        if (props) {
            this._div.innerHTML = '<b>' + props.SAPPARK_DA + '</b>';
            //otherwise, just set to a message
        } else {
            this._div.innerHTML = 'Hover over a park';
        }


    };


    // cycle lane name info box
    // create a Leaflet control (generic term for anything you add to the map)
    cycleInfo = L.control({position: 'topleft'});

    //create the info box to update with frog type on hover
    cycleInfo.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info');
        this.update();
        return this._div;
    };

    //create a function called update() that updates the contents
    cycleInfo.update = function (props) {
        //if properties have been passed, then use them to fill in the info box
        if (props) {
            this._div.innerHTML = '<b>' + props.ROADNAME + '</b>';
            //otherwise, just set to a message
        } else {
            this._div.innerHTML = 'Hover over a cycle lane';
        }

    };

    // train route type info box add
    // create a Leaflet control (generic term for anything you add to the map)
    trainRouteInfo = L.control({position: 'topleft'});

    //create the info box to update with frog type on hover
    trainRouteInfo.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info');
        this.update();
        return this._div;
    };

    //create a function called update() that updates the contents
    trainRouteInfo.update = function (props) {
        //if properties have been passed, then use them to fill in the info box
        if (props) {
            this._div.innerHTML = '<b>' + props.ROUTENAME + '</b>';
            //otherwise, just set to a message
        } else {
            this._div.innerHTML = 'Hover over a train line';
        }

    };


    // train route type info box add
    // create a Leaflet control (generic term for anything you add to the map)
    ferryRouteInfo = L.control({position: 'topleft'});

    //create the info box to update with frog type on hover
    ferryRouteInfo.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info');
        this.update();
        return this._div;
    };

    //create a function called update() that updates the contents
    ferryRouteInfo.update = function (props) {
        //if properties have been passed, then use them to fill in the info box
        if (props) {
            this._div.innerHTML = '<b>' + props.ROUTENAME + '</b>';
            //otherwise, just set to a message
        } else {
            this._div.innerHTML = 'Hover over a ferry route';
        }

    };

    // creating the bus stop cluster layer to improve readability due to the thousands of points
    // clustering the markers
    Bmarkers = L.markerClusterGroup({removeOutsideVisibleBounds: true}); // initialise the markerClusterGroup layer

    // iterate through the bus features layer
    for (var i = 0; i < bus.features.length; i++) {
        var a = bus.features[i]; // using the 'bus' layers to parse the bus stop data
        var title = a.properties.STOPNAME; // adding the bus stop title to a variable
        var desc = a.properties.STOPID;
        var marker = L.marker(new L.LatLng(a.geometry.coordinates[1], a.geometry.coordinates[0]), {title: title, description: desc}); // add a marker based on LatLng and add a title
        marker.bindPopup(title + '<br>' + "Stop ID: " + desc);// bind popup to the markers
        Bmarkers.addLayer(marker); // add marker popup variable to the Bmarkers layer
    }

    // the radio remove layers statement
    layer = Bmarkers;
    if (layer){
        map.removeLayer(layer)
    }

    // the code for creating the full extent of the transit system of Auckland using the turf Bbox


    // the minX, minY, maxX and maxY for the full extent bounding box
    var bbox = [174.407959,-37.383253,175.093231,-36.301845];
    // console.log(bbox);

    // creating a turf bboxPolygon from the bbox coordinates
    var poly = turf.bboxPolygon(bbox);
    // creating a geojson layer
    box = new L.geoJson(poly, {style: {color: 'black', fillColor: 'grey', fillOpacity: 0.25}});
    // console.log(poly);

    // the radio remove layers statement
    layer = box;
    if (layer){
        map.removeLayer(layer)
    };

    // adding the stations geojson
    new L.geoJson(stations);


    // buffering the train stop locations, using the station points

    var buffered = turf.buffer(stations, 1, {units: 'kilometers'});
    var bufferedTwo = turf.buffer(stations, 2, {units: 'kilometers'});

    //console.log(bufferedTwo);

    // the code to make the layer suitable for dissolve
    // the empty arrays
    buffersOne = [];
    buffersTwo = [];
    //loop throug bufferedTwo.features

    //console.log(bufferedTwo.features.length);

    // the two loops to loop through the buffered features and add them to an array
    for (var i =0; i < buffered.features.length; i++){
        // pushing the iterated features to the empty array
        buffersOne.push(buffered.features[i]);
    }

    for (var i =0; i < bufferedTwo.features.length; i++){
        // pushing the iterated features to the empty array
        buffersTwo.push(bufferedTwo.features[i]);
    }

    // turning the buffer array into a feature collection
    var bFeature = turf.featureCollection(buffersTwo);
    var bFeatureOne = turf.featureCollection(buffersOne);

    // the dissolve command
    var dissolved = turf.dissolve(bFeature);
    var dissolvedOne = turf.dissolve(bFeatureOne);


    // adding the dissolved layer to the map
    dissolvedGeo = new L.geoJson(dissolved, {style: {color: 'yellow', fillOpacity:0.25, fillColor:'blue'}});
    dissolvedGeoOne = new L.geoJson(dissolvedOne, {style: {color: 'yellow', fillOpacity:0.25, fillColor:'blue'}});

    // creating groups to store the layers for the button command
    trainDistOne = L.featureGroup([trainStops, dissolvedGeoOne]);
    trainDistTwo = L.featureGroup([trainStops, dissolvedGeo]);


    // add park layers
    parkExtentLayer = L.geoJson(parkE, {
        style: styleFour,
        onEachFeature: setEventsThree,
    });

    // adding a search bar to search for a park (trying to get it to search all records, but a 'name' field is required...
    //
    L.control.search({
        layer: parkExtentLayer,
        initial: false,
        propertyName: 'SAPPARK_DA', // Specify which property is searched into.
        hideMarkerOnCollapse: true, // to remove the red circle when the user clicks out of search
        zoom: '11',
        textPlaceholder: 'Search for a park'
    }).addTo(map);


    // to remove the parkExtentLayer using the radio buttons
    layer = parkExtentLayer;
    if (layer){
        map.removeLayer(layer)
    }


    // style park layers
    function styleFour(feature) {
        //return a style
        return {
            weight: '0.5',
            color: '#4FCE3C',
            fillColor: getColourParks(feature.properties.ParkExte_4), // Style on size basis
            fillOpacity: 0.75
        };
    };


    // group of layers for the train add function
    trainGroup = L.featureGroup([railLines, trainStops]);
    console.log(trainGroup);

    // to remove the trainGroup using the radio buttons
    layer = trainGroup;
    if (layer){
        map.removeLayer(layer)
    };

    // group of layers for the bus add function
    busGroup = L.featureGroup([busRoutesLayer, Bmarkers]);
    layer = busGroup;
    if (layer){
        map.removeLayer(layer)
    };


    // the variable to hold the basemaps
    var baseMap = {
            "Grayscale": greyscaleNew,
            "Regular": regular,
            "Night Mode": nightMode,
            "Terrain Map": Stamen_Terrain,
            "Satellite": Esri_WorldImagery
        };

    // layer selector variables
    var groupOverlayMaps;
    groupOverlayMaps = {
        "Transport Types": {
            "Rail Lines": railLines,
            "Train Routes": trainGroup,
            "Cycle Lanes": cycleRouteLayer,
            "Bus Routes": busRoutesLayer,
            "Ferry Routes": ferryRoutes,
            // "Transit Reachability": transitResult,
            "Bus Stops": Bmarkers,
            "Transit Extent": box,
            "Walking paths": walkingPaths




        },
        "Recreation": {
            "Parks": parkExtentLayer,
        }
    };
    // options for the grouped layer controls
    var optionsGroup = {
        // Make the "Landmarks" group exclusive (use radio inputs)
        exclusiveGroups: ["Transport Types"],
        // Show a checkbox next to non-exclusive group labels for toggling all
        collapsed: true,
        position: "bottomleft",
        scroll: false
    };


    // adding the legends to the layer selector variable
    var layerToLegendMapping = {
        //"Cycle Lanes": CycleLegend,
        // "Bus Routes": busLegend,
        // "Train Station": trainLegend,
        "Rail Lines": trainRouteLegend,
       // "Ferry Routes": ferryLegend,
      //  "Transit Reachability": transitResult
        "Bus Stops": Bmarkers

    };

    // the function to add the legends to the map when the layers are turned on
    /*
    To ensure a random (empty) legend is not drawn using the L.addLegend function, the layername === "X" ties to the functions made to populate the sidebar.
     */
    function legendAdd(event) {
        var layername = event.name;
        if (layername === "Parks") {
            parkSidebar();
        } else if (layername === "Bus Routes"){
            busSidebar();
        } else if (layername === "Transit Reachability"){
            reachabilitySidebar();
        } else if (layername === "Ferry Routes"){
            ferrySidebar();
        } else if (layername === "Cycle Lanes"){
            cycleSidebar();
        } else if (layername === "Train Routes"){
            trainSidebar();
        } else if (layername === "Transit Extent"){
            extentSidebar();
        } else if (layername === "Walking paths"){
            walkingSidebar();
        } else {
            map.addControl(layerToLegendMapping[layername]); // using the addControl function
        }
    };

    // the sidebar for the transit extent
    function extentSidebar(){
            var contents = "<br>";
            contents += "<h1>Auckland Public Transit Extents</h1>";
            contents += "<br>";
            contents += "<br>";
            contents += ("<button value='1' onclick='changeExtent(this)' class='extent-btn'>Train Coverage</button>");
            contents += ("<button value='2' onclick='changeExtent(this)' class='extent-btn'>Bus Coverage</button>");

            slideMenu.setContents(contents);
    }




    // the side bar legend for the bus routes, and the coloured circles are populated using the getColours functions
    function busSidebar(){
        var labels = ['<strong>Route Operator</strong><br>']; // the title
        var grades = ['NZB', 'RTH', 'PC', 'WBC', 'BTL', 'ABEXP', 'ATMB', 'HE', 'TZG']; // the grades (same as the colour grades)
        var busAgencyName = ['NZ Bus', 'Ritchies Transport', 'Pavlovich Coachlines', 'Waiheke bus company', 'Birkenhead Transport', 'ABEXP', 'ATMB', 'Howick and Eastern Buses Limited', 'Tranzurban Auckland']; // the agency name
        var contents = labels; // overwritting contents with labels

        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
            contents += // += to add to the contents variable
                labels.push(
                    '<i id="circle" style="background:' + getColour(grades[i]) + '"></i>' +
                    busAgencyName[i] + ('<br>'));
        }; // iterate through get colours and iterate through busAgencyName

        contents = labels.join('<br>'); // joinin the contents and labels

        slideMenu.setContents(contents); // setting the slideMenu contents
    }


    function walkingSidebar(){
        var contents = ('<br>');
        contents += ('<br>');
        contents += '<h1>Walking directions in Auckland</h1>';
        contents += '<input class="search-input" type="text" value="" id="start" oninput="noButtonPress();"/>';
        contents += '<input class="search-input" type="text" value="" id="end"/>';
        contents += '<button class="calcButton" id="submitButton" onclick="startGeocoding();">Calculate route</button>';
        contents += '<button class="calcButton" id="clearButton" onclick = "clearButton();">Clear route</button>';
        contents += ('<br>');
        contents += '<h1>Preset Routes</h1>';
        contents += '<div id="populatedRoutes"><button id="wlkBtnOne" class="wlkRouteBtn" onclick="populateRoutes();">Coast to Coast Walk  </button></div>';
        contents += '<div id="populatedRoutes"><button id="wlkBtnTwo" class="wlkRouteBtn" onclick="populateRoutesTwo();">Auckland City Heritage Walk  </button></div>';
        contents += '<div id="populatedRoutes"><button id="wlkBtnThree" class="wlkRouteBtn" onclick="populateRoutesThree();">North Shore Coastal Walk  </button></div>';
        contents += '<div id=\'directions\'>Type in two locations or select a preset route to show directions</div>';
        slideMenu.setContents(contents); // setting the slideMenu contents

    }




    // the side bar legend for the parks
    function parkSidebar() {
        var labels = ['<h1>Parks in Auckland</h1>']; // the variable to hold the title of the sidebar


        var contents = labels; // overwritting contents with labels


        contents += labels.push('<h3>Auckland Domain</h3>'); // name of the park
        contents += labels.push('<img value="1" id="domainParkPic" style="width:95%" src="images/aucklandDomainPic.jpg"><br>'); // picture of the park
        contents += labels.push('<button value="1" id="parkZoomOne" onclick="zoomPark(this);">Zoom to Auckland Domain</button>'); // creating the zoom button to zoom to the park that is clicked on
        contents += labels.push('<h3>Waitakere Ranges Regional Park</h3>');  // name of the park
        contents += labels.push('<img value="2" id="waitakerePic" style="width:95%" src="images/waitakereRanges.png" ><br>'); // picture of the park
        contents += labels.push('<button value="2" id="parkZoomTwo" onclick="zoomPark(this);">Zoom to Waitakere Ranges</button>'); // creating the zoom button to zoom to the park that is clicked on
        contents += labels.push('<h3>Western Springs Lakeside Park</h3>');  // name of the park
        contents += labels.push('<img value="3" id="westernSprings" style="width:95%" src="images/Western_Springs_willow.jpg"><br>'); // picture of the park
        contents += labels.push('<button value="3" id="parkZoomThree" onclick="zoomPark(this);">Zoom to Western Springs</button>'); // creating the zoom button to zoom to the park that is clicked on
        contents += labels.push('<h3>Muriwai Regional Park</h3>');  // name of the park
        contents += labels.push('<img value="4" id="muriwaiCliffs" style="width:95%" src="images/muriwai-cliffs.jpg"><br>'); // picture of the park
        contents += labels.push('<button value="4" id="parkZoomFour" onclick="zoomPark(this);">Zoom to Muriwai Regional Park</button>'); // creating the zoom button to zoom to the park that is clicked on

        contents = labels.join('<br>'); // joinin the contents and labels

        slideMenu.setContents(contents); // setting the slideMenu contents
    }


    /*
    To ensure a random (empty) legend is not drawn using the L.removeLegend function, the layername === "X" ties to the functions made to populate the sidebar.
     */
    function legendRemove(event) {
        var layername = event.name;
        if (layername === "Parks") {
            parkSidebar();
        } else if (layername === "Bus Routes"){
            busSidebar();
        } else if (layername === "Transit Reachability"){
            reachabilitySidebar();
        } else if (layername === "Ferry Routes"){
            ferrySidebar();
        } else if (layername === "Cycle Lanes"){
            cycleSidebar();
        } else if (layername === "Train Routes"){
            trainSidebar();
        } else if (layername === "Transit Extent"){
            extentSidebar();
        } else if (layername === "Walking paths"){
            walkingSidebar();
        } else {
            map.removeControl(layerToLegendMapping[layername]);
        }// using the remove control function
    };

    map.on('overlayadd', legendAdd); // the function to tie overlay addition with legend addition using the map.on function

    map.on('overlayremove', legendRemove); // the function to tie overlay remove to legend remove

    //NB: these two functions above are the reason the layername === "Transit Reachability" is necessary, as the map would try to remove or add a legend or info box that was not actually created, thus causing a 'this.div' is undefined.

    // the variable to store the info boxes
    var infoBoxes = {
        "Bus Routes": busInfo,
        "Train Routes": infoTrains, trainRouteInfo,
        "Parks": parkInfo,
        "Cycle Lanes": cycleInfo,
        "Rail Lines": trainRouteInfo,
        "Ferry Routes": ferryRouteInfo,
        "Bus Stops": Bmarkers,
        "Transit Extent": trainExtent, box,
        "Walking paths": walkingPaths,

        };

    // the function to add the info boxes
    function infoAdd(event) {
        var layername = event.name;
        map.addControl(infoBoxes[layername]) // using the addControl function
    };

    // the function to remove the info boxes
    function infoRemove(event) {
        var layername = event.name;
        map.removeControl(infoBoxes[layername]) // using the remove control function
    };

    map.on('overlayadd', infoAdd); // the function to tie overlay addition with info box addition using the map.on function

    map.on('overlayremove', infoRemove); // the function to tie overlay remove to legend remove
    console.log(Bmarkers);


    // layer selector control with the base maps and overlay maps as arguments
    var baseMapControl = L.control.groupedLayers(baseMap, groupOverlayMaps, optionsGroup).addTo(map);

    // return train stop name in popup form
    function popup(e) {
        var layer = e.target; // the target click
        var stop = layer.feature.properties.STOPNAME; // populating from the geoJSON STOPNAME property
        var name;
        if (stop === layer.feature.properties.STOPNAME) // if stop has a STOPNAME property bind a popup with the stopname to it
        {
            name = layer.bindPopup(layer.feature.properties.STOPNAME)
        }


        var popup = L.popup({
            pane: 'fixed', // set the pane
            className: 'popup-fixed',
            autoPan: false,
        }).setLatLng(e.latlng).setContent(name)
    };
    console.log(popup);


    // highlight feature for the train stops
    function highlightFeature(e) { // e refers to the event object

        // e.target is the train stop that was hovered over
        var layer = e.target;


        //update the info box
        infoTrains.update(layer.feature.properties);


    }


    /**
     * Reset the train stop info box after the hover is over
     */
    function resetHighlight(e) {
        // e refers to the event object

        //reset the style of the frog layer that was hovered over
        trainStops.resetStyle(e.target);	// e.target is the frog layer that was hovered over

        //update the info box
        infoTrains.update();
    }

    // set info box show on mouse over and tie popup to click
    function setEvents(feature, layer) {
        layer.on({
            click: popup,
            mouseover: highlightFeature,
            mouseout: resetHighlight,

        });
    }

    // highlight feature for the bus route layer
    function highlightFeatureTwo(e) { // e refers to the event object

        // e.target is the frog layer that was hovered over
        var layer = e.target;

        layer.bringToFront(); // function to bring the hovered layer to the front

        layer.setStyle({
            color: 'red',
            dashArray: '2, 8',
            weight: '5',
        });     // set style to red and dotted on hover


        //update the info box
        busInfo.update(layer.feature.properties);
    }


    /**
     * Reset the bus route style after the hover is over
     */
    function resetHighlightTwo(e) {
        // e refers to the event object

        //reset the style of the frog layer that was hovered over
        busRoutesLayer.resetStyle(e.target);	// e.target is the frog layer that was hovered over

        //update the info box
        busInfo.update();
    }

    function settingBusClick(e){
        var layer = e.target;
        map.fitBounds(e.target.getBounds());

        layer.setStyle({
            color: 'red',
            weight: '5',
            fillColor: 'red'

        })
    }


    // set the events on hover and click for the bus route layer
    function setEventsTwo(feature, layer) {
        //  does this feature have a property named popupContent?
        layer.on({
            click: settingBusClick,
            mouseover: highlightFeatureTwo,
            mouseout: resetHighlightTwo,

        });
    }

    // highlight the park layer and park info box
    function highlightFeatureThree(e) { // e refers to the event object

        // e.target is the frog layer that was hovered over
        var layer = e.target;

        layer.bringToFront; // function to bring the hovered layer to the front

        //update the info box
        parkInfo.update(layer.feature.properties);

        layer.setStyle({
            weight: 2,
            color: 'black',
            fillColor: '#33ffce',
            dashArray: '2, 8',
            fillOpacity: 0.7
        });

        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront(); // to help with an IE incompatibility on layer hover
        }
    }

    // functionality to zoom to park when it is clicked
    function zoomToPark(e) {
        map.fitBounds(e.target.getBounds());
    };

    /**
     * Reset the park style and info box after the hover is over
     */
    function resetHighlightThree(e) {
        // e refers to the event object

        //reset the style of the frog layer that was hovered over
        parkExtentLayer.resetStyle(e.target);	// e.target is the frog layer that was hovered over

        //update the info box
        parkInfo.update();
    }

    // set events for the park layer

    function setEventsThree(feature, layer) {
        //  does this feature have a property named popupContent?
        layer.on({
            click: zoomToPark,
            mouseover: highlightFeatureThree,
            mouseout: resetHighlightThree,

        });
    }

    // update the cycle layer and cycle info box

    function highlightFeatureFour(e) { // e refers to the event object

        // e.target is the frog layer that was hovered over
        var layer = e.target;

        layer.bringToFront();

        layer.setStyle({
            color: 'yellow',
            weight: '5',
            dashArray: '2, 5'
        });

        //update the info box
        cycleInfo.update(layer.feature.properties);
    }


    /**
     * Reset the cycle style and info box after the hover is over
     */
    function resetHighlightFour(e) {
        // e refers to the event object

        //reset the style of the frog layer that was hovered over
        cycleRouteLayer.resetStyle(e.target);	// e.target is the frog layer that was hovered over

        //update the info box
        cycleInfo.update();
    }

    // set events for the cycle route and cycle info boxes

    function setEventsFour(feature, layer) {
        //  does this feature have a property named popupContent?
        layer.on({
            //  click: popup,
            mouseover: highlightFeatureFour,
            mouseout: resetHighlightFour,

        });
    };

    // the highlight feature for the train route
    function highlightFeatureFive(e) { // e refers to the event object

        // e.target is the frog layer that was hovered over
        var layer = e.target;

        layer.bringToFront();

        layer.setStyle({
            color: 'yellow',
            dashArray: '2, 8',
            weight: '5'
        });


        //update the info box
        trainRouteInfo.update(layer.feature.properties);
    }


    /**
     * Reset the train style and info box after the hover is over
     */
    function resetHighlightFive(e) {
        // e refers to the event object
        railLines.bringToBack();
        //reset the style of the frog layer that was hovered over
        railLines.resetStyle(e.target);	// e.target is the frog layer that was hovered over

        //update the info box
        trainRouteInfo.update();
    }

    //  set events for the rail line layer and info boxes

    function setEventsFive(feature, layer) {
        //  does this feature have a property named popupContent?
        layer.on({
            //  click: popup,
            mouseover: highlightFeatureFive,
            mouseout: resetHighlightFive,

        });
    };


    // function to style the park layers
    function getColourParks(ParkExte_4) {
        //create a variable to hold the colour
        var colour;

        //assign a colour based upon the population value
        if (ParkExte_4 > 176410101.58) {
            colour = '#006837';
        } else if (ParkExte_4 > 54715889.71) {
            colour = '#31a354';
        } else if (ParkExte_4 > 6451559.69) {
            colour = '#78c679';
        } else if (ParkExte_4 > 2563143.30) {
            colour = '#c2e699';
        } else if (ParkExte_4 > 844119.68) {
            colour = '#d9f0a3';
        } else if (ParkExte_4 > 1.11) {
            colour = '#ffffcc';
        } else {
            colour = '#FFEDA0';
        }

        //return the resulting colour
        return colour;

    }

    // the highlight feature for the ferry route
    function highlightFeatureSix(e) { // e refers to the event object

        // e.target is the frog layer that was hovered over
        var layer = e.target;

        layer.bringToFront();

        layer.setStyle({
            color: 'yellow',
            dashArray: '2, 8',
            weight: '5'
        });


        //update the info box
        ferryRouteInfo.update(layer.feature.properties);
    }


    /**
     * Reset the train style and info box after the hover is over
     */
    function resetHighlightSix(e) {
        // e refers to the event object


        //reset the style of the frog layer that was hovered over
        ferryRoutes.resetStyle(e.target);	// e.target is the frog layer that was hovered over

        //update the info box
        ferryRouteInfo.update();
    }

    //  set events for the rail line layer and info boxes

    function setEventsSix(feature, layer) {
        //  does this feature have a property named popupContent?
        layer.on({
            //  click: popup,
            mouseover: highlightFeatureSix,
            mouseout: resetHighlightSix,

        });
    };

};


/**
 * Step 1 - geocode the start location
 */
function startGeocoding(){
    startName = document.getElementById('start').value;
    endName = document.getElementById('end').value;

    // geocode start location...
    makeRequest(getGeocodeURL(startName), continueGeocoding);
}


/**
 * Step 2 - store the start location and geocode the end location
 */
function continueGeocoding(data){

    // record the start locaion
    start = [data[0].lon, data[0].lat];

    // geocode end location...
    makeRequest(getGeocodeURL(endName), finishGeocoding);
}


/**
 * Step 3 - store the end location and start routing
 */
function finishGeocoding(data){

    // record the end location
    end = [data[0].lon, data[0].lat];

    //calculate the route between the two locations
    doRouting();
}


/**
 * Generate and return a Nominatim geocoding URL for a given placename
 */
function getGeocodeURL(placename) {
    return ["https://nominatim.openstreetmap.org/?format=json&limit=1&q=", placename].join("");
}


/**
 * Calculate the route between start and end global variables
 */
function doRouting() {

    //construct a url out of the required options for OpenRouteService
    var url = [

        // these bits are fixed or imported from the start and variables above
        'https://api.openrouteservice.org/directions?',
        'api_key=','5b3ce3597851110001cf6248c200fe68aa1c44359374f4a513372658',	// TODO: SET YOUR API KEY HERE
        '&coordinates=',start[0].toString(),',',start[1].toString(),'%7C', end[0].toString(),',',end[1].toString(),

        // these are the options, a comprehensive list is available at: https://openrouteservice.org/dev/#/api-docs/directions/get
        '&profile=', 			'foot-walking',
        '&preference=', 		'fastest',
        '&format=', 			'geojson',
        '&units=', 				'km',
        '&geometry_format=', 	'geojson'

    ].join("");	//join the array with no delimiter

    // log the url that was constructed
    //console.log(url);

    // send the request to OpenRouteService, set callback
    makeRequest(url, routeToMap);
}


/**
 * Make a request for JSON over HTTP, pass resulting text to callback when ready
 */
function makeRequest(url, callback) {

    //initialise the XMLHttpRequest object
    var httpRequest = new XMLHttpRequest();

    //set an event listener for when the HTTP state changes
    httpRequest.onreadystatechange = function () {

        //if it works, parse the JSON and pass to the callback
        //a successful HTTP request returns a state of DONE and a status of 200
        if (httpRequest.readyState === XMLHttpRequest.DONE && httpRequest.status === 200) {
            callback(JSON.parse(httpRequest.responseText));
        }
    };

    //prepare and send the request
    httpRequest.open('GET', url);
    httpRequest.send();
}


/**
 * Retrieve a GeoJSON route and add it to the map
 */
function routeToMap(route) {

    // load into L.GeoJson, style and add to the map
    geojson = L.geoJson(route, {
        style: {
            weight: 4,
            opacity: 1,
        }
    }).addTo(map);

    // zoom the map to fit
    map.fitBounds(geojson.getBounds());

    // add markers to the start and end (remember to flip longitude and latitude!)
    markerStart = L.marker([start[1], start[0]]).addTo(map);
    markerEnd = L.marker([end[1], end[0]]).addTo(map);

    // get info about the route from the dataset
    var duration = route.features[0].properties.summary[0].duration;
    var distance = route.features[0].properties.summary[0].distance;

    // get the description of the route
    var segments = route.features[0].properties.segments;

    // build HTML directions as a table
    var directionsHTML = [
        "<table><th><span id='directionTitle'>Directions</span> (",
        getDistanceString(distance),
        ", <i>",
        getDurationString(duration),
        "</i>)</th>"
    ].join("");

    // loop through the description for each segment of the journey
    for (var i = 0; i < segments.length; i++){

        // loop through each step of the current segment
        for (var j = 0; j < segments[i].steps.length; j++){

            // add a direction to the table
            directionsHTML += [
                "<tr><td><b>",
                segments[i].steps[j].instruction,
                "</b> (",
                getDistanceString(segments[i].steps[j].distance),
                ", <i>",
                getDurationString(segments[i].steps[j].duration),
                "</i>)</td></tr>"
            ].join("");
        }
    }

    // close the table
    directionsHTML += "</table>";

    // load the directions into the div
    document.getElementById('directions').innerHTML = directionsHTML;
}


/**
 * Returns a sensible distance string for a given distance in km
 */
function getDistanceString(distance){

    //is it more than 1km?
    if (distance > 1) {

        //if so, use km
        return distance.toFixed(1) + "km";

    } else {

        // if not, use m
        return Math.ceil(distance * 1000).toFixed(0) + "m";
    }
}


/**
 * Returns a sensible duration string for a given duration in seconds
 */
function getDurationString(duration){

    // hours
    if (duration > 3600) {

        //return hours and minutes
        return Math.floor(duration / 3600).toFixed(0) + " hrs " +
            Math.ceil((duration % 3600) / 60).toFixed(0) + " mins";

        // minutes
    } else if (duration > 60) {

        // minutes only
        return Math.ceil(duration / 60).toFixed(0) + " mins";

        // seconds
    } else {

        // seconds only
        return Math.ceil(duration).toFixed(0) + " secs";
    }
};

// the button to start geocoding for walking directions
// document.getElementById('submitButton').onclick = startGeocoding;






