
/******STEP1: VIEW DATA******/
//GET Fetch Request (get ALL dogs)

const dogURL = 'http://localhost:3000/pups/'

document.addEventListener("DOMContentLoaded", () => {
    getDogs()
})

function getDogs() {
    fetch(dogURL)
        .then(resp => resp.json())
        .then(dogs => dogs.forEach((dog) => renderDog(dog)))
}

// function getDogs(){
//     fetch(dogURL)
//     .then((res) => res.json())
//     .then((dogs) => {
//         dogs.forEach((dog) => renderDog(dog))
//     })
// }

/******STEP2: ADD PUPS TO DOGBAR******/
//Create span with the dog's name
//Add span to the dog bar

function renderDog(dog){
    let dogBar = document.getElementById('dog-bar')

    let dogSpan = document.createElement('span')
        dogSpan.innerText = dog.name
        dogSpan.addEventListener('click', () => renderDogInfo(dog))

        dogBar.appendChild(dogSpan)
}

/****STEP3: SHOW MORE INFO ABOUT EACH PUP ******/
//Click Event
//GET request
//Dog's info (image, name, status) should show in the div with #dog-info id

function renderDogInfo(dog) {

    let dogContainer = document.getElementById('dog-info')
        dogContainer.innerText = ''

    let dogImage = document.createElement('img')
        dogImage.src = dog.image  
      
    let dogName = document.createElement('h2')
        dogName.innerText = dog.name

    let dogBtn = document.createElement('button')
    //console.log(dog)
            if (dog.isGoodDog){
                dogBtn.innerText = "Good Dog!"
            } else {
                dogBtn.innerText = "Bad Dog!"
            }
            dogBtn.addEventListener('click', () => patchDog(dog))

        dogContainer.append(dogImage, dogName, dogBtn)

}

/****STEP4: TOGGLE GOOD DOG *******/
//change good/bad dog status when clicked with EventListener
//update pup object in db with PATCH 

function patchDog(dog){
    let dogUpdate = {
        isGoodDog: !dog.isGoodDog
    }

    let reqPack = {
        headers: {"Content-Type": "application/json"},
        method: "PATCH",
        body: JSON.stringify(dogUpdate)
    }

    fetch(dogURL + dog.id, reqPack)
        .then(res => res.json())
        .then((dog) => {
            renderDogInfo(dog)
        })
}





