var map, marker, gpxArray;
// load routes
var routes = [lexBowlingGreen, bowlingCheaha, cheahaDestin, destinNewOrleans];
var fullRoutey = fullRoute;
var noel = noelev;
var bc = bowlingCheaha;
var cd = cheahaDestin;
var opts;

var lat = 42.877742;
var lng = -97.380979;
var zoom = 4;

var gpxNamingScheme, gpxArray;

console.log(bc)

console.log(lexBowlingGreen)
var lexYSR = lexYS;
var geoJSLex = lexBowlingGreen;
var lexBG = lbg;
// map variable

// console.log(map);
// initialise the map function
function initMap() {
    var opts = {
        map: {
            center: [42.877742, -97.380979],
            zoom: 4,
            zoomControl: false

        },

    };

    map = L.map('map', opts.map);
    //);   //this will give a map of USA


    // this adds the basemap tiles to the map
    L.tileLayer('https://tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=61b2d4df83b5426b80861ab121e045e9').addTo(map);
    // console.log(map);

    // this adds the basemap tiles to the map
    var regular = L.tileLayer('https://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png', {});
    // adding various map tile layers so the user can change this
    var greyscaleNew = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
    });
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
    }).addTo(map);
    // adding various map tile layers so the user can change this
    var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });

    var baseMaps = {
        "Grayscale": greyscaleNew,
        "Nightmode": nightMode,
        "Terrain": Stamen_Terrain,
        "Satellite": Esri_WorldImagery,
    };

    L.control.layers(baseMaps, null, {position: 'bottomleft'}).addTo(map);

    // custom zoom bar control that includes a home function
    L.Control.zoomHome = L.Control.extend({
        options: {
            position: 'topleft',
            zoomInText: '+',
            zoomInTitle: 'Zoom in',
            zoomOutText: '-',
            zoomOutTitle: 'Zoom out',
            zoomHomeText: '<i class="fa fa-home" style="line-height:1.65;"></i>',
            zoomHomeTitle: 'Zoom home'
        },

        onAdd: function (map) {
            var controlName = 'gin-control-zoom',
                container = L.DomUtil.create('div', controlName + ' leaflet-bar'),
                options = this.options;

            this._zoomInButton = this._createButton(options.zoomInText, options.zoomInTitle,
                controlName + '-in', container, this._zoomIn);
            this._zoomHomeButton = this._createButton(options.zoomHomeText, options.zoomHomeTitle,
                controlName + '-home', container, this._zoomHome);
            this._zoomOutButton = this._createButton(options.zoomOutText, options.zoomOutTitle,
                controlName + '-out', container, this._zoomOut);

            this._updateDisabled();
            map.on('zoomend zoomlevelschange', this._updateDisabled, this);

            return container;
        },

        onRemove: function (map) {
            map.off('zoomend zoomlevelschange', this._updateDisabled, this);
        },

        _zoomIn: function (e) {
            this._map.zoomIn(e.shiftKey ? 3 : 1);
        },

        _zoomOut: function (e) {
            this._map.zoomOut(e.shiftKey ? 3 : 1);
        },

        _zoomHome: function (e) {
            map.setView([lat, lng], zoom);
        },

        _createButton: function (html, title, className, container, fn) {
            var link = L.DomUtil.create('a', className, container);
            link.innerHTML = html;
            link.href = '#';
            link.title = title;

            L.DomEvent.on(link, 'mousedown dblclick', L.DomEvent.stopPropagation)
                .on(link, 'click', L.DomEvent.stop)
                .on(link, 'click', fn, this)
                .on(link, 'click', this._refocusOnMap, this);

            return link;
        },

        _updateDisabled: function () {
            var map = this._map,
                className = 'leaflet-disabled';

            L.DomUtil.removeClass(this._zoomInButton, className);
            L.DomUtil.removeClass(this._zoomOutButton, className);

            if (map._zoom === map.getMinZoom()) {
                L.DomUtil.addClass(this._zoomOutButton, className);
            }
            if (map._zoom === map.getMaxZoom()) {
                L.DomUtil.addClass(this._zoomInButton, className);
            }
        }
    });
