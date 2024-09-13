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

  getTotalOverallRating();
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
    const rideName = localStorage.key(i);
    const rideData = JSON.parse(localStorage.getItem(rideName));
    const form = document.querySelector(`form[for="${rideName}"]`);
    form.querySelector("#scariness").value = rideData.scariness;
    form.querySelector("#theming").value = rideData.theming;
    form.querySelector("#enjoyment").value = rideData.enjoyment;
    form.querySelector("#rating").innerHTML = rideData.rating.toFixed(2);
    form.querySelector('#comment').value = rideData.comment;
  }
  completedSpan.innerHTML = localStorage.length;
  getTotalOverallRating();
}

renderData();