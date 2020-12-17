/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// escape funtion for nasty hackers and trolls
const escape = function (str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

$(document).ready(function () {

  const createTweetElement = function (data) {

    // $tweet, <article> template from index.html
    const $tweet =
      $(`<article class="tweet">
    <header>
    <p id="header-name">${data.user["name"]}</p>
    <p id="header-handle">${data.user["handle"]}</p>
    </header>
    <p id="tweet-body">${escape(data.content["text"])}</p>
    <footer>${data["created_at"]}</footer>
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

    // throw errors for form validation
    let value = $('#tweet-text').val();
    if (value.length === 0) {
      alert('What? Nothing to tweet about?');
    }
    if (value.length > 140) {
      alert('Your song is too long...');
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