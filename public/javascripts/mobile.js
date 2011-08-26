function findNearestToilets(limit) {
  $('#toilets').html("Loading some crapprs...");
   if (gps_capable()) {
    getLocation(
      function(coords) {
        var lat = coords.latitude;
        var long = coords.longitude;
				
				$.getJSON('/api/nearby.json?lat=' + lat + '&lng=' + long + '&limit=' + limit, function(data) {
					 var items = [];

					  $.each(data, function(key, val) {
					    items.push('<li id="' + key + '">' + val.toilet.location + ' (' + val.toilet.distance + 'km away)</li>');
					  });

					$('#toilets').html(  
						$('<ul/>', {
					    	'class': 'my-new-list',
					    	html: items.join('')
					  	})
					);
						

				});
				
      }, function() {
        $('#toilets').html("Sorry, we were unable to get your location. <a href='javascript:findNearestToilets();'>Retry.</a>");
      }
    );
  } else {
    $('#toilets').html("Sorry, your browser does not appear to support geolocation.");
  }
}

function toiletLink(toilet){
	
	
}

function gps_capable() {
  var _locator_object;
  try {
    _locator_object = navigator.geolocation;
  } catch (e) {
    return false;
  }

  if (_locator_object) return true; else return false;
}

function getLocation(successCallback, errorCallback) {
  successCallback = successCallback || function(){};
  errorCallback = errorCallback || function(){};

  var geolocation = navigator.geolocation;

  if (geolocation) {
    try {
      function handleSuccess(position) {
				successCallback(position.coords);
      }

      geolocation.getCurrentPosition(handleSuccess, errorCallback, {
				enableHighAccuracy: true,
				maximumAge: 5000 // 5 sec.
      });
    } catch (err) {
      errorCallback();
    }
  } else {
    errorCallback();
  }
}