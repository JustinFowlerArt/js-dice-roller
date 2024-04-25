const result = document.getElementById('result');
const button = document.getElementById('roll');
const message = document.getElementById('message');
const select = document.getElementById('select');

let sides = 6;

function rollDie() {
	const value = Math.floor(Math.random() * sides) + 1;
	result.innerText = value;
	if (sides != 20) return;
	if (value == 1) {
		message.innerText = 'Critical Fail';
		message.style = 'color: red';
	} else if (value == 20) {
		message.innerText = 'Critical Success';
		message.style = 'color: green';
	} else {
		message.innerText = '';
	}
}

function updateDice(e) {
	sides = parseInt(e.target.value);
}

button.addEventListener('click', rollDie);
select.addEventListener('change', e => updateDice(e));
