import { view } from "./view"
import renderCart from "../../templates/components/section-cart.hbs"
import renderTotalprice from "../../templates/components/total-price.hbs"

export function deleteCartItems() {
  let res = {}
  let total = 0

  let filterArray
  let $del = document.querySelectorAll(".btn-outline-danger")
  for (let i = 0; i < $del.length; i++) {
    $del[i].addEventListener("click", e => {
      const idItem = e.target.dataset.id
      const sizeItem = e.target.dataset.size
      let cartItem = JSON.parse(localStorage.cardItems)
      let items = JSON.parse(cartItem.items)
      filterArray = items.filter(item => {
        item.size.slice(0, 2)
        if (item.id !== idItem && item.size !== sizeItem) {
          return item
        }
      })
      localStorage.cardItems = JSON.stringify({
        items: JSON.stringify(filterArray)
      })
      cartItem = JSON.parse(localStorage.cardItems)
      items = JSON.parse(cartItem.items)
      view(items, "[data-cart]", renderCart)
      for (let i = 0; i < items.length; i++) {
        total = total + items[i].lastprice
      }
      res.total = total
      view(res, "[data-total]", renderTotalprice)
    })
  }
}
