var rates = {
  "a": 0.080398354, "b": 0.014844932, "c": 0.033450205,
  "d": 0.038164664, "e": 0.124933149, "f": 0.024021288,
  "g": 0.018689460, "h": 0.050540117, "i": 0.075683896,
  "j": 0.001599548, "k": 0.005416015, "l": 0.040690267,
  "m": 0.025115716, "n": 0.072344488, "o": 0.076413514,
  "p": 0.021355374, "q": 0.001206677, "r": 0.062803322,
  "s": 0.065132489, "t": 0.092745746, "u": 0.027304572,
  "v": 0.010523345, "w": 0.016753165, "x": 0.002357229,
  "y": 0.016640916, "z": 0.000897992
};

var makeRow = function(word, count) {
  return '<tr><td>' + word + '</td><td>' + count + '</td></tr>';
};

chrome.runtime.onMessage.addListener(function(message, sender) {
  var word = Object.keys(message.results)[0];
  var letter = word.match(/([a-zA-Z])\1\1/)[1];

  $.each(message.results, function(word, count) {
    $('#results-table tr:last').after(makeRow(word, count));
    $('#results-code').append(', ' + count);
  });

  $('#results-code').prepend('c("' + word + '", ' + rates[letter]);
  $('#results-code').append(')');
});
