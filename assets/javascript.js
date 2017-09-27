$(document).ready(function() {

    // the main array

    var nerdShit = [
        "Street Fighter 2", "Battlegrounds", "Dota2", "Magic: The Gathering",
        "Your Name", "Koe No Katachi", "Welcome to the NHK"
    ];

    // function to add new buttons

    function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
        $(areaToAddTo).empty();

        // for loop to add a new button to existing buttons

        for (var i = 0; i < arrayToUse.length; i++) {
            var a = $("<button>");
            a.addClass(classToAdd);
            a.attr("data-type", arrayToUse[i]);
            a.text(arrayToUse[i]);
            $(areaToAddTo).append(a);
        }

    }

    // on click button to 
    $(document).on("click", ".nerdShit-button", function() {
        $("#nerdShit").empty();
        $(".nerdShit-button").removeClass("active");
        $(this).addClass("active");

        //set data type
        var type = $(this).attr("data-type");

        //api call + limit return results to 10
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=AMB2bBj44Cxo2BWM5HtfGt5jI25uQ5aC&limit=10";

        //ajax call
        $.ajax({
                url: queryURL,
                method: "GET"
            })

            // function to add new gifs
            .done(function(response) {
                var results = response.data;

                // for loop to add 10 gifs
                for (var i = 0; i < results.length; i++) {
                    var nerdShitDiv = $("<div class=\"nerdShit-gifs\">");

                    var rating = results[i].rating;

                    // adding the rating of the gif
                    var p = $("<p>").text("Rating: " + rating);

                    // adding variables for animating / pausing gifs
                    var animated = results[i].images.fixed_height.url;
                    var still = results[i].images.fixed_height_still.url;

                    // creating the attributes to animating and pausing gifs
                    var nerdShitImage = $("<img>");
                    nerdShitImage.attr("src", still);
                    nerdShitImage.attr("data-still", still);
                    nerdShitImage.attr("data-animate", animated);
                    nerdShitImage.attr("data-state", "still");
                    nerdShitImage.addClass("nerdShit-image");

                    nerdShitDiv.append(p);
                    nerdShitDiv.append(nerdShitImage);

                    $("#nerdShit").append(nerdShitDiv);
                }
            });
    });

    // on click even to pause / animate gifs
    $(document).on("click", ".nerdShit-image", function() {

        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

    // adding new buttons / topics to the app
    $("#add-nerdShit").on("click", function(event) {
        event.preventDefault();
        var newNerdShit = $("input").eq(0).val();

        if (newNerdShit.length > 2) {
            nerdShit.push(newNerdShit);
        }

        populateButtons(nerdShit, "nerdShit-button", "#nerdShit-buttons");

    });

    populateButtons(nerdShit, "nerdShit-button", "#nerdShit-buttons");
});