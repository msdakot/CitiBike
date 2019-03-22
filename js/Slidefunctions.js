
var slide1Func= function(){
  clearMap();
  defaultMapview();

  map.setView([40.721, -74.001], 14);


    myStyle = function(feature){
      return {
        stroke: true,
        strokeOpacity: 1,
        fillOpacity: 0.5,
        color: colorRamp[2],
        radius: feature.properties.Total_trips* 0.001
      };
    };

    featureGroup = L.geoJson(parsedData, {
     style: myStyle,
     pointToLayer: function(feature, latlng) {
         return new L.CircleMarker(latlng, {radius: 1, fillOpacity: 0.85});
     },
     onEachFeature: function (feature, layer) {
         layer.bindPopup(pointPopup(feature));
     }

   }).addTo(map);

   $("#legend_gen").hide();
   $("#legend_Tot").show();
   $("#legend_Dir").hide();
   $("#legend_Roun").hide();
   $("#legend_Dist").hide();

};



var slide2Func = function() {

  clearMap();
  map.setView([40.733,-73.985],16);
  // setZoom(15);-73.978,40.733

  myStyle = function(feature){
    if (feature.properties.In_trips < feature.properties.Out_trips) {
      return {
        fillColor: "#FF9000",
        stroke: false,
        radius: feature.properties.Total_trips* 0.001};

    } else if (feature.properties.In_trips >= feature.properties.Out_trips) {
      return {
        fillColor: "#C70039",
        stroke: false,
        radius: feature.properties.Total_trips* 0.001};

      };
    };

  featureGroup = L.geoJson(parsedData, {
    style: myStyle,

    pointToLayer: function(feature, latlng) {
        return new L.CircleMarker(latlng, {radius: 3, fillOpacity: 0.85});
    },

    onEachFeature: function (feature, layer) {
        layer.bindPopup(pointPopup(feature));
    }
  });

  map.addLayer(featureGroup);

  $("#legend_gen").hide();
  $("#legend_Tot").hide();
  $("#legend_Dir").show();
  $("#legend_Roun").hide();
  $("#legend_Dist").hide();

};


var slide3Func = function(){
  clearMap();
  // defaultMapview();

  map.setView([40.757, -73.974], 13);

      myStyle = function(feature){
        return {
          stroke: true,
          strokeOpacity: 1,
          fillOpacity: 0.5,
          color: colorRamp[3],
          radius: feature.properties.Rount_tripsP* 1.2
        };
      };

      featureGroup = L.geoJson(parsedData, {
       style: myStyle,
       pointToLayer: function(feature, latlng) {
           return new L.CircleMarker(latlng, {radius: 3, fillOpacity: 0.9});
       },
       onEachFeature: function (feature, layer) {
           layer.bindPopup(pointPopup(feature));
       }

     }).addTo(map);

     $("#legend_gen").hide();
     $("#legend_Tot").hide();
     $("#legend_Dir").hide();
     $("#legend_Roun").show();
     $("#legend_Dist").hide();

};




var slide4Func = function() {
  clearMap();
  defaultMapview();

  map.setView([40.687, -74.174], 12);

  colorRampCon = ["#F2F2F2", "#93BFAF","#6DA67B","#6DA6A0","#192E40"];


  colorPolygons = function(feature){
    if (feature.properties.TotalTrip <= 1000) {
      return colorRampCon[0];
    } else if (feature.properties.TotalTrip <= 5000 &&feature.properties.TotalTrip > 1000 ) {
      return colorRampCon[1];
    } else if (feature.properties.TotalTrip <= 20000 && feature.properties.TotalTrip > 5000) {
      return colorRampCon[2];
    } else if (feature.properties.TotalTrip <= 100000 && feature.properties.TotalTrip <= 20000 ) {
      return colorRampCon[3];
    }  else if (feature.properties.TotalTrip > 100000 ) {
      return colorRampCon[3];
    }
  };

  myStyle = function(feature){
    var theStyle = {
      color: colorPolygons(feature),
      fillOpacity: 0.5,
      stroke: true,
      strokeOpacity: 1,
      weight: 1
    };
    return(theStyle);
  };

  featureGroup = L.geoJson(polyparsed, {
    style: myStyle,

    onEachFeature: function(feature, layer) {
        layer.bindPopup(polyPopUp(feature));
    }
  });
  map.addLayer(featureGroup);

  $("#legend_gen").hide();
  $("#legend_Tot").hide();
  $("#legend_Dir").hide();
  $("#legend_Roun").hide();
  $("#legend_Dist").show();
};


var slide5Func = function(){
  clearMap();
  defaultMapview();
}
