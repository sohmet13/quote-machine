var quotes;
//получаем объект с цитатами
function getData() {
  $.ajax({
    headers: {
      Accept: 'application/json'},
      url: 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
    success: function(data) {
      if (typeof data === 'string') {
        quotes = JSON.parse(data);
      }
      quotes= quotes.quotes;
      displayQuote();
    },
    error: function (jqXHR, exception) {
        // Что делать в случае ошибки
        let msg = '';
        if (jqXHR.status === 0) {
            msg = 'Not connect.\n Verify Network.';
        } else if (jqXHR.status == 404) {
            msg = 'Requested page not found. [404]';
        } else if (jqXHR.status == 500) {
            msg = 'Internal Server Error [500].';
        } else if (exception === 'parsererror') {
            msg = 'Requested JSON parse failed.';
        } else if (exception === 'timeout') {
            msg = 'Time out error.';
        } else if (exception === 'abort') {
            msg = 'Ajax request aborted.';
        } else {
            msg = 'Uncaught Error.\n' + jqXHR.responseText;
        }
        alert(msg);
        console.log(msg);
    }
  });
}
//берем рандомную цитату из объекта
function getRandomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}
//берем рандомный цвет
function generateRandomColor() {
  return '#' + Math.floor(Math.random()*16777215).toString(16);
}
//получаем цитаты из рандомной цитаты
function displayQuote() {
  let quote = getRandomQuote();
  let currentQuote = quote.quote;
  let currentAuthor = quote.author;
  textAnimation(currentQuote, currentAuthor);
  colorAnimation();
}
//анимируем размещаем цитату в .thumbnail 
function textAnimation(currentQuote, currentAuthor) {
  $("#quote").animate({opacity: 0}, 500,
    function() {
      $(this).animate({opacity: 1}, 500);
      $("#quote").text(currentQuote);
    });
  $("#author").animate({opacity: 0}, 500,
    function() {
      $(this).animate({opacity: 1}, 500);
      $("#name").text(currentAuthor);
   }); 
}
//обновляем цвета на экране
function colorAnimation() {
  let getRandomColor = generateRandomColor();
  $(".button, body, #newQuote").animate({backgroundColor: getRandomColor}, 1000);
  $(".text-center").animate({color: getRandomColor}, 1000);
}

$(document).ready(function() {
  //загружаем данные
  getData();
  //меняем цитаты по нажатию на кнопку
  $('#newQuote').on('click', displayQuote);
  // кнопки поделиться
  //твиттер
  $('#twitterShare').click(function(){
    let text = 'https://twitter.com/intent/tweet?hashtags=quotes&text="' + $('#quote').text()+'" '+$('#name').text();
    $('#twitterShare').attr('href', text);
});
  // фейсбук
  $('#facebookShare').click(function(){
    let text = 'http://www.facebook.com/sharer.php?quote="' + $('#quote').text()+'" '+$('#name').text()+'&u=https://codepen.io/sohmet13/full/baQLdw';
    $('#facebookShare').attr('href', text);
  });
});