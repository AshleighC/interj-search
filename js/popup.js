$('#go-button').click(function() {
  word = $('#word-input').val().toLowerCase();
  matches = word.match(/\((.)\)/);

  if (matches && (word.match(/[\(\)]/g).length == 2)) {
    $('#error').hide();

    message = {
      'word': word,
      'letter': matches[1]
    }
  } else {
    $('#error').show();
  }
});
