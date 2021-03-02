import { view } from "./view"
import { postData } from "../api/api"
import renderCard from "../../templates/components/card.hbs"

//поиск
export function search() {
  const $btnLoadMore = document.querySelector("[data-loadMore]")

  let searchForm = document.querySelector("[data-search]")
  let value
  searchForm.addEventListener("keyup", e => {
    $btnLoadMore.style = "display: inline-block;"
    if (e.keyCode === 13) {
      e.preventDefault()
      if (searchForm.value.length > 0) {
        value = searchForm.value.toLowerCase()
        sessionStorage.itemsByСategory = JSON.stringify({
          loader: false,
          error: null,
          list: [],
          count: 0
        })
        // preLoader("[data-catalog]", `items?q=${value}`)
        postData("GET", {}, `items?q=${value}`).then(result => {
          sessionStorage.itemsByСategory = JSON.stringify({
            loader: true,
            error: null,
            list: result,
            searching: value,
            count: 0
          })
          view(result, "[data-catalog]", renderCard)
        })
      } else {
        postData("GET", {}, `items`).then(result => {
          sessionStorage.itemsByСategory = JSON.stringify({
            loader: true,
            error: null,
            list: result,
            count: 0
          })
          view(result, "[data-catalog]", renderCard)
        })
      }
    }
  })
}
