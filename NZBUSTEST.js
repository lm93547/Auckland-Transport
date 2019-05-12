/**
 * Initialise the Map
 */
function initMap() {
    var info, map;
    // this is a variable that holds the reference to the Leaflet map object
    map = L.map('map').setView([-36.848461, 174.763336,], 11);   //this will give a map of Great Britain

    // this adds the basemap tiles to the map
    L.tileLayer('https://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png', {}).addTo(map);

    var markers = L.markerClusterGroup();

    for (var i = 0; i < bus.features.length; i++) {
        var a = bus.features[i];
        var title = a.properties.STOPNAME;
        var marker = L.marker(new L.LatLng(a.geometry.coordinates[1], a.geometry.coordinates[0]), { title: title });
        markers.bindPopup(title);
        markers.addLayer(marker);
    }
    map.addLayer(markers);
    console.log(markers);
};




