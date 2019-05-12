console.log(NZJS);

//setup global map variable

var Rail = [aucklandRail];
console.log(Rail);

var map;



/**
 * Initialise the Map
 */
function initMap(){

    // this is a variable that holds the reference to the Leaflet map object
    map = L.map('map').setView([-36.848461, 174.763336,], 11);   //this will give a map of Great Britain

    // this adds the basemap tiles to the map
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {

    }).addTo(map);

    // load the geojson data, style it, set events and add to map

    geojson = L.geoJson(Rail, {



    }).addTo(map);


}
