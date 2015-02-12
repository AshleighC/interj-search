var makeRow = function(word, count) {
  return '<tr><td>' + word + '</td><td>' + count + '</td></tr>';
};

var makeFirstEntries = function(results) {
  return 'c("' + Object.keys(results)[0] + '", NA';
};

chrome.runtime.onMessage.addListener(function(message, sender) {
  $('#results-code').append(makeFirstEntries(message.results));

  $.each(message.results, function(word, count) {
    $('#results-table tr:last').after(makeRow(word, count));
    $('#results-code').append(', ' + count);
  });

  $('#results-code').append(')');
});
