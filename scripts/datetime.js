hexo.extend.helper.register('formatDate', function (date, month = "long") {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month,
    day: "numeric"
  }).format(date)
});


hexo.extend.helper.register('formatDateTime', function (date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false
  }).format(date)
});