// Since I added my starter buttons I created a blank thnings array to push my search resultsinto, will remove this when my bug is found,
// var things = [];
var things = ["Psych" , "The Office" , "Top Gun" , "Parks and Rec" , "Lord of the Rings" , "Malcom in the Middle" , "Harry Potter" , "Dredd" , "Game of Thrones"];
//created a function to render my buttons
function renderButtons() {
    $("#buttons-view").empty();
    //this grabs the information from my search bar, by the class of the bar, based on the click, the n runs the following function
    $("#add-thing").on("click", function(event) {
    //this prevents the default from the API               
    event.preventDefault();
    //this grabs the infromation from the search bar and puts it into a variable
    var thing = $("#thing-input").val().trim();
    //then it is pushed into the previously created arry where the buttons are made
    things.push(thing);
    renderButtons();
    });

    // $("#buttons").empty();
    //A for loop to each of the items in the things array
    for (var i = 0; i < things.length; i++) {
    //creates a variable a to create a button
    var a = $("<button>");
    //adds the class "thing" to the button
    a.addClass("thing");
    //adds a data-thing element and names it the same as the item in the things array
    a.attr("data-thing", things[i]);
    //adds text to the HTML based on the name of the item fomr the things array
    a.text(things[i]);
    //this then adds the button just made button to the div "buttons view"
    $("#buttons-view").append(a);
}}

renderButtons();

//this is a function that is started on the click of any button
$("button").on("click", function() {
    console.log('testing')
    //this empties out the gifs appear div so there are not too many gifs loaded at the same time
    $("#gifs-appear-here").empty();
    //creates a things variable based on the "data-thing" element of the button clicked
    var things = $(this).attr("data-thing");
    //runs the previous variable through the website to have a link to the related gifs
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + things + "&api_key=dc6zaTOxFJmzC&limit=10";
    //runs ajax based on the previous website link using the method of get
    $.ajax({
        url: queryURL,
        method: "GET",
        //based on the infomation it runs the function
    }).then(function(response) {
        //creates a short cut variable to reduce the amount of repeative typing
        var results = response.data;
        //consoles the webite links
        console.log(queryURL)
        //creates another for loop based on the reults(this will be 10 as the limit on the url used was se to 10, but can be changed)
        for (var i = 0; i < results.length; i++) {
            //creates a div to hold the below infromation
            var gifDiv = $("<div>");
            //pulls the rating from the API code and puts it in a variable
            var rating = results[i].rating;
            //the next two will be used to when I implentment the code to click start the gifs and pause
            var defaultAnimatedSrc = results[i].images.fixed_height.url;
            var staticSrc = results[i].images.fixed_height_still.url;
            //puts the pulls the rating and puts in a p-tag for easy display
            var p = $("<p>").text("Rating: " + rating);
            //creates an image tag
            var thingImage = $("<img>");
            //
            thingImage.attr("src", staticSrc);
            //adds the animated portion of the gif
            thingImage.attr("src", defaultAnimatedSrc);
            //adds class of "thing" to the image tag
            thingImage.addClass("thing");
            //
            thingImage.attr("data-state", "still");
            // puts the static image url into the data-still element will bes used lated to make images still on click
            thingImage.attr("data-still", staticSrc);
            //puts the animated gif url into the data-animate element will bes used lated to make images animate on click
            thingImage.attr("data-animate", defaultAnimatedSrc);
            //adds the rating text to the div
            gifDiv.prepend(p);
            //adds the image-tag to the div
            gifDiv.prepend(thingImage);
            //puts the div into another div that is already on the HTML
            $("#gifs-appear-here").prepend(gifDiv);
        }
    });
});


$(document).on('click', 'button',function(){
    console.log('working')
    $("#gifs-appear-here").empty();
    //creates a things variable based on the "data-thing" element of the button clicked
    var things = $(this).attr("data-thing");
    //runs the previous variable through the website to have a link to the related gifs
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + things + "&api_key=dc6zaTOxFJmzC&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET",
        //based on the infomation it runs the function
    }).then(function(response) {
        //creates a short cut variable to reduce the amount of repeative typing
        var results = response.data;
        //consoles the webite links
        console.log(queryURL)
        //creates another for loop based on the reults(this will be 10 as the limit on the url used was se to 10, but can be changed)
        for (var i = 0; i < results.length; i++) {
            //creates a div to hold the below infromation
            var gifDiv = $("<div>");
            //pulls the rating from the API code and puts it in a variable
            var rating = results[i].rating;
            //the next two will be used to when I implentment the code to click start the gifs and pause
            var defaultAnimatedSrc = results[i].images.fixed_height.url;
            var staticSrc = results[i].images.fixed_height_still.url;
            //puts the pulls the rating and puts in a p-tag for easy display
            var p = $("<p>").text("Rating: " + rating);
            //creates an image tag
            var thingImage = $("<img>");
            //
            thingImage.attr("src", results[i].images.fixed_height.url);
            //adds the animated portion of the gif
            thingImage.attr("src", defaultAnimatedSrc);
            //adds class of "thing" to the image tag
            thingImage.addClass("thing");
            thingImage.attr("data-state", "still");
            // puts the static image url into the data-still element will bes used lated to make images still on click
            thingImage.attr("data-still", staticSrc);
            //puts the animated gif url into the data-animate element will bes used lated to make images animate on click
            thingImage.attr("data-animate", defaultAnimatedSrc);
            //adds the rating text to the div
            gifDiv.prepend(p);
            //adds the image-tag to the div
            gifDiv.prepend(thingImage);
            //puts the div into another div that is already on the HTML
            $("#gifs-appear-here").prepend(gifDiv);
        }
    });
    
    $(document).on("click", ".thing",  function() {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
});
})


// renderButtons();
