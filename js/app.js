let employees = []
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture, email, location, phone, dob &noinfo &nat=US`
const gridContainer = document.querySelector(".grid-container")
const overlay = document.querySelector(".overlay")
const modalContainer = document.querySelector(".modal-content")
const modalClose = document.querySelector(".modal-close")
const previousButton = document.querySelector('.previous')
const nextButton = document.querySelector('.next')
const searchBar = document.querySelector('.searchBar')

/* res.results is an array of 12 random employees each containing their
/* dob, location, name, phone and picture objects specific to each person  */
fetch(urlAPI)
    .then(res => res.json())
    .then(res => res.results)
    .then(displayEmployees)
    .catch(err => console.log(err))
 
/* the function loops through the employees array and its properties 
/* function scoped variables store the name, email, city, and picture per employee */
function displayEmployees(employeeData) {
    employees = employeeData
    let employeeHTML = ''
    //  console.log(employeeData) 

    employees.forEach((employee, index) => {
        let picture = employee.picture
        let name = employee.name
        let email = employee.email
        let city = employee.location.city

        employeeHTML += `
            <div class="card" data-index="${index}">
            <img class="avatar" src="${picture.large}" />
                <div class="text-container">
                    <h2 class="name">${name.first} ${name.last}</h2>
                    <p class="email">${email}</p>
                    <p class="address">${city}</p>
                </div>
            </div>
            `
    })
    gridContainer.innerHTML = employeeHTML
}

/* function scoped variables take the information needed to be displayed in the modal from the employees array, at the index passed to the function 
/* here I'm destructuring the employees array of objects ---- log employees[0] to view the employee object and employees[0].propertyName to view its value individually 
/* in the destructuring process, the object: "location" has a nested object: "street" which I am destructuring from to get the name and number value for each employee
      let { location: { street: { number: streetNumber, name: streetName } } } = employees[index]
/* the date variable creates a new Date Object, based on the employee's date of birth */
function displayModal(index) {
    let { picture, name, email, location: { city, state, postcode, street: { number: streetNumber, name: streetName } }, phone, dob } = employees[index]
    let date = new Date(dob.date) 
    // console.log(employees[0])    

    const modalHTML = `
        <div class="modal-text-container" data-index=${index}>
        <img class="avatar" src="${picture.large}" />
            <h2 class="name">${name.first} ${name.last}</h2>
            <p class="email">${email}</p>
            <p class="address">${city}</p>
            <hr />
            <p>${phone}</p>
            <p class="address">${streetNumber}, ${streetName}, ${city}, ${state} ${postcode}</p>
            <p>Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
        </div>
    `
    overlay.classList.remove("hidden")
    modalContainer.innerHTML = modalHTML
}

/* checks if the gridContainer itself was clicked, or a child element
/* closest() finds the correct card that was clicked
/* here I'm getting the data-index and passing it into displayModal() */
gridContainer.addEventListener('click', e => {
    if( e.target !== gridContainer ) {
        const card = e.target.closest(".card")
        const index = card.getAttribute('data-index')
        gridContainer.style.filter = "blur(2px)";
        displayModal(index)
    }
})

modalClose.addEventListener('click', () => {
    overlay.classList.add("hidden")
    gridContainer.style.filter = "blur(0px)";
})

previousButton.addEventListener('click', () => {
    let modalIndex = document
        .querySelector('.modal-text-container')
        .getAttribute('data-index')

        if (modalIndex == 0)  {
            modalIndex = 11
            displayModal(modalIndex)
        
        } else {
            modalIndex--
            displayModal(modalIndex)
        }
})  

nextButton.addEventListener('click', () => {
    let modalIndex = document
        .querySelector('.modal-text-container')
        .getAttribute('data-index')

    if (modalIndex == 11)  {
        modalIndex = 0
        displayModal(modalIndex)
    
    } else {
        modalIndex++ 
        displayModal(modalIndex)
    }
})

/* ------- COUNTER LOOP SEARCH FILTER ------- */
const searchFilter = () => {
    let userInput = searchBar.value.toLowerCase()
    const employee = document.querySelectorAll(".name")
    const profile = document.querySelectorAll(".card")

    for (let i = 0; i < profile.length; i++) {
      if (employee[i].innerText.toLowerCase().includes(userInput)) {
        profile[i].style.display = 'flex'
      } else {
        profile[i].style.display = 'none'
      }
    }
  }
 searchBar.addEventListener('keyup', searchFilter)