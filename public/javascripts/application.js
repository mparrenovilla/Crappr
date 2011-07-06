var map;
var markers = [];

window.onresize = trigger_resize;

//sets the correct height of the map
//this should be called onload and onresize
function set_map_height_to(viewportheight) {
    var mainHeight = viewportheight - 62;
    var mapHeight = mainHeight;

    if ($('#map_div')) {
        $('#map_div').height(mapHeight);
    }
		if ($('#pana')) {
        $('#pana').height(mapHeight);
    }
}

function trigger_resize() {
	set_map_height_to($(document).height());
	google.maps.event.trigger(map, 'resize');
} 


function drawMap(minLng, minLat, maxLng, maxLat, mapType, zoomLevel) {
    // NZ bounding box
    var sw = new google.maps.LatLng(minLat, minLng)
    var ne = new google.maps.LatLng(maxLat, maxLng)

    // Create a bounding box  
    var bounds = new google.maps.LatLngBounds(sw, ne)

    var myOptions = {
        zoom: zoomLevel,
        center: bounds.getCenter(),
        mapTypeId: mapType,
        scrollwheel: false,
        scaleControl: true,
        overviewMapControl: true
    }
    
    map = new google.maps.Map(document.getElementById("map_div"), myOptions)
    
}

function getInfoWindowTextForToilet(name, link) {
    var text = '<div class="toilet">' + 
               '<h4>' + name + '</h4>' +
               '<p>' + link + '</p>' +
               '</div>'  
    return text
}

function addToiletMarker(name, latlng, link, icon) {
    var infowindow = new google.maps.InfoWindow({ content: getInfoWindowTextForToilet(name, link) });
    var marker = new google.maps.Marker({ position: latlng, map: map, title: name, icon: '/images/'+icon});
    markers.push(marker); 
    google.maps.event.addListener(marker, 'click', function() { infowindow.open(map, marker); });
}


function bearing_from(pana,point) 
{
	var lat2 = pana.lat(); 
	var lon2 = pana.lng();
	var lat1 = point.lat(); 
	var lon1 = point.lng();
	
	var dLat = toRad((lat2-lat1));
	var dLon = toRad((lon2-lon1));
	var lat1 = toRad(lat1);
	var lat2 = toRad(lat2);
	
	var y = Math.sin(dLon) * Math.cos(lat2);
	var x = Math.cos(lat1)*Math.sin(lat2) -
	        Math.sin(lat1)*Math.cos(lat2)*Math.cos(dLon);
	var brng = (toDeg(Math.atan2(y, x)) + 180) % 360;

	return brng;
}

function toRad(val){
	return val * Math.PI / 180;
}
function toDeg(val){
	return val * 180 / Math.PI;
}


