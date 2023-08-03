let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture, email, location, phone, dob &noinfo &nat=US`
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");


fetch(urlAPI)
    .then(res => res.json())
    .then(res => res.results)
    .then(displayEmployees)
    .catch(err => console.log(err))
 
//NOTE: res.results is an array of 12 random employees each containing their
// ---- dob, location, name, phone and picture objects specific to each person


//loops through each employee
//the function scoped variables stores the name, email, city, and picture
function displayEmployees(employeeData) {
    employees = employeeData
    let employeeHTML = ''
    
    // console.log(employees)
    employees.forEach( (employee, index) => {
        let name = employee.name
        let email = employee.email
        let city = employee.location.city
        let picture = employee.picture

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
    } )
    gridContainer.innerHTML = employeeHTML
}


// function scoped variables here take the information needed to be displayed in the modal from the employees array, at the index passed to the function
// here I am destructuring an array of objects with employees[index] ---- log employees[0].propertyName to view its value individually
// the date variable creates a new Date Object, based on the employee's date of birth
function displayModal(index) {
    let { name, dob, phone, email, location: { city, state, postcode }, picture } = employees[index]
    let date = new Date(dob.date) 
    // console.log(employees[0])

    const modalHTML = `
        <img class="avatar" src="${picture.large}" />
        <div class="text-container">
            <h2 class="name">${name.first} ${name.last}</h2>
            <p class="email">${email}</p>
            <p class="address">${city}</p>
            <hr />
            <p>${phone}</p>
            <p class="address">${city}, ${state} ${postcode}</p>
            <p>Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
        </div>
    `
    overlay.classList.remove("hidden")
    modalContainer.innerHTML = modalHTML
}


gridContainer.addEventListener('click', e => {
    if( e.target !== gridContainer ) {
        const card = e.target.closest(".card")
        const index = card.getAttribute('data-index')
        displayModal(index)
    }
})


modalClose.addEventListener('click', () => {
    overlay.classList.add("hidden")
})


const searchBar = document.querySelector('.searchBar')

const searchFilter = () => {
    let userInput = searchBar.value.toLowerCase()
    const employees = document.querySelectorAll(".name")
    employees.forEach(employee => { 
        if (employee.textContent.toLowerCase().includes(userInput)) {
            employee.parentNode.parentNode.style.display = 'flex'
        } else {
            employee.parentNode.parentNode.style.display = 'none'
        }
    })
  }
 searchBar.addEventListener('keyup', searchFilter)











// ------- COUNTER LOOP SEARCH FUNCTION -------
// const searchBar = document.querySelector('.searchBar')
// const searchFilter = () => {
//     let userInput = searchBar.value.toLowerCase()
//     const employee = document.querySelectorAll(".name")
//     const profile = document.querySelectorAll(".card")

//     for (let i = 0; i < profile.length; i++) {
//       if (employee[i].innerText.toLowerCase().includes(userInput)) {
//         profile[i].style.display = 'flex'
//       } else {
//         profile[i].style.display = 'none'
//       }
//     }
//   }
//  searchBar.addEventListener('keyup', searchFilter)