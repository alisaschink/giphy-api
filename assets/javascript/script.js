    //declares array of topics
    var topics = ["Pig", "Cat", "Dog", "Sloth"];

    //function re-renders the HTML to display the appropriate content
    function displayGifs() {

      //empties any gifs in the div with id "gifs-view"
      $("#gifs-view").empty();

      //sets newItem variable to be equal to the data-name of each button
      var newItem = $(this).data("name");

      //sets giphy api url
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        newItem + "&api_key=dc6zaTOxFJmzC&limit=10&rating=pg";

      //ajax query
      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response) {
        
        //logs response to the console 
        console.log(response);


        //sets variable results equal to response.data to retrieve image info
        var results = response.data

         for (var i = 0; i < results.length; i++) {

          //sets variable to create div
          var gifDiv = $("<div>");

          //sets variable to create paragraph
          var p = $("<p>");

          //sets inner text of the paragraph to the rating of the gif in results[i]
          p.text("Rating: " + results[i].rating);

          //sets variable to create image tag
          var gif = $("<img>");

          //sets image class
          gif.attr("class", "gif");

          //sets image src
          gif.attr("src", results[i].images.fixed_height_still.url);

          //sets image still url
          gif.attr("data-still", results[i].images.fixed_height_still.url);

          //sets image animate url
          gif.attr("data-animate", results[i].images.fixed_height.url);

          //sets image data-state
          gif.attr("data-state", "still");

          //appends the paragraph to the gifsDiv
          $(gifDiv).append(p);

          //appends the gif to the gifs div
          $(gifDiv).append(gif);

          //appends each gif to the gifs-view div
          $("#gifs-view").append(gifDiv);
          }
      });  
    };

      //function for displaying topic buttons
      function renderButtons() {

        //empties initial display of buttons so that doubles aren't created
        $("#buttons-view").empty();

        //loops through the array of topics
        for (var i = 0; i < topics.length; i++) {

          //generates buttons for each movie in the array
          var button = $("<button>");
          //adds a class of topic to button
          button.addClass("topic");
          //adds a data-attribute
          button.attr("data-name", topics[i]);
          //provides the initial button text
          button.text(topics[i]);
          //adds the button to the buttons-view div
          $("#buttons-view").append(button);
        }
      }

    
      //on click events to add topic when button is clicked
      $("#add-topic").on("click", function(event) {
        event.preventDefault();
        //grabs the input from the textbox
        var input = $("#user-input").val().trim();

        //adds topic from the textbox to topics array
        topics.push(input);

        //empties user input field
        // $("#user-input").empty();

        //runs function to create buttons
        renderButtons();

      });


    //function for gifs to animate/unanimate
    function animate(){

      //creates a state variable for each gifs data-state
      var state = $(this).data("state");

      //if statement to animate/unanimate on each click
      if (state === "still"){
          //sets gif src to animated url
          $(this).attr("src", $(this).data("animate"));
          //changes state to animate
          $(this).data("state", "animate");
        } else {
          //sets gif src to still url
          $(this).attr("src", $(this).data("still"));
          //changes state to still
          $(this).data("state", "still");
        };
    };

      //click event listeners for all elements with a class of "topic"
      $(document).on("click", ".topic", displayGifs);

      //click event listeners for all elements with a class of "gif"
      $(document).on("click", ".gif", animate);

      //runs function to create buttons
      renderButtons();
