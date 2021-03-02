export function buyProduct(result) {
  let countProduct, size, lastprice, total
  const $btnBuy = document.querySelector(".btn-danger")
  $btnBuy.addEventListener("click", e => {
    e.preventDefault()
    size = document.querySelector(".selected").innerHTML.slice(0, 2)
    countProduct = Number(
      document.querySelector(".btn-outline-primary").innerHTML
    )
    lastprice = Number(result.price) * countProduct
    if (!$btnBuy.hasAttribute("disabled")) {
      if (localStorage.cardItems) {
        let cartItem = JSON.parse(localStorage.cardItems)
        let items = JSON.parse(cartItem.items)
        if (items.length > 0) {
          const index = items.findIndex(items => {
            const sliceSize = items.size.slice(0, 2)
            if (+items.id === +result.id && size === sliceSize) {
              return items
            }
          })
          console.log(items)

          if (index >= 0) {
            items[index]["count"] = Number(items[index]["count"]) + countProduct
            items[index]["total"] = Number(items[index]["total"]) + +lastprice
            console.log(items[index]["total"])
          } else {
            total = 0
            for (let i = 0; i < result.length; i++) {
              total = total + result[i].lastprice
            }
            console.log(total)

            // console.log(items[index]["total"])
            items.push({
              id: result.id,
              count: countProduct,
              price: result.price,
              name: result.title,
              size: size,
              lastprice: +lastprice,
              total: +total
            })
          }
          localStorage.cardItems = JSON.stringify({
            items: JSON.stringify(items)
          })
        } else
          localStorage.cardItems = JSON.stringify({
            items: JSON.stringify([
              {
                id: result.id,
                count: countProduct,
                price: result.price,
                name: result.title,
                size: size,
                lastprice: +lastprice,
                total: +lastprice
              }
            ])
          })
      } else
        localStorage.cardItems = JSON.stringify({
          items: JSON.stringify([
            {
              id: result.id,
              count: countProduct,
              price: result.price,
              name: result.title,
              size: size,
              lastprice: +lastprice,
              total: +lastprice
            }
          ])
        })
    }
  })
}
