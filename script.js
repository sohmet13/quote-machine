function getQuote() {
//ajax нужен для запроса сервера по ссылке без перезагрузки страницы
$.ajax({
  headers: {'X-Mashape-Key': 'aB41byVgzpmsh2dMflSDeVQXr0Z0p12UPcBjsnfTJrcbuHAOuF',
  'Content-Type': 'application/x-www-form-urlencoded',
  Accept: 'application/json'},
  // ссылка
   url: 'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=',
  // Функция, которая будет вызвана в случае удачного завершения запроса к серверу
  success: function(r) {
      if (typeof r === 'string') {
       r = JSON.parse(r); 
      }
      currentQuote = r.quote;
      currentAuthor = r.author;
  // анимация текста
     $("h1").animate({opacity: 0}, 500,
      function() {
        $(this).animate({opacity: 1}, 500);
        $("h1>i").html(' '+ currentQuote);
        });
     $("p").animate({opacity: 0}, 500,
      function() {
        $(this).animate({opacity: 1}, 500);
        $("p").html('- '+currentAuthor);
   }); 
  // анимация цвета
    function generateColor() {
  return '#' + Math.floor(Math.random()*16777215).toString(16);
}
    var getRandomColor = generateColor();
    $(".button, body, button").animate({backgroundColor: getRandomColor}, 1000);
     $(".text-center").animate({color: getRandomColor}, 1000);
 }
});
}

$(document).ready(function() {
    getQuote();
    $('button').on('click', getQuote);
  // кнопки поделиться
  //твиттер
  $('#twitterShare').click( function (){
var text='https://twitter.com/intent/tweet?hashtags=quotes&text="' + $('h1>i').text().slice(1)+'" '+$('p').text().slice(2);
  $('#twitterShare').attr('href', text);
});
  // фейсбук
  $('#facebookShare').click( function (){
var text='http://www.facebook.com/sharer.php?quote="' + $('h1>i').text().slice(1)+'" '+$('p').text().slice(2)+'&u=https://codepen.io/sohmet13/pen/baQLdw';
  $('#facebookShare').attr('href', text);
});
    });
