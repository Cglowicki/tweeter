$(document).ready(function () {

  $('.new-tweet').on('keyup', 'textarea', function (evt) {

    //.new-tweet is parent to textarea and counter
    //action happens on textarea
    const counter = $(this).parent().find(".counter")
    //find child .counter of .new-tweet
    let length = 140 - this.textLength;
    $(counter).text(length);

    // dynamic error message for length > 140
    if (this.textLength > 140) {
      $('#error').html('Your song is too long...');
    } else {
      $('#error').html(null);
    }
  })

});