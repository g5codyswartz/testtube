var peopleEmojiAmounts = Array.prototype.slice.call(document.querySelectorAll('.p-customize_emoji_list__author')).reduce((prev, el) => {
  const key = el.innerText;
  if (prev[key]) {
    prev[key] ++;
  }
  else {
    prev[key] = 1;
  }
  return prev;
}, {});

var sortedEmojiAccounts = Object.keys(peopleEmojiAmounts).sort((a, b) => peopleEmojiAmounts[b] - peopleEmojiAmounts[a]).reduce((prev, name) => {
  let person = {};
  person[name] = peopleEmojiAmounts[name];
  prev.push(person);
  return prev;
}, []);

console.log(JSON.stringify(sortedEmojiAccounts));