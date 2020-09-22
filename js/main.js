// global variables
let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture, email, location, phone, dob &noinfo &nat=US`
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
const modalNav = document.querySelector(".modal-nav");

// fetch data from API

fetch(urlAPI)
  .then(res => res.json())
  .then(res => res.results)
  .then(displayEmployees)
  .catch(err => console.log(err));
  

function displayEmployees(employeeData) {
  employees = employeeData;
  let employeeHTML = '';

  // Loop through all employees to build data cards
  employees.forEach((employee, index) => {
    let name = employee.name;
    let email = employee.email;
    let city = employee.location.city;
    let picture = employee.picture;

    // Build the employee card HTML
    employeeHTML += `
      <div class="card" data-index="${index}">
      <img class="avatar" src="${picture.large}" alt="Photo of ${name.first} ${name.last}">
        <div class="card-text">
          <h2 class="name">${name.first} ${name.last}</h2>
          <p class="email">${email}</p>
          <p class="address">${city}</p>
        </div>
      </div>
    `;
  });
  // Insert employee grid content into div
  gridContainer.innerHTML = employeeHTML;
}

function displayModal(index) {
  let { name, dob, phone, email, location: { city, street, state, postcode }, picture } = employees[index];
  let date = new Date(dob.date);    
  const modalHTML =`
          <img class="avatar" src="${picture.large}" alt="Photo of ${name.first} ${name.last}">
          <div class="modal-text">
                  <h2 class="name">${name.first} ${name.last}</h2>
                  <p class="email">${email}</p>
                  <p class="address">${city}</p>
                  <hr/>
                  <p class="phone">${phone}</p>
                  <p class="address">${street.number} ${street.name}, ${state} ${postcode}</p>
                  <p class="birthday">Birthday: ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}</p>
          </div>
          `;
           
    overlay.classList.remove('hidden');
    modalContainer.innerHTML = modalHTML;
}

gridContainer.addEventListener('click', e => {
  if (e.target !== gridContainer) {
    const card = e.target.closest(".card");
    let index = card.getAttribute('data-index');
    displayModal(index);
  }
});

modalClose.addEventListener('click', () => {
  overlay.classList.add('hidden');
});

modalNav.addEventListener('click', () => {
  const card = document.querySelectorAll(".card");
  let index = card.getAttribute('data-index');
  console.log(index);
  if (index < 11) {
    index += 1;
    displayModal(index);
  } else if (index === 11) {
    index = 0;
    displayModal(index);
  }
});

const search = document.querySelector('#searchbox');  
const employeeNames = document.querySelectorAll('.name');

const searchEmployees = event => {
  const searchTerm = event.target.value.toLowerCase();
  employeeNames.forEach(employeeName => {
    const text = employeeName.textContent.toLowerCase();
    const box = employeeName.parentElement.parentElement;
    if(text.indexOf(searchTerm) > -1) {
      box.style.display = "block";
    } else {
      box.style.display = "none";  
    }
    })
  };

search.addEventListener('keyup', searchEmployees);
