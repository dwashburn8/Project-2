$(document).ready(() => {


    let city = $("#searchValue").val()
    let favoriteArr = [];




    $("#searchBtn").on("click", function (event) {
        $("#houses").empty();
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
                newButton.attr("value", response.properties[i].property_id)

                newDiv.attr("class", "col-4 pt-3 wrapper")
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
            
            $(".wrapper").on("click", ".saveButton", (event) => {
                event.preventDefault();
                let houseIndex= response.properties.map(house=>{
                  return  house.property_id
                }).indexOf(event.target.value)
              
                let houseToSave = response.properties[houseIndex]

            

                let favoriteHouse = [{
                    address: houseToSave.address.line,
                    img: houseToSave.thumbnail,
                    price: houseToSave.price,
                    bedrooms: houseToSave.beds,
                    bathrooms: houseToSave.baths,
                    sqft: houseToSave.building_size.size
                }]
                favoriteArr.push(favoriteHouse)
                console.log(favoriteArr);
        
            })

        });

    })

})