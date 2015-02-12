var queryUrl = 'https://www.google.com/search?q=';

var makeQueryList = function(word, letter) {
  var queryList = [];

  for (var n = 3; n <= 12; ++n) {
    queryList.push(word.replace(/\(.\)/, Array(n + 1).join(letter)));
  }

  return queryList;
};

var countResults = function(queryList, counts) {
  if (arguments.length < 2) counts = {};
  var length = Object.keys(counts).length;
  var codeString = 'document.getElementById("resultStats").textContent';

  if (length == queryList.length) {
    console.log(counts);
  } else {
    chrome.tabs.update({url: queryUrl + queryList[length]}, function() {
      chrome.tabs.executeScript({code: codeString}, function(result) {
        counts[queryList[length]] =
            parseInt(result[0].match(/\d+[,\d]+/)[0].replace(',', ''));
        countResults(queryList, counts);
      });
    });
  }
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.word && message.letter) {
    chrome.tabs.create({url: queryUrl}, function() {
      countResults(makeQueryList(message.word, message.letter));
    });
  }
});
