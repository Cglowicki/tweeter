/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// escape function for nasty hackers and trolls
const escape = function (str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

const dateConvert = function(unix) {
  let date = new Date(unix);
  let fdate = date.getFullYear() + '/' + ("0" + (date.getMonth() + 1)).slice(-2) + '/' + ("0" + date.getDate()).slice(-2);
  return fdate;
};

$(document).ready(function () {

  const createTweetElement = function (data) {

    // $tweet, <article> template from index.html
    const $tweet =
      $(`<article class="tweet">
    <header>
    <div>
    <img src=${data.user["avatars"]} alt="avatar" class="avatar"/>
    <p class="header-name">${data.user["name"]}</p>
    </div>
    <p class="header-handle">${data.user["handle"]}</p>
    </header>
    <p id="tweet-body">${escape(data.content["text"])}</p>
    <footer>
    <p>${dateConvert(data["created_at"])}</p>
    <div class="icons">
    <i class="fas fa-heart" id="heart"></i>
    <i class="fas fa-retweet" id="retweet"></i>
    <i class="fas fa-flag" id="flag"></i>
    </div>
    </footer>
    </article>`);
    return $tweet;
  };

  const renderTweets = function (data) {

    $('#tweet-container').empty() // emptied so data isn't looped over again

    for (let info of data) {
      //loop and createTweetElement for each item in data
      const $tweet = createTweetElement(info);
      //appends to parent container
      $('#tweet-container').prepend($tweet);
    }
  };

  const loadTweets = function () {
    // get request from server renders data into tweets
    $.ajax('http://localhost:8080/tweets', { method: 'GET' })
      .then(function (data) {
        renderTweets(data);
      });
  };

  //override default behaviour of form
  $('form').submit(function (evt) {
    

    evt.preventDefault();
    
    let value = $('#tweet-text').val();

    // throw errors for form validation
    if (value.length === 0) {
      $('#error').slideDown(3000);
      $('#error-text').html('Nothing to sing about?');
      $('#error').slideUp(1000);
      //$('#error-text').html(null);
    }
    if (value.length > 140) {
      return null;
    }
    
    // post request to tweets, $tweet prepends to top of container on load
    $.ajax({ method: 'POST', url: '/tweets', data: $(this).serialize() })
      .then(() => {
        loadTweets();

      });
    // clear form and reset counter
    this.reset();
    $('.counter').text(140);
  });

  loadTweets();
});