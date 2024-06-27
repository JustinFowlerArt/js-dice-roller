async function start() {
	const result = document.getElementById('result');
	const button = document.getElementById('roll');
	const message = document.getElementById('message');
	const hp = document.getElementById('hp');
	const name = document.getElementById('name');
	const select = document.getElementById('select');

	const baseUrl = `https://www.dnd5eapi.co`;

	async function getAllMonsters() {
		try {
			const response = await fetch(baseUrl + '/api/monsters');
			if (!response.ok) new Error('Something went wrong');
			const data = await response.json();
			return data.results;
		} catch (error) {
			console.log(error);
		}
	}

	const monsters = await getAllMonsters();

	async function getMonster() {
		const index = Math.floor(Math.random() * monsters.length);
		const monster = monsters[index];
		try {
			const response = await fetch(baseUrl + monster.url);
			if (!response.ok) new Error('Something went wrong');
			const data = await response.json();
			return data;
		} catch (error) {
			console.log(error);
		}
	}
	let enemy = await getMonster();

	const crit = 20;
	const fail = 1;
	let sides = 6;

	name.innerText = enemy.name;

	async function rollDie() {
		const value = Math.floor(Math.random() * sides) + 1;
		result.innerText = 'Damage: ' + value;
		enemy.hit_points -= value;
		hp.innerText = 'HP: ' + enemy.hit_points;
		if (enemy.hit_points <= 0) {
			enemy = await getMonster();
			message.innerText = 'New enemy approaching ';
			name.innerText = enemy.name;
			hp.innerText = 'HP: ' + enemy.hit_points;
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
	select.addEventListener('change', updateDice);
}

start();
