function run() {
  fetch("/api/movie")
    .then((response) => response.json())
    .then((data) => {
      const detailsElement = document.getElementById("movie");

      detailsElement.getElementsByTagName("img")[0].src = data.poster;
      detailsElement.getElementsByTagName("h1")[0].innerText = data.title;
      detailsElement.getElementsByTagName("p")[0].innerText = data.fullplot;

      detailsElement.style.visibility = "visible";
    });
}

function run2() {
  fetch("/api/genres")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}

function postForm(event) {
  event.preventDefault();
  console.log('POSTing form!');
  fetch("/api/movie", {
    body: JSON.stringify({
      genres: currentTarget.genres.value,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  })
    .then((response) => response.json())
    .then((data) => {
      const detailsElement = document.getElementById("movie");

      detailsElement.getElementsByTagName("img")[0].src = data.poster;
      detailsElement.getElementsByTagName("h1")[0].innerText = data.title;
      detailsElement.getElementsByTagName("p")[0].innerText = data.fullplot;

      detailsElement.style.visibility = "visible";
    });
}