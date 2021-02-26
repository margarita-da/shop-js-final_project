import "./style/style.scss"
// import { getProducts } from "./script/getData/getProducts"
import { postData } from "./script/api/api"
import { Router } from "./script/common/route"
import renderCard from "./templates/components/card.hbs"
import renderMenu from "./templates/components/menu.hbs"
import renderPreloader from "./templates/components/preloader.hbs"

const $nav = document.querySelector(".navigation")
// инициализируем роутер
Router.init()

// запускаем главную страницу
Router.dispatch("/")

let handler = event => {
  // получаем запрошенный url
  let url = new URL(event.currentTarget.href)
  // запускаем роутер, предавая ему path
  Router.dispatch(url.pathname)

  // запрещаем дальнейший переход по ссылке
  event.preventDefault()
}

// получаем все ссылки на странице
let anchors = $nav.querySelectorAll("[data-nav]")

// вешаем на событие onclick обработчик
for (let anchor of anchors) anchor.onclick = handler

export function view(result, zone, render, where) {
  const html = render({ items: result })
  let $row = document.querySelector(zone)
  if (where) {
    $row.insertAdjacentHTML("beforeend", html)
  } else {
    $row.innerHTML = html
  }
}
function includesId(array, id) {
  const res = array.filter(item => item.id === id)
  if (res.length > 0) return false
  else return true
}
export function preLoader(zone, key) {
  const html = renderPreloader()
  let $row = document.querySelector(zone)
  let load = JSON.parse(sessionStorage.getItem(key)).loader
  if (load === true) {
    $row.insertAdjacentHTML("afterBegin", html)
  }
}

//поиск
export function search() {
  let searchForm = document.querySelector("[data-search]")
  let value
  searchForm.addEventListener("keyup", e => {
    if (e.keyCode === 13) {
      e.preventDefault()
      if (searchForm.value.length > 0) {
        value = searchForm.value.toLowerCase()
        // preLoader("[data-catalog]", `items?q=${value}`)
        postData("GET", {}, `items?q=${value}`).then(result => {
          console.log(result)
          sessionStorage.itemsByСategory = JSON.stringify({
            loader: false,
            error: null,
            list: result,
            searching: value
          })
          view(result, "[data-catalog]", renderCard)
        })
      } else {
        postData("GET", {}, `items`).then(result => {
          sessionStorage.itemsByСategory = JSON.stringify({
            loader: false,
            error: null,
            list: result
          })
          view(result, "[data-catalog]", renderCard)
        })
      }
    }
  })
}

export function handlerClickMenu() {
  const $btnLoadMore = document.querySelector("[data-loadMore]")
  let getCatId
  const $navLink = document.querySelectorAll("[data-catId]")
  let count

  for (let i = 0; i < $navLink.length; i++) {
    //находим категорию Все. Имитируем клик
    const $active = document.querySelector(".first")
    $active.click()
    //клики по категориям
    $navLink[i].addEventListener("click", e => {
      e.preventDefault()
      count = 0
      for (let i = 0; i < $navLink.length; i++) {
        $navLink[i].classList.remove("active")
      }
      e.target.classList.add("active")
      getCatId = e.target.dataset.catid
      // Элементы каталога категории
      sessionStorage.itemsByСategory = JSON.stringify({
        loader: true,
        error: null,
        list: [],
        count: 0
      })
      if (+getCatId === 0) {
        postData("GET", {}, `items`).then(result => {
          sessionStorage.itemsByСategory = JSON.stringify({
            loader: false,
            error: null,
            list: result
          })
          $btnLoadMore.style = "display: inline-block;"
          view(result, "[data-catalog]", renderCard)
        })
      } else {
        postData("GET", {}, `items?categoryId=${getCatId}`).then(result => {
          sessionStorage.itemsByСategory = JSON.stringify({
            loader: false,
            error: null,
            list: result
          })
          $btnLoadMore.style = "display: inline-block;"
          view(result, "[data-catalog]", renderCard)
        })
      }
    })
  }
  //Клик по кнопке загрузить еще
  $btnLoadMore.addEventListener("click", e => {
    count += 6
    let value = JSON.parse(sessionStorage.getItem("itemsByСategory")).searching
    console.log(value)
    let request
    let requestCat = `items?categoryId=${getCatId}&offset=${count} `
    let requestAll = `items?offset=${count} `
    let requestAllSearch = `items?q=${value}&offset=${count}`
    if (+getCatId === 0) {
      if (JSON.parse(sessionStorage.getItem("itemsByСategory")).searching) {
        request = requestAllSearch
        console.log(value)
      } else {
        request = requestAll
      }
    } else {
      request = requestCat
    }
    preLoader("[data-catalog]", "items")
    postData("GET", {}, request).then(result => {
      const list = JSON.parse(sessionStorage.getItem("itemsByСategory")).list
      if (result.length === 0) {
        $btnLoadMore.style = "display: none;"
        return false
      }
      if (includesId(list, result[0].id)) {
        const newList = list.concat(result)
        sessionStorage.itemsByСategory = JSON.stringify({
          loader: false,
          error: null,
          list: newList,
          count,
          searching: value
        })
        view(newList, "[data-catalog]", renderCard)
      } else if (result.length < 6 || !includesId(list, result[0].id)) {
        $btnLoadMore.style = "display: none;"
      } else $btnLoadMore.style = "display: block;"
    })
  })
}
