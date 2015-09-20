var map;
var service;
var infowindow;

function search() {
  var place = $('#place').val();

  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({
      'address': place
  }, function (results, status) {
    var mapCanvas = document.getElementById('results');
    var map = new google.maps.Map(mapCanvas, {
      zoom: 12,
      center: results[0].geometry.location,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    service = new google.maps.places.PlacesService(map);

    service.nearbySearch({
      location: results[0].geometry.location,
      radius: '500',
      rankBy: google.maps.places.RankBy.PROMINENCE,
      types: ['cafe']
    }, function (results, status) {

      if (results == null || results.length == 0) {
        return;
      }

      var bounds = new google.maps.LatLngBounds();

      for (var i=0; i<results.length; i++) {
        var resultMarker = results[i];
        var resultLocation = resultMarker.geometry.location;

        bounds.extend(resultLocation);
        var marker = new google.maps.Marker({
          position: resultLocation,
          map:map,
          title: resultMarker.name
        });
      };

      map.fitBounds(bounds);
      map.panToBounds(bounds);
    });
  });
};