// add the new control to the map
    var zoomHome = new L.Control.zoomHome();
    zoomHome.addTo(map);





    gpxArray = ['lexBowling.gpx', 'bowlinCheahaGPX.gpx', 'cheahaDestin.gpx', 'destinNOLA.gpx','nolaDallas.gpx', 'dallasCapulin.gpx', 'capulinBearCanyon.gpx', 'bearCanyonTrinidad.gpx', 'trinidadGreatSand.gpx', 'greatSandBoulder.gpx', 'boulderRocky.gpx', 'rockyLaramie.gpx', 'laramieThermopolis.gpx', 'thermTeton.gpx', 'tetonYellowstone.gpx', 'yellowstoneGlacier.gpx', 'glacierCalgary.gpx', 'calgarySicamous.gpx', 'sicamousKelowna.gpx', 'kelownaVancouver.gpx', 'vancouverKayak.gpx', 'kayakOlympia.gpx', 'olympiaPortland.gpx', 'portlandCrater.gpx', 'craterRedwood.gpx', 'redwoodEureka.gpx', 'eurekaNapa.gpx', 'napaTahoe.gpx', 'tahoeYosemite.gpx', 'yosemiteMcWay.gpx', 'mcwayJoshuaTree.gpx', 'joshuaSlabCity.gpx', 'slabcityPaulden.gpx', 'pauldenGrandCanyon.gpx', 'gcZion.gpx', 'zionMonumentValley.gpx', 'monumentMesaVerde.gpx', 'mesaBandelier.gpx', 'bandelierSpringer.gpx', 'springerSooner.gpx', 'soonerStRobert.gpx', 'stRobertLex.gpx'];



    var gpxColour = {
        'lexBowling.gpx': '#ff3a00',
        'bowlinCheahaGPX.gpx': '#FF3A00',
        'cheahaDestin.gpx': '#FF3A00',
        'destinNOLA.gpx': '#FF3A00',
        'nolaDallas.gpx': '#FF3A00',
        'dallasCapulin.gpx': '#FF3A00',
        'capulinBearCanyon.gpx': '#FF3A00',
        'bearCanyonTrinidad.gpx': '#FF3A00',
        'trinidadGreatSand.gpx': '#FF3A00',
        'greatSandBoulder.gpx': '#FF3A00',
        'boulderRocky.gpx': '#FF3A00',
        'rockyLaramie.gpx': '#FF3A00',
        'laramieThermopolis.gpx': '#FF3A00',
        'thermTeton.gpx': '#FF3A00',
        'tetonYellowstone.gpx': '#FF3A00',
        'yellowstoneGlacier.gpx': '#FF3A00',
        'glacierCalgary.gpx': '#FF3A00',
        'calgarySicamous.gpx': '#FF3A00',
        'sicamousKelowna.gpx': '#FF3A00',
        'kelownaVancouver.gpx': '#FF3A00',
        'vancouverKayak.gpx': '#FF3A00',
        'kayakOlympia.gpx': '#FF3A00',
        'olympiaPortland.gpx': '#FF3A00',
        'portlandCrater.gpx': '#FF3A00',
        'craterRedwood.gpx': '#FF3A00',
        'redwoodEureka.gpx': '#FF3A00',
        'eurekaNapa.gpx': '#FF3A00',
        'napaTahoe.gpx': '#FF3A00',
        'tahoeYosemite.gpx': '#FF3A00',
        'yosemiteMcWay.gpx': '#FF3A00',
        'mcwayJoshuaTree.gpx': '#FF3A00',
        'joshuaSlabCity.gpx': '#FF3A00',
        'slabcityPaulden.gpx': '#FF3A00',
        'pauldenGrandCanyon.gpx': '#FF3A00',
        'gcZion.gpx': '#FF3A00',
        'zionMonumentValley.gpx': '#FF3A00',
        'monumentMesaVerde.gpx': '#FF3A00',
        'mesaBandelier.gpx': '#FF3A00',
        'bandelierSpringer.gpx': '#FF3A00',
        'springerSooner.gpx': '#FF3A00',
        'soonerStRobert.gpx': '#FF3A00',
        'stRobertLex.gpx': '#FF3A00'

    };
    gpxNamingScheme = {
        'lexBowling.gpx': 'Lexington to Bowling Green',
        'bowlinCheahaGPX.gpx': 'Bowling Green to Cheaha State Park',
        'cheahaDestin.gpx': 'Cheaha State Park to Destin',
        'destinNOLA.gpx': 'Destin to New Orleans',
        'nolaDallas.gpx': 'New Orleans to Hickory Creek State Park, Dallas',
        'dallasCapulin.gpx': 'Dallas to Capualin Volcano',
        'capulinBearCanyon.gpx': 'Capualin Volcano to Bear Canyon',
        'bearCanyonTrinidad.gpx': 'Bear Canyon to Trinidad',
        'trinidadGreatSand.gpx': 'Trinidad to Great Sand Dunes National Park',
        'greatSandBoulder.gpx': 'Great Sand Dunes National Park to Boulder',
        'boulderRocky.gpx': 'Boulder to Rocky Mountain National Park',
        'rockyLaramie.gpx': 'Rocky Mountain National Park to Laramie',
        'laramieThermopolis.gpx': 'Laramie to Thermopolis',
        'thermTeton.gpx': 'Thermopolis to Grand Teton National Park',
        'tetonYellowstone.gpx': 'Grand Teton National Park to Yellowstone National Park',
        'yellowstoneGlacier.gpx': 'Yellowstone National Park to St Marys Lake (Glacier National Park)',
        'glacierCalgary.gpx': 'St Marys Lake to Calgary, Canada',
        'calgarySicamous.gpx': 'Calgary to Sicamous',
        'sicamousKelowna.gpx': 'Sicamous to Kelowna',
        'kelownaVancouver.gpx': 'Kelowna to Vancouver',
        'vancouverKayak.gpx': 'Vancouver to Kayak Point',
        'kayakOlympia.gpx': 'Kayak Point to Olympia',
        'olympiaPortland.gpx': 'Olympia to Portland',
        'portlandCrater.gpx': 'Portland to Crater Lake',
        'craterRedwood.gpx': 'Crater Lake to Redwood National and State Parks',
        'redwoodEureka.gpx': 'Redwood National and State Parks to Eureka',
        'eurekaNapa.gpx': 'Eureka to Napa',
        'napaTahoe.gpx': 'Napa to Lake Tahoe',
        'tahoeYosemite.gpx': 'Lake Tahoe to Yosemite National Park',
        'yosemiteMcWay.gpx': 'Yosemite National Park to McWay Falls',
        'mcwayJoshuaTree.gpx': 'McWay Falls to Joshua Tree National Park',
        'joshuaSlabCity.gpx': 'Joshua Tree National Park to Slab City',
        'slabcityPaulden.gpx': 'Slab City to Paulden',
        'pauldenGrandCanyon.gpx': 'Paulden to Grand Canyon North Rim',
        'gcZion.gpx': 'Grand Canyon North Rim to Zion National Park',
        'zionMonumentValley.gpx': 'Zion National Park to Monument Valley',
        'monumentMesaVerde.gpx': 'Monument Valley to Mesa Verde National Park',
        'mesaBandelier.gpx': 'Mesa Verde National Park to Bandelier National Monument',
        'bandelierSpringer.gpx': 'Bandelier National Monument to Springer',
        'springerSooner.gpx': 'Springer to Sooner Lake',
        'soonerStRobert.gpx': 'Sooner Lake to St Robert',
        'stRobertLex.gpx': 'St Robert to Lexington!'

    };

    gpxNamingSchemeNew = {
        1: {id: 1, fileName: 'lexBowling.gpx', name: 'Lexington to Bowling Green'},
        2: {id: 2, fileName: 'bowlinCheahaGPX.gpx', name: 'Bowling Green to Cheaha State Park'},
        3: {id: 3, fileName: 'cheahaDestin.gpx', name: 'Cheaha State Park to Destin'},
        4: {id: 4, fileName: 'destinNOLA.gpx', name: 'Destin to New Orleans'},

    };





    // controlElev(event.target);
    console.log(gpxArray[0])
    for (var i = 0; i < gpxArray.length; i++) {
        new L.GPX('routes/' + gpxArray[i], {
            async: true, polyline_options: {color: gpxColour[gpxArray[i]]},
            marker_options: {
                startIconUrl: 'location-pin.png',
                endIconUrl: 'location-pin.png',
                shadowUrl: 'MrMufflon-Leaflet.Elevation-v0.0.3-21-g05d24f4/MrMufflon-Leaflet.Elevation-05d24f4/lib/leaflet-gpx/pin-shadow.png',
                clickable: true
            }
        },).on("mouseover", function (event) {
                controlElev(event.target)
        }).on('addpoint', function(e) {
            if (e.point_type === 'start') {
                // console.log(gpxNamingScheme[e.target._info.name]);
                // var gpx = e.target.gpx
                //console.log(gpx);
                var name, textTitle,text;
                // var gpx = e.target._gpx;

                var text = e.target._info.name;


                if (text === 'lexBowling'){
                    text = 'Lexington to Bowling Green'
                } else if (text === 'bowlinCheahaGPX'){
                    text = 'Bowling Green to Cheaha State Park'
                } else if (text === 'cheahaDestin') {
                    text = 'Cheaha State Park to Destin'
                } else if (text === 'destinNOLA'){
                    text = 'Destin to New Orleans'
                } else if (text === 'nolaDallas'){
                    text = 'New Orleans to Hickory Creek State Park'
                } else if (text === 'dallasCapulin'){
                    text = 'Hickory Creek State Park to Capulin Volcano'
                } else if (text === 'capulinBearCanyon') {
                    text = 'Capulin Volcano to Bear Canyon'
                } else if (text === 'bearCanyonTrinidad'){
                    text = 'Bear Canyon to Trinidad'
                } else if (text === 'trinidadGreatSand'){
                    text = 'Trinidad to Great Sand Dunes National Park'
                } else if (text === 'greatSandBoulder'){
                    text = 'Great Sand Dunes National Park to Boulder'
                } else if (text === 'boulderRocky') {
                    text = 'Boulder to Rocky Mountain National Park'
                } else if (text === 'rockyLaramie'){
                    text = 'Rocky Mountain National Park to Laramie'
                } else if (text === 'laramieThermopolis'){
                    text = 'Laramie to Thermopolis'
                } else if (text === 'thermTeton'){
                    text = 'Thermopolis to Grand Teton National Park'
                } else if (text === 'tetonYellowstone') {
                    text = 'Grand Teton National Park to Yellowstone National Park'
                } else if (text === 'yellowstoneGlacier'){
                    text = 'Yellowstone National Park to St Marys Lake (Glacier National Park)'
                } else if (text === 'glacierCalgary'){
                    text = 'St Marys Lake to Calgary, Canada'
                } else if (text === 'calgarySicamous'){
                    text = 'Calgary to Sicamous'
                } else if (text === 'sicamousKelowna') {
                    text = 'Sicamous to Kelowna'
                } else if (text === 'kelownaVancouver'){
                    text = 'Kelowna to Vancouver'
                } else if (text === 'vancouverKayak'){
                    text = 'Vancouver to Kayak Point'
                } else if (text === 'kayakOlympia'){
                    text = 'Kayak Point to Olympia'
                } else if (text === 'olympiaPortland') {
                    text = 'Olympia to Portland'
                } else if (text === 'portlandCrater'){
                    text = 'Portland to Crater Lake'
                } else if (text === 'craterRedwood'){
                    text = 'Crater Lake to Redwood National and State Parks'
                } else if (text === 'redwoodEureka'){
                    text = 'Redwood National and State Parks to Eureka'
                } else if (text === 'eurekaNapa') {
                    text = 'Eureka to Napa'
                } else if (text === 'napaTahoe'){
                    text = 'Napa to Lake Tahoe'
                } else if (text === 'tahoeYosemite'){
                    text = 'Lake Tahoe to Yosemite National Park'
                } else if (text === 'yosemiteMcWay'){
                    text = 'Yosemite National Park to McWay Falls'
                } else if (text === 'mcwayJoshuaTree') {
                    text = 'McWay Falls to Joshua Tree National Park'
                } else if (text === 'joshuaSlabCity'){
                    text = 'Joshua Tree National Park to Slab City'
                } else if (text === 'slabcityPaulden'){
                    text = 'Slab City to Paulden'
                } else if (text === 'pauldenGrandCanyon'){
                    text = 'Paulden to Grand Canyon North Rim'
                } else if (text === 'gcZion'){
                    text = 'Grand Canyon North Rim to Zion National Park'
                } else if (text === 'zionMonumentValley') {
                    text = 'Zion National Park to Monument Valley'
                } else if (text === 'monumentMesaVerde'){
                    text = 'Monument Valley to Mesa Verde National Park'
                } else if (text === 'mesaBandelier'){
                    text = 'Mesa Verde National Park to Bandelier National Monument'
                } else if (text === 'bandelierSpringer'){
                    text = 'Bandelier National Monument to Springer'
                } else if (text === 'springerSooner') {
                    text = 'Springer to Sooner Lake'
                } else if (text === 'soonerStRobert'){
                    text = 'Sooner Lake to St Robert'
                } else if (text === 'stRobertLex'){
                    text = 'St Robert to Lexington!'
                }
                // name = 'Test'

                // text = gpxNamingScheme[e.target._info.name];
                console.log(text)

                console.log(typeof e.target._info.name);

                text += '<br/>Route Length: ' + (e.target._info.length/1000).toFixed(1) + ' km';
                text += '<br/>Elevation Gain: ' + e.target._info.elevation.gain.toFixed(2) + ' m';

                e.point.bindPopup(text, {offset: [0, -25]})

            }
            else if (e.point_type === 'end'){
                map.removeLayer(e.point);
            }
        })


            .addTo(map);

    }

    // creating the bus stop cluster layer to improve readability due to the thousands of points
