const scarinessEl = document.getElementById("#scariness");
const themingEl = document.getElementById("#theming");
const enjoymentEl = document.getElementById("#enjoyment");

function readLocalStorage() {
    const data = JSON.parse(localStorage.getItem("ride")) || [];
    return data || [];
  }
  function storeLocalStorage(newObject) {
    localStorage.setItem("ride", JSON.stringify(newObject));
  }

  function updateRide(){
    const scariness = document.querySelector("#scariness").value;
    const theming   = document.querySelector("#theming").value;
    const enjoyment = document.querySelector("#enjoyment").value;

    console.log ("hi");

    const ride = {
        scariness: scariness,
        theming: theming,
        enjoyment: enjoyment,
    };

    storeLocalStorage(ride);


  }



  const form = document.querySelector("form")

  form.addEventListener("change", function(){
updateRide()
  }
)