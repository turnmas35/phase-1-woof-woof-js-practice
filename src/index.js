document.addEventListener('DOMContentLoaded', function() {
    fetchSpans();

const dogBar = document.getElementById("dog-bar")
const filterButton = document.getElementById("good-dog-filter")

function fetchSpans() {
  fetch("http://localhost:3000/pups")
  .then((resp) => resp.json())
  .then((jsonPups) => {
    jsonPups.forEach(pup => {
        dogSpan(pup)
      })
  })
}
filterButton.addEventListener("click", filterDogs)
function filterDogs () {
        e.preventDefault();
        
        if (filterButton.innerText === "Filter good dogs: OFF") {
            filterButton.innerText = "Filter good dogs: ON";
            dogBar.innerHTML = ""
                fetch(`http://localhost:3000/pups`)
                .then((resp) => resp.json())
                .then((jsonPups) => {
                    let filteredDogs = jsonPups.filter(pup => {
                        return pup.isGoodDog === true
                    }).forEach(pup => {
                        dogSpan(pup)
                    })
  })
          } else {
            filterButton.innerText = "Filter good dogs: OFF";
            dogBar.innerHTML = ""
            fetchSpans()
          }

}

function dogSpan (pup) {
    const span = document.createElement("span")
    // const dogBar = document.getElementById("dog-bar")
    span.innerText = pup.name
    dogBar.append(span)

    span.addEventListener("click", function(e){
        e.preventDefault();
        renderDog(pup)
    })
}

function renderDog(pup) {
    const img = document.createElement("img")
    img.src = pup.image
    const h2 = document.createElement("h2")
    h2.innerText = pup.name
    const button = document.createElement("button")
    button.innerText = pup.isGoodDog ? "Good Dog!" : "Bad Dog!";
    button.id = "toggle-button"
    const dogInfo = document.getElementById("dog-info")
    dogInfo.innerHTML = ""
    dogInfo.append(img, h2, button)

    button.addEventListener("click", function (e){
        e.preventDefault();
        let newValue 
        if (button.innerText === "Good Dog!") {
            button.innerText = "Bad Dog!";
            newValue = false
          } else {
            button.innerText = "Good Dog!";
            newValue = true
          }
        patchDog(pup, newValue)
    })
}

function patchDog(pup, newValue) {
    fetch(`http://localhost:3000/pups/${pup.id}`, {
    method: "PATCH",
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({...pup, isGoodDog: newValue})

  })
  .then((response) => response.json())
}

// function updateDog(pup) {
//     const button = document.getElementById("toggle-button")
//     if (button.innerText === "Good Dog!") {
//         pup.isGoodDog = true;
//       } else {
//         pup.isGoodDog = false;
//       }
//     console.log(pup.isGoodDog)
// }

  });
  