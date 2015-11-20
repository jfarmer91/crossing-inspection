require([
  "esri/map",
  "esri/dijit/Search",
  "esri/layers/FeatureLayer",
  "esri/InfoTemplate",
  "dojo/domReady!"
  ],
  function (Map, Search, FeatureLayer, InfoTemplate) {
    var map = new Map("map", {
      basemap: "gray",
      center: [-72.68, 43.785], // lon, lat
      zoom: 8
    });


    //Add map layers
    var crossingUrl = "http://services1.arcgis.com/NXmBVyW5TaiCXqFs/arcgis/rest/services/CrossingInspections2015/FeatureServer/1";

    var crossingTemplate = new InfoTemplate("Railroad Crossing", "DOT Crossing Number: ${DOT_Num}</br>Line Name: ${LineName}</br>Feature Crossed: ${Feature_Crossed}</br>Warning Device Level: ${WDCode}</br>Crossing Codition: ${XingCond}");

    var crossingPoints = new FeatureLayer(crossingUrl, {
      id: "crossing-points",
      outFields: ["*"],
      infoTemplate: crossingTemplate
    });

    var signUrl = "http://vtransmap01.aot.state.vt.us/arcgis/rest/services/Rail/CrossingInspections2015/FeatureServer/0";

    var signTemplate = new InfoTemplate("Crossing Sign", "DOT Crossing Number: ${DOT_Num}</br>Sign Type: ${SignType}</br>Sign Condition: ${SignCondition}</br>Installation Date: ${InstallDate}");

    var signPoints = new FeatureLayer(signUrl, {
      id: "sign-points",
      outFields: ["*"],
      infoTemplate: signTemplate
    });

    map.addLayer(crossingPoints);
    map.addLayer(signPoints);

    //Build search
    var s = new Search({
      enableLabel: false,
      enableInfoWindow: true,
      showInfoWindowOnSelect: false,
      map: map
    }, "search");

    var sources = s.get("sources");

    //Push the sources used to search, by default the ArcGIS Online World geocoder is included.
    sources.push({
      featureLayer: new FeatureLayer("http://services1.arcgis.com/NXmBVyW5TaiCXqFs/arcgis/rest/services/CrossingInspections2015/FeatureServer/1"),
      searchFields: ["DOT_Num", "RRXingNum", "Town", "County", "LineName", "Feature_Crossed"],
      suggestionTemplate: "${DOT_Num}, Line: ${LineName}, Street: ${Feature_Crossed}, Warning Device: ${WDCode}, Condition: ${XingCond}",
      exactMatch: false,
      outFields: ["DOT_Num", "Feature_Crossed", "LineName", "WDCode", "XingCond"],
      name: "Railroad Crossings",
      placeholder: "Search by DOT #, Line, Street, Town, or County",
      maxResults: 10,
      maxSuggestions: 10,


      //Create an InfoTemplate and include three fields
      infoTemplate: new InfoTemplate("Railroad Crossing", "DOT Crossing Number: ${DOT_Num}</br>Line Name: ${LineName}</br>Feature Crossed: ${Feature_Crossed}</br>Warning Device Level: ${WDCode}</br>Crossing Codition: ${XingCond}"),
      enableSuggestions: true,
      minCharacters: 0
    });

    sources.push({
      featureLayer: new FeatureLayer("http://services1.arcgis.com/NXmBVyW5TaiCXqFs/ArcGIS/rest/services/CrossingInspections2015/FeatureServer/0"),
      autoNavigate: false, //This prevents automatic navigation straight to sign feature when searched
      searchFields: ["DOT_Num", "SignType"],
      suggestionTemplate: "${DOT_Num}, Sign Type: ${SignType}, Condition: ${SignCondition}, Installed: ${InstallDate}",
      exactMatch: false,
      name: "Crossing Signs",
      outFields: ["*"],
      placeholder: "Search for crossing signs by Sign Type or DOT #",
      maxResults: 10,
      maxSuggestions: 10,

      //Create an InfoTemplate

      infoTemplate: new InfoTemplate("Crossing Sign Information", "DOT # of Associated Crossing: ${DOT_Num}</br>Type of Sign: ${SignType}</br>Condition: ${SignCondition}"),

      enableSuggestions: true,
      minCharacters: 0
    });

    //Set the sources above to the search widget
    s.set("sources", sources);

    s.startup();

});