// clustering the markers
    var Bmarkers = L.markerClusterGroup({removeOutsideVisibleBounds: true}); // initialise the markerClusterGroup layer

// iterate through the bus features layer
    for (var i = 0; i < gpxArray.length; i++) {
        console.log(gpxArray.length);
        var a = gpxArray[i]; // using the 'bus' layers to parse the bus stop data
        //var title = a.properties.STOPNAME; // adding the bus stop title to a variable
        var marker = L.marker(new L.LatLng([1], coordinates[0]), {title: title}); // add a marker based on LatLng and add a title
        marker.bindPopup(title); // bind popup to the markers
        Bmarkers.addTo(map); // add marker popup variable to the Bmarkers layer
    }

    var test;
   // test = gpxArray[4];
   // test.get_distance();
   // console.log(test);



    /**
    showAll()
    map.on('click', function (event) {
        showAll(event.target);
    })

    console.log(showAll);
    **/

    function showAll(){
            if(typeof controlElevation === 'undefined'){
                elevationOptions = {
                    elevationControl: {
                        url: 'routes/' + gpxArray[0],
                        options: {
                            position: "topleft",
                            theme: "steelblue-theme", //default: lime-theme
                            useHeightIndicator: true, //if false a marker is drawn at map position
                            interpolation: d3.curveLinear, //see https://github.com/d3/d3/wiki/
                            collapsed: false, //collapsed mode, show chart on click or mouseover
                            elevationDiv: "#elevation-div",
                            detachedView: true,
                            responsiveView: true,
                        },
                    }
                };

                controlElevation = L.control.elevation(elevationOptions.elevationControl.options);

                controlElevation.addGPXFile(map, elevationOptions.elevationControl.url);



            }
            controlElevation.clear();
            for (var j = 0; j < gpxArray.length; j++) {
                controlElevation.addGPXFile('routes/' + gpxArray[j], 0);
            }
            currentGPX = ''


    }
    console.log(showAll);
};

    /**
     var overlays = {
        "Lexington to Bowling Green": lexBowling,
        "Bowling Green to Cheaha State Park": bowlingCheaha
    };
     // var control = L.control.layers(overlays).addTo(map);
     **/

    /**
     * Event handler for map click
     *
     function onMapClick(e) {

        if (marker){
            map.removeLayer(marker);
        }

        marker = L.marker(e.latlng);

        marker.addTo(map);

        var popup = marker.bindPopup( e.latlng.toString() );

        popup.openPopup();
    }
     **/

