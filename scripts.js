var dataExample = new Date();
var dia = String(dataExample.getDate()).padStart(2, '0');
var mes = String(dataExample.getMonth() + 1).padStart(2, '0');
var ano = dataExample.getFullYear();
var hours = String(dataExample.getHours()).padStart(2, '0');
var minutes = String(dataExample.getMinutes()).padStart(2, '0');
var seconds = String(dataExample.getSeconds()).padStart(2, '0');
dataAtual = `${dia}/${mes}/${ano} ${hours}:${minutes}:${seconds}`;

const date_definition = localStorage.getItem("data_definida")
let data
if(!date_definition) {
  data = window.prompt('Digite o horario final', dataAtual);
  localStorage.setItem("data_definida", data);
} else {
  data = date_definition
}

function formatDate(inputDate) {
  const parts = inputDate.split(/[/ :]/);
  const day = parts[0];
  const month = parts[1];
  const year = `${parts[2]}`;
  const hours = parts[3];
  const minutes = parts[4];
  const seconds = parts[5];

  const isoDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  return isoDate;
}

const isoFormattedDate = formatDate(data);

const targetDate = new Date(`${isoFormattedDate}`).getTime();
const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const alertElement = document.getElementById("alert");
const bodyElement = document.getElementById("body");


function updateCountdown() {
  const now = new Date().getTime();
  const timeRemaining = targetDate - now;

  let days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  let hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  if ((hours == Math.floor(0) && minutes<= Math.floor(10)) || (hours == Math.floor(0) && minutes <= Math.floor(10) && seconds == Math.floor(0))){
    alertElement.classList.add("active");
    alertElement.innerHTML = `
      <div class="alert_content">SEU TEMPO JÁ ESTA TERMINANDO, SE PREPARE PARA FINALIZAR</div>
    `;
    // console.log('teste')
  } else if (hours <= Math.floor(0) && minutes <= Math.floor(0) && seconds <= Math.floor(0)){
    days = 0;
    hours = 0;
    minutes = 0;
    seconds = 0;
    alertElement.classList.add("active");
    alertElement.innerHTML = `
      <div class="alert_content">SEU TEMPO ACABOU!!!</div>
    `;
  }

  daysElement.textContent = days.toString().padStart(2, "0");
  hoursElement.textContent = hours.toString().padStart(2, "0");
  minutesElement.textContent = minutes.toString().padStart(2, "0");
  secondsElement.textContent = seconds.toString().padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

function updateClock() {
    const now = new Date();
    const options = { timeZone: 'America/Sao_Paulo', hour12: false };
    const timeString = now.toLocaleTimeString('en-US', options);

    const timeElement = document.getElementById('time');
    timeElement.textContent = timeString;

    requestAnimationFrame(updateClock);
}

updateClock();