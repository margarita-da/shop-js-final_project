import { view } from "./view"
import { postData } from "../api/api"
import { preLoader } from "./preLoader"
import { includesId } from "./includesId"
import renderCard from "../../templates/components/card.hbs"

export function handlerClickMenu() {
  const $btnLoadMore = document.querySelector("[data-loadMore]")
  let getCatId
  const $navLink = document.querySelectorAll("[data-catId]")
  let count = 0
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
            list: result,
            count: 0
          })
          $btnLoadMore.style = "display: inline-block;"
          view(result, "[data-catalog]", renderCard)
        })
      } else {
        postData("GET", {}, `items?categoryId=${getCatId}`).then(result => {
          sessionStorage.itemsByСategory = JSON.stringify({
            loader: false,
            error: null,
            list: result,
            count: 0
          })
          $btnLoadMore.style = "display: inline-block;"
          view(result, "[data-catalog]", renderCard)
        })
      }
    })
  }
  //Клик по кнопке загрузить еще
  $btnLoadMore.addEventListener("click", e => {
    count = JSON.parse(sessionStorage.getItem("itemsByСategory")).count
      ? JSON.parse(sessionStorage.getItem("itemsByСategory")).count
      : 0
    count += 6
    let value = JSON.parse(sessionStorage.getItem("itemsByСategory")).searching
    let request
    let requestCat = `items?categoryId=${getCatId}&offset=${count} `
    let requestAll = `items?offset=${count} `
    let requestAllSearch = `items?q=${value}&offset=${count}`
    if (+getCatId === 0) {
      if (JSON.parse(sessionStorage.getItem("itemsByСategory")).searching) {
        request = requestAllSearch
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
          loader: true,
          error: null,
          list: newList,
          count,
          searching: value
        })
        view(newList, "[data-catalog]", renderCard)
      } else if (result.length < 6 || !includesId(list, result[0].id)) {
        $btnLoadMore.style = "display: none;"
      } else $btnLoadMore.style = "display: inline-block;"
    })
  })
}