var controlElevation, elevationOptions, currentGPX;
console.log(currentGPX);

function controlElev(target) {

    if (typeof elevationOptions == "undefined") {

        // map.addControl(controlElevation)
        elevationOptions = {
            elevationControl: {
                url: target._gpx,
                options: {
                    position: "topleft",
                    theme: "steelblue-theme", //default: lime-theme
                    useHeightIndicator: true, //if false a marker is drawn at map position
                    interpolation: d3.curveLinear, //see https://github.com/d3/d3/wiki/
                    collapsed: false, //collapsed mode, show chart on click or mouseover
                    elevationDiv: "#elevation-div",
                    detachedView: true,
                    responsiveView: true,
                },
            }
        };

        var gpx = target._gpx;

        controlElevation = L.control.elevation(elevationOptions.elevationControl.options);

        controlElevation.loadGPX(map, elevationOptions.elevationControl.url);





    } else if (currentGPX !== target._gpx) {
        controlElevation.clear();
        controlElevation.addGPXFile(target._gpx, 1);
        currentGPX = target._gpx;
    }
    controlElevation.gpx.on("loaded", function(event){

            var gpx = controlElevation.gpx;
            var q = document.querySelector.bind(document);
            // console.log(controlElevation);
            // addOverlay(gpx, gpx.get_name());
            q('#name').innerHTML = "Route Name: " + gpxNamingScheme[gpx.get_name() + '.gpx'];

            console.log(gpx.get_name());
            q('.totlen .summaryvalue').innerHTML = gpx.get_distance_imp().toFixed(2) + " miles";
            q('.maxele .summaryvalue').innerHTML = gpx.get_elevation_max().toFixed(2) + " m";
            q('.minele .summaryvalue').innerHTML = gpx.get_elevation_min().toFixed(2) + " m";


        }

    )
    //console.log(target._gpx)
  //console.log(gpx.get_name());

}

 console.log(gpxArray)
//console.log(gpx);

console.log(currentGPX);







