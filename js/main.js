
/* =====================
Helper functions
===================== */
var defaultMapview = function(){
  map.setView([40.738, -74.060], 13);
};

var clearMap = function(){
  if (typeof featureGroup !== 'undefined') {
    map.removeLayer(featureGroup);
  }
};

$('#previous').hide();

var pointPopup = function(feature) {
  thePopup = L.popup({className: 'popup'})
      .setContent(
        feature.properties.station_id +
        "<br><em class='popup-body'> Total Rides </em>" +
        feature.properties.Total_trips +" rides" +
        "<br><em class='popup-body'> Number of Docks </em>" +
        feature.properties.TotalDocks + " Docks"+
        "<br><em class='popup-body'> Available Bikes </em>" +
        feature.properties.AvailableBikes + " Bikes" +
        "<br><em class='popup-body'> Address: </em>" +
        feature.properties.StationName
      );
    return(thePopup);
};

var polyPopUp = function(feature) {
    thePopup = L.popup({className: 'poly-popup'})
      .setContent(
        feature.properties.NAME +
         "<br><em class='popup-body'> Docks in District/Neighborhood</em>" +
        feature.properties.x+
        "<br><em class='popup-body'> Rides within district/neighborhood </em>" +
        feature.properties.y +
        "<br><em class='popup-body'> Average Trip duration: </em>" +
        feature.properties.z + " mins"
      );
    return(thePopup);
};

/* =====================
State object
===================== */


var state = {
  "slideNumber": 0,
  "slideData": [
    {
      "title": "Total Stats",
      "text": slide1text
    },
    {
      "title": "Departutes/ Arrivals",
      "text": slide2text
    },
    {
      "title": "Local Rides/ Round Trips",
      "text": slide3text
    },
    {
      "title": "At Boro Scale",
      "text": slide4text
    },
    {
      "title": "Directions",
      "text": slide5text
    }
  ]
};

/* =====================
legend
===================== */



/* =====================
Data
===================== */
var pointDat = "https://raw.githubusercontent.com/msdakot/CitiBike/master/data/station.geojson";
var poly ="https://raw.githubusercontent.com/msdakot/CitiBike/master/data/Neighborhood.geojson";

var colorRamp = ["#FFD271","#FFC6A8","#FF8984","#400D2A","#B7D7D8"];

/* =====================
Functionality
===================== */
var parsedData;
var polyparsed;


var myStyle = {};

$.ajax(poly).done(function(poly) {
  // Parse JSON
  polyparsed = JSON.parse(poly);
});

$.ajax(pointDat).done(function(pointDat) {
  // Parse JSON
  parsedData = JSON.parse(pointDat);
  // Show the initial slide
  featureGroup = L.geoJson(parsedData, {
    style: {
      fillColor: colorRamp[3],
      stroke: false
    },

    pointToLayer: function(feature, latlng) {
        return new L.CircleMarker(latlng, {radius: 4, fillOpacity: 0.5});
    },
  });
  map.addLayer(featureGroup);



  var clickNextButton = function() {
    if(state.slideNumber < state.slideData.length) {
      state.slideNumber += 1;
    } else {
      state.slideNumber = 1;
    }
    $(".Slide-title").html(state.slideData[state.slideNumber - 1].title);
    $(".Slide-text").html(state.slideData[state.slideNumber - 1].text);
    showTheSlide(state.slideNumber);
  };

  var clickPreviousButton = function() {
    if(state.slideNumber > 1) {
      state.slideNumber -= 1;
    } else {
      state.slideNumber = state.slideData.length;
      $('#previous').hide();
    }
    $(".Slide-title").html(state.slideData[state.slideNumber - 1].title);
    $(".Slide-text").html(state.slideData[state.slideNumber - 1].text);
    showTheSlide(state.slideNumber);
  };

  //  Function to call the appropriate slide function
var showTheSlide = function(slideNumber) {
  switch(slideNumber) {
    case 1:
      slide1Func();
      break;
    case 2:
      slide2Func();
      break;
    case 3:
      slide3Func();
      break;
    case 4:
      slide4Func();
      break;
    case 5:
      slide5Func();
      break;
    default:
      break;
    }
};

  //  On clicks call the clickbutton functions, calling the showslide function
  $('#next').click(function() {
    $('#previous').show();
    clickNextButton();
  });
  $('#previous').click(function() {
    clickPreviousButton();
  });
  $('#reset').click(function(){
    clearMap();
    defaultMapview();
  });
});
