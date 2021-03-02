import renderPreloader from "../../templates/components/preloader.hbs"

export function preLoader(zone, key) {
  const html = renderPreloader()
  let $row = document.querySelector(zone)
  let load = JSON.parse(sessionStorage.getItem(key)).loader
  if (load === true) {
    $row.insertAdjacentHTML("afterBegin", html)
  }
}
