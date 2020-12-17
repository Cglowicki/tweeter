/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  
  const loadTweets = function() {
    // get request from server renders data into tweets
    $.ajax('http://localhost:8080/tweets', { method: 'GET' })
      .then(function(data) {
        renderTweets(data);
      });
    };

  const createTweetElement = function (data) {
    
    // $tweet, <article> template from index.html
    const $tweet =
    $(`<article class="tweet">
    <header>
    <p id="header-name">${data.user["name"]}</p>
    <p id="header-handle">${data.user["handle"]}</p>
    </header>
    <p id="tweet-body">${data.content["text"]}</p>
    <footer>${data["created_at"]}</footer>
    </article>`);
    return $tweet;
  };
  
  const renderTweets = function (data) {
    
    for (let info of data) {
      //loop and createTweetElement for each item in data
      const $tweet = createTweetElement(info);
      //appends to parent container
      $('#tweet-container').append($tweet);
    }
  };

  //override default behaviour of form
  $('form').submit(function (evt) {
   /*  .catch((error => {
      if ('form' === '') {
        alert(error, 'nothing to tweet about?')
      }
    }); */
    evt.preventDefault();
    $.ajax({ method: 'POST', url: '/tweets', data: $(this).serialize() })
      .then(renderTweets(data))
  });
  
  loadTweets()

});



