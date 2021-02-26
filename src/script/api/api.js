// const preloadZone = document.querySelectorAll("[data-preload]")
// const spinner = document.querySelector(".preloader")
export async function postData(method, data = {}, params = "") {
  // Default options are marked with *
  const response = await fetch(`http://localhost:7070/api/${params}`, {
    method: method,
    headers: {
      "Content-Type": "application/json"
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    if(data) {
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    }
  })

  if (!response.ok) {
    throw new Error("ошибка сервера")
  }

  return response.json() // parses JSON response into native JavaScript objects
}
