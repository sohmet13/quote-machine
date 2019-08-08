import $ from 'jquery';
import 'jquery-ui-bundle';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

import './style.scss';

let quotes, currentQuote, currentAuthor;

$(document).ready(function () {
    //загружаем данные
    getData();
    //меняем цитаты по нажатию на кнопку
    $('.new-quote-button').on('click', displayQuote);
    // кнопки поделиться
    //твиттер
    $('.twitter').click(function () {
        let text = `https://twitter.com/intent/tweet?hashtags=quotes&text='${currentQuote}' ${currentAuthor}`;
        $(this).attr('href', text);
    });
    // фейсбук
    $('.facebook').click(function () {
        let text = `http://www.facebook.com/sharer.php?quote='${currentQuote}' '${currentAuthor}&u=https://codepen.io/sohmet13/full/baQLdw`;
        $(this).attr('href', text);
    });
});

//получаем объект с цитатами
function getData() {
    $.ajax({
        headers: {
            Accept: 'application/json'
        },
        url: 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
        success: (data) => {
            if (typeof data === 'string') {
                quotes = JSON.parse(data);
            }
            quotes = quotes.quotes;
            displayQuote();
        },
        error: (jqXHR, exception) => {
            switch (true) {
                case jqXHR.status === 0:
                    alertError('Not connect.\n Verify Network.');
                    return;
                case jqXHR.status == 404:
                    alertError('Requested page not found. [404]');
                    return;
                case jqXHR.status == 500:
                    alertError('Internal Server Error [500].');
                    return;
                case exception === 'parsererror':
                    alertError('Requested JSON parse failed.');
                    return;
                case exception === 'timeout':
                    alertError('Time out error.');
                    return;
                case exception === 'abort':
                    alertError('Ajax request aborted.');
                    return;
                default:
                    alertError(`Uncaught Error.\n${jqXHR.responseText}`);
                    return;
            }
        }
    });
}

// показываем пользователю сообщение об ошибке
function alertError(msg) {
    alert(msg);
    console.warn(msg);
}

//получаем цитаты из рандомной цитаты
function displayQuote() {
    let quote = getRandomQuote();
    currentQuote = quote.quote;
    currentAuthor = quote.author;
    animation();
}

//анимируем размещаем цитату в .thumbnail
function animation() {
    // анимируем текст
    $('.quote').animate({opacity: 0}, 500, function () {
        $(this).animate({opacity: 1}, 500);
        $(this).text(currentQuote);
    });
    $('.author').animate({opacity: 0}, 500, function () {
        $(this).animate({opacity: 1}, 500);
        $('.name').text(currentAuthor);
    });
    // анимируем цвета
    let getRandomColor = generateRandomColor();
    $('.button, body').animate({backgroundColor: getRandomColor}, 1000);
    $('.thumbnail').animate({color: getRandomColor}, 1000);
}

//берем рандомную цитату из объекта
function getRandomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
}

//берем рандомный цвет
function generateRandomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}