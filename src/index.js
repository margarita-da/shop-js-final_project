import './style/style.scss';

import {Router} from "./script/common/route"

const $nav = document.querySelector('.navbar')

// инициализируем роутер
Router.init();
       
// запускаем главную страницу
Router.dispatch('/');

let handler = event =>  {
           
    // получаем запрошенный url
    let url = new URL(event.currentTarget.href);
    console.log();
    // запускаем роутер, предавая ему path
    Router.dispatch(url.pathname);
   
    // запрещаем дальнейший переход по ссылке
    event.preventDefault();
}

// получаем все ссылки на странице
// let anchors = document.querySelectorAll('a');

let anchors = $nav.querySelectorAll("[data-nav]")

// вешаем на событие onclick обработчик
for( let anchor of anchors ) anchor.onclick = handler;

