// map class initialize
let map = L.map("map").setView([31.0461, 34.8516], 8);
map.zoomControl.setPosition("topright");

// adding osm tilelayer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

//add map scale
L.control.scale().addTo(map);

//full screen map view
let mapId = document.getElementById("map");
function fullScreenView() {
    mapId.requestFullscreen();
}

map.on("mousemove", function (e) {
    $(".coordinates").html(`Lat: ${e.latlng.lat} Lng: ${e.latlng.lng}`);
});

//Leaflet browser print function
L.control.browserPrint().addTo(map);

//Leaflet measure
L.control.measure({ 
    primaryLengthUnit: 'kilometers', 
    secondaryLengthUnit: 'meters',
    primaryAreaUnit: 'sqmeters', secondaryAreaUnit: undefined
}
).addTo(map);

function resetMap() {
   map.setView([31.0461, 34.8516], 8);
}