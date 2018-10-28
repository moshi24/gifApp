var topics = ["Klay Thompson", "Stephen Curry", "Kevin Duran", "Draymond Green", "Andre Iguodala"];


      function displayNbaInfo() {

        var movie = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=pjgxy5YeddhH91GFLpWQ87EW0gadsezN&limit=10";

       
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
          console.log(queryURL);
          
          console.log(response);
          
          var results = response.data;

          for (var i = 0; i < results.length; i++) {

            var animalDiv = $("<div>");
 
            var p = $("<p>").text("Rating: " + results[i].rating);

            var myImage = $("<img>");
            
            myImage.attr("src", results[i].images.fixed_height-still.url);
            myImage.attr("data-still", results[i].images.fixed_height_still.url);
            myImage.attr("data-animate", results[i].images.fixed_height.url);
            myImage.attr("data-state", "still");
            myImage.addClass("gif");

            animalDiv.append(p);
            animalDiv.append(myImage);

            $("#nba-view").prepend(animalDiv);
          }
         
          $("#nba-view").prepend(movieDiv);
        });

      }

      function renderButtons() {

        $("#buttons-view").empty();

       
        for (var i = 0; i < topics.length; i++) {

          var a = $("<button>");
          
          a.addClass("nba-btn");
          
          a.attr("data-name", topics[i]);
          
          a.text(topics[i]);
          
          $("#buttons-view").append(a);
        }
      }

      $(".gif").on("click", function(event){
        event.preventDefault();
        var state = $(this).attr("data-state");
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
          
        }
      });

      $("#add-player").on("click", function(event) {
        event.preventDefault();
        
        var movie = $("#nba-input").val().trim();

        topics.push(movie);

        renderButtons();
      });

    
      $(document).on("click", ".nba-btn", displayNbaInfo);

      renderButtons();