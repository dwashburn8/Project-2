$(document).ready(() => {
    var locations = [];
    var labels = [];
    var longitude = [];
    var latitude = [];

    function renderSearchInfo(searchData) {

        console.log(searchData);

        let k = 0;
        let j = 0;
        let rowElement = $("<div>");
        rowElement.addClass("pure-g");
        let mapElement = $("<div>");
        mapElement.attr("id", "map");
        $("#map").append(mapElement, rowElement);
        for (let i = 0; i < searchData.length; i++) {
            if (searchData[i].address !== "" && searchData[i].city == $("#map").val().trim()) {
                let search = searchData[i];
                houseCount = i + 1;
                let searchList = $("<ul>");
                let houseAddress = $("<h3>");
                let bedrooms = $("<p>")
                let bathrooms = $("<p>");
                let price = $("<p>");
                let size = $("<p>")
                if (searchData[i].latitude !== null) {
                    locations[k] = { lat: parseFloat(searchData[i].latitude), lng: parseFloat(searchData[i].longitude) }
                    let num = j + 1;
                    labels[k] = num.toString();
                    k += 1;
                }
                let houseInfo = {
                    address: "Address: " + searchData[i].properties.address,
                    Bedrooms: searchData[i].properities.beds,
                    bathrooms: searchData[i].properties.baths,
                    price: searchData[i].properties.price,
                    size: searchData[i].properities.building_size.size
                }
                saveData.push(houseInfo);
                j += 1;

                houseAddress.text("Address: " + searchData[i].properities.address);
                bedrooms.text(searchData[i].properties.beds);
                bathrooms.text("Bathrooms: " + searchData[i].properities.baths);
                price.text(" $ " + searchData[i].properties.price);
                size.text(searchData[i].properities.building_size.size + " sqft")
                searchList.append(houseAddress, bedrooms, bathrooms, price, size,);
                searchList.addClass("search-list");
                $(rowElement).append(searchList);
            }
        };
        initMap();
        for (let i = 0; i < j; i++) {
            save(i);
            console.log(j);
        };

        console.log(locations);
        console.log(labels);
    };

    let locationLat = 39.8283;
    let locationLng = -98.5795;

    //this is for diplaying map
    function initMap() {
        var options = {
            zoom: 10,
            center: { lat: locationLat, lng: locationLng }
        }
        //new map
        console.log("this is Map function")
        var map = new
            google.maps.Map(document.getElementById("map"), options);

        var markers = locations.map(function (location, i) {
            return new google.maps.Marker({
                position: location,
                label: labels[i % labels.length]
            });
        });

        // Add a marker clusterer to manage the markers.
        var markerCluster = new MarkerClusterer(map, markers,
            { imagePath: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m" });
    }



    $("#searchBtn").on("click", function (event) {
        event.preventDefault();

       


        $("#houses").empty();
        let city = $("#searchValue").val().trim();
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://realtor.p.rapidapi.com/properties/v2/list-for-sale?sort=relevance&city=" + city + "&limit=100&offset=0&state_code=",
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "realtor.p.rapidapi.com",
                "x-rapidapi-key": "28fa3a645fmsh6347d64020ec954p186251jsn525605cce2a6"
            }
        };

        $
            .ajax(settings)

            .then(function (response) {
                console.log(response);
                for(let i =0; i< response.properties.length; i++){
                    let locations = [{
                        lat: response.properties.address.lat,
                        lon: response.properties.address.lon
                    }]



                }
console.log(locations);

                var settings2 = {
                    "async": true,
                    "crossDomain": true,
                    "url": "https://google-maps-geocoding.p.rapidapi.com/geocode/json?language=en&latlng=40.714224%252C-73.96145",
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-host": "google-maps-geocoding.p.rapidapi.com",
                        "x-rapidapi-key": "28fa3a645fmsh6347d64020ec954p186251jsn525605cce2a6"
                    }
                }
                
                $.ajax(settings2).done(function (data) {
                    console.log(data);
                });
                // renderSearchInfo(response)
            })

        // let cityName = $("#houses").val().trim();
        // console.log(cityName);
        // let city = 
        // var apiKey = "AIzaSyDM2dKFVaRH8QYK4hoD5cDQy5niJlEtGbs";
        // let searchTerms = $("#houses").val();
        // let corsUrl = "https://cors-anywhere.herokuapp.com/"
        // var queryUrl = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + searchTerms + "&key=" + apiKey

        // $
        //     .ajax({
        //         url: queryUrl,
        //         method: "GET"

        //     })
        //     .then(function (response) {
        //         console.log(response)
        //         locationLat = response.results[0].geometry.location.lat
        //         locationLng = response.results[0].geometry.location.lng
        //         console.log("these are the coordinates");
        //     });

    });

})
// function fetchStatus(address) {
//     var client = new XMLHttpRequest();
//     client.onload = function() {
//       // in case of network errors this might not give reliable results
//       returnStatus(this.status);
//     }
//     client.open("HEAD", address);
//     client.send();
//   }
//   fetchStatus();

