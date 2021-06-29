$.ajax({
   url: "https://maps.googleapis.com/maps/api/place/details/json?language=ru&placeid=ChIJWeSvNLb1rjgRZRxlgmOm1WA&key=AIzaSyDguAJ3Fy5_7telKiZkSXhJUlgDCkj46Q8",
   type: "GET",
   success: function (response) {
      // storyRender(response);
      renderFooter(response)
   },
   error: function (xhr, ajaxOptions, thrownError) {
      console.log(thrownError);
   }
});

function initMap() {
   // debugger;
   // The location of flag
   var flag = {
      "lat": 41.3112195,
      "lng": 69.3142914
   };

   var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 16,
      center: flag,
      mapTypeId: "terrain",
      streetViewControl: true,
      styles: [
         {
            "featureType": "all",
            "elementType": "all",
            "stylers": [
               {
                  "saturation": "32"
               },
               {
                  "lightness": "-3"
               },
               {
                  "visibility": "on"
               },
               {
                  "weight": "1.18"
               }
            ]
         },
         {
            "featureType": "administrative",
            "elementType": "labels",
            "stylers": [
               {
                  // "visibility": "off"
               }
            ]
         },
         {
            "featureType": "landscape",
            "elementType": "labels",
            "stylers": [
               {
                  // "visibility": "off"
               }
            ]
         },
         {
            "featureType": "landscape.man_made",
            "elementType": "all",
            "stylers": [
               {
                  "saturation": "-70"
               },
               {
                  "lightness": "14"
               }
            ]
         },
         {
            "featureType": "poi",
            "elementType": "labels",
            "stylers": [
               {
                  "visibility": "off"
               }
            ]
         },
         {
            "featureType": "road",
            "elementType": "labels",
            "stylers": [
               {
                  // "visibility": "off"
               }
            ]
         },
         {
            "featureType": "transit",
            "elementType": "labels",
            "stylers": [
               {
                  "visibility": "off"
               }
            ]
         },
         {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
               {
                  "saturation": "100"
               },
               {
                  "lightness": "-14"
               }
            ]
         },
         {
            "featureType": "water",
            "elementType": "labels",
            "stylers": [
               {
                  "visibility": "off"
               },
               {
                  "lightness": "12"
               }
            ]
         }
      ],
   });
   const svgMarker = {
      path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
      fillColor: "blue",
      fillOpacity: 0.6,
      strokeWeight: 0,
      rotation: 0,
      scale: 2,
      anchor: new google.maps.Point(15, 30),
   };
   const image = "./img/map-image.svg";
   var marker = new google.maps.Marker(
      {
         position: flag,
         map: map,
         draggable: true,
         title: "Click to zoom",
         animation: google.maps.Animation.DROP,
         icon: image,
         // icon: svgMarker,
      }
   );
   const flightPlanCoordinates = [
      {lat: 41.30556379742413, lng: 69.30684673340023},
      {lat: 41.30862633622823, lng: 69.3113957595598},
      {lat: 41.31320375760532, lng: 69.31435691809763},
      {lat: 41.31678165895653, lng: 69.31654560049515}
   ];
   const flightPath = new google.maps.Polyline({
      path: flightPlanCoordinates,
      geodesic: true,
      strokeColor: "#FFA35C",
      strokeOpacity: 2.0,
      strokeWeight: 3,
   });
   flightPath.setMap(map);
   map.addListener("center_changed", () => {
      window.setTimeout(() => {
         map.panTo(marker.getPosition());
      }, 3000);
   });
   marker.addListener("click", () => {
      map.setZoom(18);
      map.setCenter(marker.getPosition());
   });
}

initMap()

