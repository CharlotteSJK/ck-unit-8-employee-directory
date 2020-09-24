// global variables
let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture, email, location, phone, dob &noinfo &nat=US`
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
const modalNav = document.querySelector(".modal-nav");
const search = document.querySelector('#searchbox');  
const previous = document.querySelector(".previous");
const next = document.querySelector(".next");

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

  let indexNumber = parseInt(index);

  previous.addEventListener('click', () => { 
      if (indexNumber > 0) {
      indexNumber -= 1;
      displayModal(indexNumber);
    } else if (indexNumber === 0) {
      indexNumber = 11;
      displayModal(indexNumber);
      }
    });

  next.addEventListener('click', () => {   
      if (indexNumber < 11) {
      indexNumber += 1;
      displayModal(indexNumber);
    } else if (indexNumber === 11) {
      indexNumber = 0;
      displayModal(indexNumber);
      }
    });
}});

modalClose.addEventListener('click', () => {
  overlay.classList.add('hidden');
});

// Employee search function to filter shown results by name
search.addEventListener('keyup', () => {
  const searchTerm = search.value.toLowerCase();
  const employeeNames = document.querySelectorAll('.name');
  employeeNames.forEach(employeeName => {
    const text = employeeName.textContent.toLowerCase();
    const box = employeeName.parentElement.parentElement;
    if(text.indexOf(searchTerm) > -1) {
      box.style.display = "block";
    } else {
      box.style.display = "none";  
    }
	})
});