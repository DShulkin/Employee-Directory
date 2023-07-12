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


//loops through each employee. 
//the function scoped variables stores the name, email, city, and picture
function displayEmployees(employeeData) {
    employees = employeeData
    let employeeHTML = ''
    
    console.log(employees)
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
    })
    gridContainer.innerHTML = employeeHTML
}


//function scoped variables here take the information needed to be displayed in the modal from the employees array, at the index passed to the function
//the date variable creates a new Date Object, based on the employee's date of birth
function displayModal(index) {
    let { name, dob, phone, email, location: { city, street, state, postcode }, picture } = employees[index]
    let date = new Date(dob.date)

    const modalHTML = `
        <img class="avatar" src="${picture.large}" />
        <div class="text-container">
            <h2 class="name">${name.first} ${name.last}</h2>
            <p class="email">${email}</p>
            <p class="address">${city}</p>
            <hr />
            <p>${phone}</p>
            <p class="address">${street}. ${state}, ${postcode}</p>
            <p>Birthday: ${date.getMonth}/${date.getDate()}/${date.getFullYear}</p>
        </div>
    `
    overlay.classList.remove("hidden");
    modalContainer.innerHTML = modalHTML;
}
