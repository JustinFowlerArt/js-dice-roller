const result = document.getElementById('result');
const button = document.getElementById('roll');
const message = document.getElementById('message');
const select = document.getElementById('select');

const enemy = {
	name: 'Goblin1',
	hp: 8,
};

const crit = 20;
const fail = 1;
let sides = 6;

function rollDie() {
	const value = Math.floor(Math.random() * sides) + 1;
	result.innerText = value;
	enemy.hp -= value;
	message.innerText = 'HP: ' + enemy.hp;
	if (enemy.hp <= 0) {
		enemy.hp = 8;
		message.innerText = 'New enemy approaching.' + '\nHP: ' + enemy.hp;
	}
	if (sides != crit) return;
	if (value == fail) {
		message.innerText = 'Critical Fail';
		message.style = 'color: red';
	} else if (value == crit) {
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
