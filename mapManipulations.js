
var mapLayerGroups = [];
function myStyle(year) {
    if(year == 1895){
        return {color: '#81DCB9'}
    }
    if(year == 1899){
        return {color: '#DC8A81'}
    }
    if(year == 1900){
        return {color: '#EEAF55'}
    }
    if(year == 1917){
        return {color: '#732828'}
    }
    if(year == 1920){
        return {color: '#FAA97D'}
    }
    if(year == 1921){
        return {color: '#F2409C'}
    }
    if(year == 2000){
        return {color: '#F39667'}
    }
    if(year == 2001){
        return {color: '#B2B43C'}
    }
    if(year == 2003){
        return {color: '#D66094'}
    }
    if(year == 2004){
        return {color: '#459087'}
    }
    if(year == 2005){
        return {color: '#9B00FF'}
    }
    if(year == 2006){
        return {color: '#7A6E31'}
    }
    if(year == 2007){
        return {color: '#D9EC8A'}
    }
    if(year == 2008){
        return {color: '#56535B'}
    }
    if(year == 2009){
        return {color: '#F7612D'}
    }
    if(year == 2010){
        return {color: '#E5B258'}
    }
    if(year == 2011){
        return {color: '#715970'}
    }
    if(year == 2012){
        return {color: '#638A73'}
    }
    if(year == 2013){
        return {color: '#73F5A8'}
    }
    if(year == 2014){
        return {color: '#DEE840'}
    }
    if(year == 2015){
        return {color: '#B5E995'}
    }
    if(year == 2016){
        return {color: '#83A7B5'}
    }
    if(year == 2017){
        return {color: '#40A5CB'}
    }
    if(year == 2018){
        return {color: '#7381AC'}
    }
    if(year == 2019){
        return {color: '#4B73EE'}
    }
    if(year == 2020){
        return {color: '#7A42D5'}
    }
    if(year == 2021){
        return {color: '#D54285'}
    }


}

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}
//usage:
readTextFile("/firemaps.geoJSON", function(text){
    var data = JSON.parse(text);
    console.log(data)
    
    L.geoJson(data, {
        onEachFeature: function(feature, featureLayer) {
        //does layerGroup already exist? if not create it and add to map
    var lg = mapLayerGroups[feature.properties.FireDate.substring(0, 4)];
    featureLayer.setStyle(myStyle(feature.properties.FireDate.substring(0, 4)))
    if (lg === undefined) {
        lg = new L.layerGroup();
        //add the layer to the map
        
        lg.addTo(map);
        //store layer
        mapLayerGroups[feature.properties.FireDate.substring(0, 4)] = lg;

    }
    //add the feature to the layer
    lg.addLayer(featureLayer);   

            var yearOfFire = feature.properties.FireDate.substring(0, 4)
            if (feature.properties.Comments == null || feature.properties.Comments == "" || feature.properties.Comments == "אין"){
                featureLayer.bindPopup(`שנת שריפה: ${yearOfFire}`)
            }
            else {
                featureLayer.bindPopup(`שנת שריפה: ${yearOfFire}
                <br>
                פרטים נוספים אודות השריפה: ${feature.properties.Comments}`)
            }
            
        }
    });
    L.control.layers(null ,mapLayerGroups).addTo(map);
    
    
});

function showAllFires() {
    mapLayerGroups.forEach(Layer => {
        Layer.addTo(map)
    });
}

function removeAllFires() {
    mapLayerGroups.forEach(Layer => {
        map.removeLayer(Layer)
    });
}

function goToFireLogger()
{
    location.assign(`indexWithNoUser.html#`)
}



