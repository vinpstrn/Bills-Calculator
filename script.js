
const monthlyBillAmountText = document.querySelector('.monthly-amount');
const meralcoPrevKwh = document.getElementById('meralco-prev-amount');
const meralcoCurKwh = document.getElementById('meralco-cur-amount');
const meralcoKwhRate = document.getElementById('meralco-kwh-amount');
const meralcoAmount = document.getElementById('meralco-amount');
const waterAmount = document.getElementById('water-amount');
const internetAmount = document.getElementById('internet-amount');
const foodsAmount = document.getElementById('foods-amount');
const otherAmount = document.getElementById('others-amount');
const calculateBtn = document.querySelector('.btn');


calculateBtn.addEventListener('click', (e) => {
  e.preventDefault();

  meralcoAmount.value = calculateMeralco();
  const totalBills = calculateBills();
  monthlyBillAmountText.innerHTML = `${totalBills} PHP`;
  
});

function calculateMeralco() {
  const prevKwh = parseFloat(meralcoPrevKwh.value) || 0;
  const curKwh = parseFloat(meralcoCurKwh.value) || 0;
  const rateKwh = parseFloat(meralcoKwhRate.value) || 0;

  return (curKwh - prevKwh) * rateKwh;
  
}

function calculateBills() {

  const meralco = parseFloat(meralcoAmount.value) || 0;
  const water = parseFloat(waterAmount.value) || 0;
  const internet = parseFloat(internetAmount.value) || 0;
  const foods = parseFloat(foodsAmount.value) || 0;
  const others = parseFloat(otherAmount.value) || 0;

  return meralco + water + internet + foods + others;
}