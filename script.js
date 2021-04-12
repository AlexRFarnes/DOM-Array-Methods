const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');
const main = document.getElementById('main');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// Fetch random user and add money
async function getRandomUser() {
    const response = await fetch('https://randomuser.me/api');
    const responseJson = await response.json();

    const user = responseJson.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    };

    addData(newUser);
}


// Double everyones money
function doubleMoney() {
    data = data.map(user => {
        return { ...user, money: user.money * 2 };
    });

    updateDOM();
}

// Sort users by wealthiest
function sortUsers() {
    data.sort((a, b) => b.money - a.money);

    updateDOM();
}

// Add new user object to data array
function addData(user) {
    data.push(user);

    updateDOM();
}

// Filter only by millionaires
function filterMillionaires() {
    data = data.filter(user => user.money > 1000000);

    updateDOM();
}

// Calculate the total money
function calculateTotalWealth() {
    const totalWealth = data.reduce((acc, user) => acc + user.money, 0);

    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total Wealth: <strong>$${formatMoney(totalWealth)}</strong></h3>`;

    main.appendChild(wealthEl);
}

// Update DOM
function updateDOM(providedData = data) {
    // Clear the main div
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> $${formatMoney(item.money)}`;
        main.appendChild(element);
    });
}

// Format number as money
function formatMoney(number) {
    return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Event listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortUsers);
showMillionairesBtn.addEventListener('click', filterMillionaires);
calculateWealthBtn.addEventListener('click', calculateTotalWealth)