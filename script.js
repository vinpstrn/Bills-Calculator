document.addEventListener('DOMContentLoaded', () => {
  
const monthlyBillAmountText = document.querySelector('.monthly-amount');
const electricityPrevKwh = document.getElementById('electricity-prev-amount');
const electricityCurKwh = document.getElementById('electricity-cur-amount');
const electricityKwhRate = document.getElementById('electricity-kwh-amount');
const electricityAmount = document.getElementById('electricity-amount');
const waterAmount = document.getElementById('water-amount');
const internetAmount = document.getElementById('internet-amount');
const foodsAmount = document.getElementById('foods-amount');
const otherAmount = document.getElementById('others-amount');
const calculateBtn = document.querySelector('.btn-calculate');
const addToMonthlyBtn = document.querySelector('.btn-monthly');
const monthYearEl = document.querySelector('.month-date');
const monthsEl = document.querySelector('.months');
const reportBtn = document.querySelector('.report-btn');
const reports = document.querySelector('.reports-section');
const inputs = document.querySelector('.input-section');
const backBtn = document.querySelector('.btn-back');
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const bills = {
  electricity: 'electricity',
  water: 'water',
  internet: 'internet',
  foods: 'foods',
  others: 'others',
  totalBills: 'totalBills'
}

calculateBtn.addEventListener('click', (e) => {
  e.preventDefault();

  electricityAmount.value = calculateelectricity();
  bills.totalBills = calculateBills();
  monthlyBillAmountText.innerHTML = `${bills.totalBills.toLocaleString()} PHP`;

});

addToMonthlyBtn.addEventListener('click', (e) => {
  e.preventDefault();
  getMonthAndYear();
  saveBillsToLocalStorage();
});

function calculateelectricity() {
  const prevKwh = parseFloat(electricityPrevKwh.value) || 0;
  const curKwh = parseFloat(electricityCurKwh.value) || 0;
  const rateKwh = parseFloat(electricityKwhRate.value) || 0;

  return (curKwh - prevKwh) * rateKwh;
  
}

function calculateBills() {

  bills.electricity = parseFloat(electricityAmount.value) || 0;
  bills.water = parseFloat(waterAmount.value) || 0;
  bills.internet = parseFloat(internetAmount.value) || 0;
  bills.foods = parseFloat(foodsAmount.value) || 0;
  bills.others = parseFloat(otherAmount.value) || 0;

  return bills.electricity + bills.water + bills.internet + bills.foods + bills.others;
}

function getMonthAndYear() {

  const value = monthYearEl.value;
  const getMonthAndYear = value.split('-');
  console.log(getMonthAndYear);
  const year = +getMonthAndYear[0];
  const month = +getMonthAndYear[1];
  const day = +getMonthAndYear[2];

  monthsEl.insertAdjacentHTML('afterbegin', `
    <div class="months-container">
      <div class="months-title">
        <span class="months-month">${months[month - 1]} ${day}, ${year}</span>
        <div class="months-dropdown">
          <p class="months-bill">PHP ${bills.totalBills.toLocaleString()}</p>
          <div class="months-icon"><ion-icon name="chevron-down-outline" role="img" class="md hydrated"></ion-icon></div>
        </div>
      </div>
      <div class="months-content hide">
        <ul class="months-list">
          <li class="month-item"><span class="months-utility">Electricity:</span><span class="months-amount">PHP ${bills.electricity.toLocaleString()}</span></li>
          <li class="month-item"><span class="months-utility">Water:</span><span class="months-amount">PHP ${bills.water.toLocaleString()}</span></li>
          <li class="month-item"><span class="months-utility">Internet:</span><span class="months-amount">PHP ${bills.internet.toLocaleString()}</span></li>
          <li class="month-item"><span class="months-utility">Foods:</span><span class="months-amount">PHP ${bills.foods.toLocaleString()}</span></li>
          <li class="month-item"><span class="months-utility">Others:</span><span class="months-amount">PHP ${bills.others.toLocaleString()}</span></li>
        </ul>
      </div>
    </div>
  `);
  
}

reportBtn.addEventListener('click', (e) => {
  e.preventDefault();

  if(reports.classList.contains('hide')) {
    reports.classList.remove('hide');
    reports.classList.add('show');

    inputs.classList.remove('show');
    inputs.classList.add('hide');
  } else {
    reports.classList.remove('show');
    reports.classList.add('hide');

    inputs.classList.remove('hide');
    inputs.classList.add('show');
  }

});

backBtn.addEventListener('click', (e) => {
  e.preventDefault();

  if(reports.classList.contains('show')) {
    reports.classList.remove('show');
    reports.classList.add('hide');

    inputs.classList.remove('hide');
    inputs.classList.add('show');
  } else {
    reports.classList.remove('hide');
    reports.classList.add('show');

    inputs.classList.remove('show');
    inputs.classList.add('hide');
  }
});

monthsEl.addEventListener('click', (e) => {
  const clicked = e.target.closest('.months-container');
  if(!clicked) return;

  const content = clicked.querySelector('.months-content');
  const icon = clicked.querySelector('.months-icon');

  if(!content || !icon) return;

  if (content.classList.contains('hide')) {
    content.classList.remove('hide');
    content.classList.add('show');
    icon.innerHTML = '<ion-icon name="chevron-up-outline"></ion-icon>';
  } else {
    content.classList.remove('show');
    content.classList.add('hide');
    icon.innerHTML = '<ion-icon name="chevron-down-outline"></ion-icon>';
  }

});

function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}

monthYearEl.value = getTodayDate();

monthYearEl.value = getTodayDate();

function saveBillsToLocalStorage() {

  const billsArray = loadBillsFromLocalStorage() || [];

  const billEntry = {
    date: monthYearEl.value,
    bills: { ...bills }
  }

  billsArray.push(billEntry);

  localStorage.setItem('bills', JSON.stringify(billsArray));

}

function loadBillsFromLocalStorage() {
  const billsString = localStorage.getItem('bills');

  return billsString ? JSON.parse(billsString) : [];
}


function displayBills() {
  const loadedBillsArray = loadBillsFromLocalStorage();
  monthsEl.innerHTML = '';

  loadedBillsArray.forEach(entry => {
    const { date, bills } = entry;
    const [year, month, day] = date.split('-');

    monthsEl.insertAdjacentHTML('beforeend', `
      <div class="months-container">
        <div class="months-title">
          <span class="months-month">${months[parseInt(month, 10) - 1]} ${parseInt(day, 10)}, ${year}</span>
          <div class="months-dropdown">
            <p class="months-bill">PHP ${bills.totalBills.toLocaleString()}</p>
            <div class="months-icon"><ion-icon name="chevron-down-outline" role="img" class="md hydrated"></ion-icon></div>
          </div>
        </div>
        <div class="months-content hide">
          <ul class="months-list">
            <li class="month-item"><span class="months-utility">Electricity:</span><span class="months-amount">PHP ${bills.electricity.toLocaleString()}</span></li>
            <li class="month-item"><span class="months-utility">Water:</span><span class="months-amount">PHP ${bills.water.toLocaleString()}</span></li>
            <li class="month-item"><span class="months-utility">Internet:</span><span class="months-amount">PHP ${bills.internet.toLocaleString()}</span></li>
            <li class="month-item"><span class="months-utility">Foods:</span><span class="months-amount">PHP ${bills.foods.toLocaleString()}</span></li>
            <li class="month-item"><span class="months-utility">Others:</span><span class="months-amount">PHP ${bills.others.toLocaleString()}</span></li>
          </ul>
        </div>
      </div>
    `);

  });

}

displayBills();

});




// Set default date to today


// get currentMonth with year
// list of months

// if list of months[currentMonth] {
//   display currentMonth
// }