$(document).ready(function() {

  $('.new-tweet').on('keyup', 'textarea', function(evt) { 
    //.new-tweet is parent to textarea and counter
    //action happens on textarea
    const counter =  $(this).parent().find(".counter")
    //find child .counter of .new-tweet
    let length = 140 - this.textLength;
    //console.log(this);
    $(counter).text(length);
    
  })

});