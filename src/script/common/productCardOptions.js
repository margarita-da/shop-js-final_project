export function productCardOptions() {
  const $btnBuy = document.querySelector(".btn-danger")
  const $prev = document.querySelector(".prev")
  const $next = document.querySelector(".next")
  const $size = document.querySelectorAll(".catalog-item-size")
  let $countProduct = Number(
    document.querySelector(".btn-outline-primary").innerHTML
  )

  for (let i = 0; i < $size.length; i++) {
    $size[i].addEventListener("click", e => {
      for (let i = 0; i < $size.length; i++) {
        $size[i].classList.remove("selected")
      }
      e.target.classList.add("selected")
      if ($countProduct >= 1) {
        $btnBuy.removeAttribute("disabled")
      }
    })
  }
  $prev.addEventListener("click", e => {
    if ($countProduct >= 1) {
      $prev.removeAttribute("disabled")
      $next.removeAttribute("disabled")
      $btnBuy.setAttribute("disabled", true)
      if (document.querySelector(".selected") && $countProduct >= 2) {
        $btnBuy.removeAttribute("disabled")
      }
      $countProduct -= 1
      document.querySelector(
        ".btn-outline-primary"
      ).innerHTML = `${$countProduct}`
    } else {
      $prev.setAttribute("disabled", true)
      $btnBuy.setAttribute("disabled", true)
    }
  })
  $next.addEventListener("click", e => {
    if ($countProduct < 10) {
      $prev.removeAttribute("disabled")
      $next.removeAttribute("disabled")
      if (document.querySelector(".selected")) {
        $btnBuy.removeAttribute("disabled")
      }

      $countProduct += 1
      document.querySelector(
        ".btn-outline-primary"
      ).innerHTML = `${$countProduct}`
    } else {
      $next.setAttribute("disabled", true)
    }
  })
}
