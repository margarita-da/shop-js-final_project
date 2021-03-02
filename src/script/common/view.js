import { Router } from "./route"
import { deleteCartItems } from "./deleteCartItems"

let handler = event => {
  // получаем запрошенный url
  let url = new URL(event.currentTarget.href)
  // запускаем роутер, предавая ему path
  Router.dispatch(url.pathname)

  // запрещаем дальнейший переход по ссылке
  event.preventDefault()
}
// получаем все ссылки на странице
let anchors = document.querySelectorAll("[data-nav]")
// вешаем на событие onclick обработчик
for (let anchor of anchors) anchor.onclick = handler

export function view(result, zone, render, where) {
  let html
  if (Array.isArray(result)) {
    html = render({ items: result })
  } else {
    html = render(result)
  }
  let $row = document.querySelector(zone)
  if (where) {
    $row.insertAdjacentHTML("beforeend", html)
  } else {
    $row.innerHTML = html
  }
  let anchors = document.querySelectorAll("[data-nav]")
  // вешаем на событие onclick обработчик
  for (let anchor of anchors) anchor.onclick = handler
  deleteCartItems()
}
