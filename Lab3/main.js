$(document).ready(function(){
    const url = "http://50.21.190.71/get_tweets"

    // reset any changes from the previous useage 
        // previous tweets
        // checkbox
        // if there is still text in search bar

    function autorefresh() {
        // Get the status of the checkbox
        var isChecked = document.getElementById("feedRefresh").checked;
        // If it is not checked, then we will call our fetch every X seconds
        if (isChecked == false) {
            time = setInterval(function () {
               getRequest();
            }, 10000);
        } else if (isChecked == true) {
            // If it is checked, we want it to pause, so we clear the interval
            clearInterval(time);
        }
    }

    // Function that automatically fetches new tweets
    autorefresh();
    // Get the checkbox, add a listener that activates when checked/unchecked
    document.getElementById('feedRefresh').addEventListener('click', autorefresh);

    getRequest();

    function getRequest() {
        fetch(url)
            .then(res => res.json()) .then(data => {  
        // do something with data
            
            // Remove duplicates            

            // Set the center div to be the tweets
            
            // When the search is activated:
            // Search all tweets for matching values
            // Set the current tweets to be ones that match search value
        })
        .catch(err => {
            // error catching
        console.log(err) }) 
    }

    function removeDuplicates(duplicatesDataArr) {
        // For all of new tweets
        // Check the array of all previous tweets for any duplicates
        // Remove duplicates
        // If not a duplicate, add it to list of all previous tweets
    }

    function searchArray(dataArr, value) {
        // Go through each tweet, and check if there is a matching value in the tweet
        // Return array of all matching tweets
    }

    function appendTweets(dataArrUnsort) {
        // Get the content-center element. We want to add tweets to this

        // Suggest emptying the current tweets at some point
        
        // Sort the array of tweets chronologically

        // For each tweet       
            
            // Create a div that you can append to content-center

            // We want to include the profile picture
                // Can check if the image exists 
                    var http = new XMLHttpRequest();
                    http.open("HEAD", imgURL)
                    http.send();
                    if (http.status != 404) 
                        // Success! 
                        // Add the img to the Tweet we are creating
                    // else
                        // Append a default image

          
            // Create all of the additional pieces of information
                // Date (formatted)
                // Tweet contents
                // Username
            
            // You can create all of these div elements with jquery
            // and then manually add them to the Tweet div
            
    }
});