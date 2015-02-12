$('#go-button').click(function() {
  var word = $('#word-input').val().toLowerCase();
  var matches = word.match(/\((.)\)/);

  if (matches && (word.match(/[\(\)]/g).length == 2)) {
    $('#error').hide();

    var message = {
      'word': word,
      'letter': matches[1]
    };

    chrome.runtime.sendMessage(message);
  } else {
    $('#error').show();
  }
});
