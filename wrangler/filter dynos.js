/* jshint esversion: 6 */
$('.dynos .dyno-info:nth-of-type(3)').each((i, el) => {
  el = $(el);
  let text = el.text().toLowerCase();
  if (text == 'hobby' || text == 'free') {
    el.parents('tr').hide();
  }
});