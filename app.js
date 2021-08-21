`use strict`;

const billInput = document.querySelector('.bill-input');
const tipInput = document.querySelector('.tip-input');
const peopleInput = document.querySelector('.people-input');
const btns = document.querySelectorAll('.btn');
const btnReset = document.querySelector('.btn-reset');
const tips = document.querySelector('.tips-money');
const totals = document.querySelector('.total-money');

function calculateTip(bill, tipSize, people) {
  let tipPerPerson = (bill * tipSize) / people;
  return tipPerPerson.toFixed(2);
}

function caluclateTotal(bill, tipPerPerson, people) {
  let totalPerPerson = Number(bill) / Number(people) + Number(tipPerPerson);
  return totalPerPerson.toFixed(2);
}

function checkValidity() {
  if (
    billInput.value === '' ||
    billInput.value <= '0' ||
    isNaN(billInput.value)
  ) {
    billInput.classList.add('required-outline');
    billInput
      .closest('.rel')
      .previousElementSibling.childNodes[3].classList.remove('hidden');
    return 0;
  }
  if (
    peopleInput.value === '' ||
    peopleInput.value <= '0' ||
    isNaN(peopleInput.value)
  ) {
    peopleInput.classList.add('required-outline');
    peopleInput
      .closest('.rel')
      .previousElementSibling.childNodes[3].classList.remove('hidden');
    return 0;
  }
}

btns.forEach((btn) => {
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    if (checkValidity() === 0) {
      checkValidity();
    } else {
      btnReset.classList.remove('disabled');
      let tip = calculateTip(
        billInput.value,
        e.target.dataset.tip,
        peopleInput.value
      );
      tips.textContent = `$${tip}`;
      let total = caluclateTotal(billInput.value, tip, peopleInput.value);
      totals.textContent = `$${total}`;

      e.target.classList.add('btn-active');
      billInput.disabled = true;
      peopleInput.disabled = true;
      tipInput.disabled = true;
      checkInactivity();
      btns.forEach((btn) => {
        btn.disabled = true;
      });
    }
  });
});

btnReset.addEventListener('click', function (e) {
  e.preventDefault();
  billInput.value = '';
  peopleInput.value = '';
  tipInput.value = '';
  billInput.disabled = false;
  peopleInput.disabled = false;
  tipInput.disabled = false;
  tips.textContent = '$0.00';
  totals.textContent = '$0.00';
  btns.forEach((btn) => {
    btn.disabled = false;
    btn.classList.remove('btn-active');
  });
});

tipInput.addEventListener('keypress', function (e) {
  if (e.key != 'Enter') return;
  if (checkValidity() === 0) {
    checkValidity();
  } else {
    btnReset.classList.remove('disabled');
    let tip = calculateTip(
      billInput.value,
      tipInput.value / 100,
      peopleInput.value
    );
    tips.textContent = `$${tip}`;
    let total = caluclateTotal(billInput.value, tip, peopleInput.value);
    totals.textContent = `$${total}`;

    billInput.disabled = true;
    peopleInput.disabled = true;
    tipInput.disabled = true;
    checkInactivity();
    btns.forEach((btn) => {
      btn.disabled = true;
    });
  }
});

billInput.addEventListener('focus', function () {
  billInput.classList.remove('required-outline');
  billInput
    .closest('.rel')
    .previousElementSibling.childNodes[3].classList.add('hidden');
});

peopleInput.addEventListener('focus', function () {
  peopleInput.classList.remove('required-outline');
  peopleInput
    .closest('.rel')
    .previousElementSibling.childNodes[3].classList.add('hidden');
});

function checkInactivity() {
  if (btnReset.classList.contains('disabled')) {
    btnReset.disabled = true;
  } else {
    btnReset.disabled = false;
  }
}

checkInactivity();
