	//Initial Array
	let topics =  ['lizard', 'bear', 'dog', 'shark', 'peacock', 't-rex'];

	//Creating a button for every string in the array
	for (let i = 0; i < topics.length; i++){
		$('#animal-Btns').append('<button class="button">' + topics[i] + '</button>');
		// console.log(topics[i]);
	}
	
	//Taking the input of the user and creating a button then running the api
	$("#addAnimal").on('click', function(){
	 	let newBtn = $("#animal-input").val();
	 	topics.push(newBtn);
	 	console.log(topics);
	 	$('#animal-Btns').append('<button class="button">' + newBtn + '</button>');
	 	Api();
	 })
	
	//api key = WzRExc4fETub8MziKY7hy0hZ9jDu2ZoX
	function Api(){

	 $(".button").on("click", function() {
	 	$('#animal-Gifs').html("");
	 	//taking the text of clicked on button
	 	const animal = $(this).text();
	 	console.log(animal);
	 	//searching for animal variable that was clicked on
      	const queryURL = "https://api.giphy.com/v1/gifs/search?q=" + 
      	animal + "&api_key=WzRExc4fETub8MziKY7hy0hZ9jDu2ZoX&limit=10";

      $.ajax({
        url: queryURL,
        method: "GET"
      })
      .done(function(response) {
      	console.log(response);

      	const results = response.data;

      	for (let i = 0; i < results.length; i++){

      		const animalDiv = $('<div>');
      		const p = $('<p>').text("Rating : " + results[i].rating);
      		const animalImage = $("<img>");
      		//initial image displayed
      		animalImage.attr("src", results[i].images.fixed_height_still.url);
      		//making the attr still so we can pause and play
      		animalImage.attr("data-state", 'still');
      		//gif displayed when animated
      		animalImage.attr("data-animate", results[i].images.fixed_height.url);
      		//gif displayed when still
      		animalImage.attr("data-still", results[i].images.fixed_height_still.url);
      		animalImage.addClass('gif');


      		animalDiv.append(p);
      		animalDiv.append(animalImage);

      		$("#animal-Gifs").prepend(animalDiv);
      	}

      		$(".gif").on('click', function(){
				//finding the current state of the image
	 			const state = $(this).attr("data-state");
      			//if its still then when clicked on it will animate
      			//and change the data-state to animate
      			if (state === "still") {
       			$(this).attr("src", $(this).attr("data-animate"));
        		$(this).attr("data-state", "animate");
      			} else {
      			//if its animated when clicked on it will change to still
       			$(this).attr("src", $(this).attr("data-still"));
       			$(this).attr("data-state", "still");
      			}
	 		});

      });
    });
 } 
 Api();