const scarinessEl = document.getElementById("#scariness");
const themingEl = document.getElementById("#theming");
const enjoymentEl = document.getElementById("#enjoyment");

function readLocalStorage() {
    const data = JSON.parse(localStorage.getItem("ride")) || [];
    return data;
}

function storeLocalStorage(name, newObject) {
  localStorage.setItem(name, JSON.stringify(newObject));
}

function updateRide(form) {
  let scariness = form.querySelector("#scariness").value;
  let theming   = form.querySelector("#theming").value;
  let enjoyment = form.querySelector("#enjoyment").value;
  let comment  = form.querySelector("#comment").value;
  const name = form.getAttribute("for");
  const ratingSpan = form.querySelector("#rating");

  scariness = parseInt(scariness)
  theming = parseInt(theming)
  enjoyment = parseInt(enjoyment)

  let rating = (scariness + theming + enjoyment) / 3;
  ratingSpan.innerHTML = rating.toFixed(2);

  const ride = {
      scariness: scariness,
      theming: theming,
      enjoyment: enjoyment,
      rating: rating,
      comment: comment
  };

  storeLocalStorage(name, ride);

  renderData();
}

function getTotalOverallRating() {
  const overallSpan = document.querySelector('#overall');
  let total = 0;
  for (i = 0; i < localStorage.length; i++) {
    let rating = JSON.parse(localStorage.getItem(localStorage.key(i))).rating;
    total += rating;
  }

  let average = (total/localStorage.length).toFixed(2)
  overallSpan.innerHTML = average;
}

function renderData() {
  const completedSpan = document.querySelector('#completed');
  for (i = 0; i < localStorage.length; i++) {
    const ride = JSON.parse(localStorage.getItem(localStorage.key(i)));
    const form = document.querySelector(`form[for="${localStorage.key(i)}"]`);
    form.querySelector("#scariness").value = ride.scariness;
    form.querySelector("#theming").value = ride.theming;
    form.querySelector("#enjoyment").value = ride.enjoyment;
    form.querySelector("#rating").innerHTML = ride.rating.toFixed(2);

    if (ride.comment) {
      form.querySelector('#comment').value = ride.comment;
    }
  }

  completedSpan.innerHTML = localStorage.length;

  getTotalOverallRating();
}

renderData();