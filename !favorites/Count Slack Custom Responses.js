let authors = $('.author_note>strong').toArray().reduce((prev, cur) => {
  const name = cur.textContent.trim();
  if (!prev[name]) {
    prev[name] = 1;
  }
  else {
    prev[name]++;
  }
  return prev;
}, {});

function sortObject(obj) {
  var arr = [];
  var prop;
  for (prop in obj) {
      if (obj.hasOwnProperty(prop)) {
          arr.push({
              'key': prop,
              'value': obj[prop]
          });
      }
  }
  arr.sort(function(a, b) {
      return b.value - a.value;
  });
  return arr; // returns array
}

sortObject(authors);
