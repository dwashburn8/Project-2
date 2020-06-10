$(document).ready(() => {


    let city = $("#searchValue").val()
    let favoriteArr = [];
    let cityVal = city.split(',');
    let cityName = cityVal[0]
    // let stateCode = $("");







    $("#searchBtn").on("click", function (event) {
        let city = $("#searchValue").val()
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://realtor.p.rapidapi.com/properties/v2/list-for-sale?sort=relevance&city=" + city + "&limit=100&offset=0&state_code=",
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "realtor.p.rapidapi.com",
                "x-rapidapi-key": "28fa3a645fmsh6347d64020ec954p186251jsn525605cce2a6"
            }
        }
        console.log(city);
        event.preventDefault()

        $.ajax(settings).done((response) => {
            console.log(response);

            for (let i = 0; i < response.properties.length; i++) {
                var newDiv = $("<div>")
                var newTitle = $("<h3>");
                var newImg = $("<img>");
                var newP = $("<p>");
                var newP2 = $("<p>");
                var newP3 = $("<p>");
                var newP4 = $("<p>");
                var newButton = $("<button>")
                newButton.attr("class", "btn btn-danger saveButton")

                newDiv.attr("class", "col-4 pt-3")
                newImg.attr("height", "200px")
                newImg.attr("width", "300px")
                newButton.text("Save to favorites")
                newTitle.text(response.properties[i].address.line);
                newImg.attr("src", response.properties[i].thumbnail);
                newP.text("Price: $" + response.properties[i].price);
                newP2.text("Bedrooms: " + response.properties[i].beds);
                newP3.text("Bathrooms: " + response.properties[i].baths);

                if (response.properties[i].building_size) 
                {
                    newP4.text(response.properties[i].building_size.size + " sqft")
                }

                newDiv.append(newTitle)
                newDiv.append(newImg)
                newDiv.append(newP)
                newDiv.append(newP2)
                newDiv.append(newP3)
                newDiv.append(newP4)
                newDiv.append(newButton)
                $("#houses").prepend(newDiv)

            }





            $(".saveButton").on("click", (event) => {
                event.preventDefault();
                let favoriteHouse = [{
                    address: newTitle.val(),
                    img: newImg.val(),
                    price: newP.val(),
                    bedrooms: newP2.val(),
                    bathrooms: newP3.val(),
                    sqft: newP4.val()
                }]
                favoriteArr.push(favoriteHouse)
                console.log(favoriteHouse);
        
            })
        });






    })

})