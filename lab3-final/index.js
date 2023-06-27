// basically waits for the html to finish loading.
$(document).ready(function(){
    const url = "http://50.21.190.71/get_tweets"
    var main_array = [];

    tweetBorder = ' <div class="tweetborder">  </div>';
    picture = ' <div class="picture"> </div>';
    currentTweet = '<div class="tweethere"> </div>'
    profilePicture = '<img id="ratpro" src="images/ratatouille.jpg" alt="cartoon rat">'
    tweetHeader = '<p class="Remy"><b>Remy </b><span class="centerinfo">@remy Nov 16</span></p>'
    tweetBody = '<div class="tweet">Im taking this class called CS 110 and the TAs are all so <b>cool</b>!</div>'

    tweetBorder = $(tweetBorder).append($(picture).append(profilePicture));
    tweetBorder = $(tweetBorder).append($(currentTweet).append(tweetHeader).append(tweetBody));

    getRequest();
    autorefresh();

    // Function that automatically fetches new tweets
    // Get the checkbox, add a listener that activates when checked/unchecked
    /**
     * uses addeventlistener to check if the checkbox is press or not
     * autorefresh the tweets every 5 seconds if box is not checked
     * @returns nothing
     */
    function autorefresh() {
        // Get the status of the checkbox
        var isChecked = document.getElementById("feedRefresh");
        // If it is not checked, in the beginning, call getrequest and start timer
        time = setInterval(function() {
            getRequest();
        }, 5000)
        var time;
        isChecked.addEventListener("change", () => {
            if(isChecked.checked) {
                console.log("checkbox is checked")
                clearInterval(time);

            }
            else{
                time = setInterval(function() {
                getRequest();
            }, 5000)
                console.log("not check")
            }
        })
    }
    /**
    * Does a get request to pull tweets from the website
    * @returns nothing and appends tweets that have been pulled
    */
    function getRequest() {
        fetch(url)
        .then(res => res.json()) .then(data => {  
        // do something with data
            console.log("called");
            main_array.push(data)
            main_array = main_array.flat()
            main_array = removeDuplicates(main_array); // remove duplicates    
            // Set the center div to be the tweets
            
            // When the search is activated
            if(!$('input').val()) {
                console.log("empty");
                //appendTweets(searchArray(main_array, "bitcoin".toLowerCase()))
                appendTweets(main_array);

                searchBar();
            }
            else {
                appendTweets(searchArray(main_array, $('input').val().toLowerCase()))
            }
            // Search all tweets for matching values
            // Set the current tweets to be ones that match search value
           
        })
        
        .catch(err => {
            // error catching
        console.log(err) }) 
    }
    /**
     * uses the addeventlistener to take in words from the searchbar
     * compares the words in the searchbar to the array to append similar tweets
     * @returns nothing 
     */
    addEvtLis = new Boolean(true)
    function searchBar() {
        
        let searchString = " ";
        console.log(searchString);
        
        var someArray = main_array;

        searchInput = event => {
            console.log(event.keyCode); 
            searchString = event.target.value.toLowerCase();
            
            console.log(searchString);
            //filter array to match search
            filterstuff = searchArray(main_array, searchString); 
            filterstuff = removeDuplicates(filterstuff); 
            console.log(filterstuff);
            appendTweets(filterstuff);
        }
        
        //make sure to add only one eventlistener
        if (addEvtLis == true){ 
            console.log(addEvtLis)
            document.getElementById('searchbar').addEventListener('keypress', searchInput);
            addEvtLis = new Boolean(false)
        }
       
        console.log("ran");
    }
    
    /**
    * Returns an array that has unique text (removes duplicates)
    * @params {array} duplicatesDataArr
    * @returns {array} unique tweets as an array
    */
    function removeDuplicates(duplicatesDataArr) {
        // For all of new tweets
        let uniqueTweets = [];
        // Check the array of all previous tweets for any duplicates
        duplicatesDataArr.forEach((tweet) => {
            if(!uniqueTweets.includes(tweet["text"])){
                uniqueTweets.push(tweet);
            }
        })
        // Remove duplicates
        // If not a duplicate, add it to list of all previous tweets
        return uniqueTweets
    }

    /**
    * Returns an array that has text that matches input value
    * @params {array} dataArr
    * @params {string} value
    * @returns {array} tweets that have the string, value, are pushed into it and appended
    */
    function searchArray(dataArr, value) {
        // Go through each tweet, and check if there is a matching value in the tweet

        
        newArray = []
        for(let i =0; i < dataArr.length; i++){
            if (dataArr[i]["text"].toLowerCase().includes(value)){
                newArray.push(dataArr[i])
                // console.log(dataArr[i]["text"])
            }
        }
    
        // console.log(newArray)
        
        // // Return array of all matching tweets
        return newArray
    }

    /**
    * adds tweets to div content-center
    * @params {array} dataArrUnsort
    * does not return anything, appends to the content-center div to add new tweets
    */
    async function appendTweets(dataArrUnsort) {
        // Get the content-center element. We want to add tweets to this
        contentCenter = $("#content-center");

        // Suggest emptying the current tweets at some point
        contentCenter.find('.tweetborder').remove();
        // Sort the array of tweets chronologically

        sortArray(dataArrUnsort);
        console.log(dataArrUnsort);
        // searchArray(dataArrUnsort, "elonmusk");
        // For each tweet       
        for(let i =0; i < dataArrUnsort.length; i++){
            
            username = dataArrUnsort[i]["user_name"];
            date = dataArrUnsort[i]["date"];
            body = dataArrUnsort[i]["text"];
            pfpPath = "images/ratatouille.jpg";
            date = moment(date).format("MMMM DD, YYYY HH:MM:SS")
            // var http = new Request("http://pbs.twimg.com/profile_images/609862294814740481/zbQuL-8v_normal.jpg");
            // fetch(http).then((response) =>{
            //     console.log(response.status)
            //     if (response.status === 200){
            //         pfpPath = "http://pbs.twimg.com/profile_images/609862294814740481/zbQuL-8v_normal.jpg";
            //     }
            // })
            avatar = dataArrUnsort[i]["avatar"]
            async function apiRequest()  {
                const url = avatar;
                const response = await fetch(url);
                const status = response.status;
                // console.log(status)
                // console.log(status != 404)
                if (status != 404){
                    pfpPath = avatar;
                    // console.log(pfpPath)
                }
              }

            await apiRequest();       
            
            // Create a div that you can append to content-center
            tweetBorder = ' <div class="tweetborder">  </div>';
            picture = ' <div class="picture"> </div>';
            currentTweet = '<div class="tweethere"> </div>';
            profilePicture = '<img id="ratpro" src='+pfpPath+' alt="cartoon rat">';
            tweetHeader = '<p class="Remy"> <b>' + username +' </b><span class="centerinfo"> @'+ username +" "+ date + '</span></p>';
            tweetBody = '<div class="tweet">' + body +'</div>';
            tweetBorder = $(tweetBorder).append($(picture).append(profilePicture));
            tweetBorder = $(tweetBorder).append($(currentTweet).append(tweetHeader).append(tweetBody));
            contentCenter.append(tweetBorder);
        }

            // We want to include the profile picture
                // Can check if the image exists 
                    // var http = new XMLHttpRequest();
                    // http.open("HEAD", imgURL)
                    // http.send();
                    // if (http.status != 404) 
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

    // https://stackoverflow.com/questions/8837454/sort-array-of-objects-by-single-key-with-date-value
    // function to sort array by date
    /**
    * Sorts the array, then reverses for most recent on top, oldest on bottom
    * @params {array} array
    * does not return anything, changes the array
     */
    function sortArray(array) {
        array.sort(function(a, b){
            keyA = new Date(a.date), keyB = new Date(b.date);
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
        })
        array = array.reverse();
    }

});
index.js