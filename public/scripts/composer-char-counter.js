$(document).ready(function () {

  $('#error').slideUp(1);

  $('.new-tweet').on('keyup', 'textarea', function (evt) {

    //.new-tweet is parent to textarea and counter
    //action happens on textarea
    const counter = $(this).parent().find(".counter")
    //find child .counter of .new-tweet
    let length = 140 - this.textLength;
    $(counter).text(length);

    //counter red for over char limit
    if (counter.val() < 0) {
      counter.css({ color: "red" });
    } else {
      counter.css({ color: "#545149" });
    }

    // dynamic error message for length > 140
    if (this.textLength > 140) {
      $('#error').slideDown(1000);
      $('#error').html('Your song is too long...');
    } else {
      $('#error').slideUp(1000);
      $('#error').html(null);
    }
  })

});