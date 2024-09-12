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
        rating: rating
    };

    storeLocalStorage(name, ride);

    getTotalOverallRating();

    // calcOverallRating(form)
  }

  function getTotalOverallRating() {
    const overallSpan = document.querySelector('#overall');
    let total = 0;
    for (i = 0; i < localStorage.length; i++) {
      let rating = JSON.parse(localStorage.getItem(localStorage.key(i))).rating;
      total += rating;
    }

    let average = (total/localStorage.length).toFixed(2)
    console.log((total/localStorage.length).toFixed(2))

    overallSpan.innerHTML = average;

  }