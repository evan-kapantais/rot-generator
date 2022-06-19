// TODO: download strings

import alphabet from './alphabet.js';

const copyButton = document.querySelector('.copy-button');
const saveButton = document.querySelector('.save-button');
const downloadButton = document.querySelector('.download-button');

const textInput = document.querySelector('#text');
const controlsForm = document.querySelector('.controls-form');

const controls = {};
const strings = [];

document.addEventListener('DOMContentLoaded', () => {
	checkLocalStorage();
	controlsForm.addEventListener('change', handleValueChange);
	textInput.addEventListener('input', handleValueChange);
	copyButton.addEventListener('click', copyToClipboard);
	saveButton.addEventListener('click', saveString);
	downloadButton.addEventListener('click', downloadSavedStrings);
});

// TODO: Remove in production
function l(text) {
	console.log(text);
}

function setControls(options) {
	if (!options) {
		controls.algo = document.querySelector('[name="algo"]').value;
		controls.direction = document.querySelector('[name="direction"]').checked
			? 'backward'
			: 'forward';
		controls.trim = document.querySelector('[name="trim"]').checked
			? true
			: false;
	}
}

function checkLocalStorage() {
	const localItems = JSON.parse(localStorage.getItem('rotside'));
	const localStrings = JSON.parse(localStorage.getItem('rotside_strings'));

	if (!localItems) {
		setControls();
		localStorage.setItem('rotside', JSON.stringify(controls));
		return;
	}

	const { algo, direction, trim } = localItems;

	document.querySelector('[name="algo"]').value = algo;
	document.querySelector(
		`[name="direction"][value="${direction}"]`
	).checked = true;
	document.querySelector(`[name="trim"][value="${trim}"]`).checked = true;

	const directionIcon = document.querySelector('.direction-icon');

	if (direction === 'backward') {
		directionIcon.classList.add('backward');
	} else {
		directionIcon.classList.remove('backward');
	}

	if (!localStrings) {
		localStorage.setItem('rotside_strings', JSON.stringify([]));
		return;
	}

	strings.push(...localStrings);

	const stringsList = document.querySelector('.strings-list ul');

	strings.forEach((string) => {
		const li = document.createElement('li');
		li.textContent = string;
		stringsList.appendChild(li);
	});
}

function showOutputMessage(type) {
	const output = document.querySelector('.output');
	const className = type == 'copied' ? 'copied' : 'saved';

	output.classList.add(className);

	setTimeout(() => {
		output.classList.remove(className);
	}, 4000);
}

function copyToClipboard() {
	const output = document.querySelector('.output');

	navigator.clipboard.writeText(output.textContent);

	showOutputMessage('copied');
}

function saveString() {
	const text = document.querySelector('.output').textContent;

	const strings = JSON.parse(localStorage.getItem('rotside_strings'));
	strings.push(text);

	localStorage.setItem('rotside_strings', JSON.stringify(strings));

	const stringsList = document.querySelector('.strings-list ul');

	const li = document.createElement('li');
	li.textContent = text;
	stringsList.appendChild(li);

	showOutputMessage('saved');
}

function downloadSavedStrings() {
	const output = document.querySelector('.output');
	const text = output.textContent;

	const link = document.createElement('a');
	link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(text);
	link.download = 'rotside.txt';
	link.click();
}

function handleValueChange() {
	const text = document.querySelector('#text').value;

	const output = document.querySelector('.output');
	const directionIcon = document.querySelector('.direction-icon');

	const algo = document.querySelector('[name="algo"]').value;
	const direction = document.querySelector('[name="direction"]').checked
		? 'backward'
		: 'forward';
	const trim = document.querySelector('[name="trim"]').checked ? true : false;

	if (direction === 'backward') {
		directionIcon.classList.add('backward');
	} else {
		directionIcon.classList.remove('backward');
	}

	// Update local items
	controls.algo = algo;
	controls.direction = direction;
	controls.trim = trim;

	localStorage.setItem('rotside', JSON.stringify(controls));

	const rotated =
		direction === 'forward'
			? rotateStringForwards(text, parseInt(algo.substr(3)), trim)
			: rotateStringBackwards(text, parseInt(algo.substr(3)), trim);

	if (text) {
		copyButton.classList.add('shown');
		saveButton.classList.add('shown');
	} else {
		copyButton.classList.remove('shown');
		saveButton.classList.remove('shown');
	}
	// text

	if (rotated) {
		output.classList.remove('placeholder');
		output.textContent = rotated;
	} else {
		output.classList.add('placeholder');
		output.textContent = 'Your output here';
	}
}

function rotateStringForwards(text = '', places = 0, trim = false) {
	const arr = trim ? text.split(' ').join('').split('') : text.split('');

	let output = '';

	arr.forEach((letter) => {
		const currentIndex = alphabet.indexOf(letter.toLowerCase());
		const isLetter = currentIndex !== -1;
		const isSpecial = letter.match(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g);
		const isSpace = letter === ' ';

		if (isSpace) return (output += letter);

		if (isSpecial) return (output += letter);

		// Check if digit is a number
		if (!isLetter) {
			letter = Number(letter);
			const targetNumber = letter + places;
			const nextNumber = targetNumber > 9 ? targetNumber - 10 : targetNumber;
			output += nextNumber;
		} else {
			const isUppercase = letter === letter.toUpperCase();

			const targetIndex = currentIndex + places;
			let nextIndex = targetIndex;

			if (targetIndex > alphabet.length - 1)
				nextIndex = targetIndex - alphabet.length;

			output += isUppercase
				? alphabet[nextIndex].toUpperCase()
				: alphabet[nextIndex];
		}
	});

	return output;
}

function rotateStringBackwards(text = '', places = 0, trim = false) {
	const arr = trim ? text.split(' ').join('').split('') : text.split('');

	let output = '';

	arr.forEach((letter) => {
		const currentIndex = alphabet.indexOf(letter.toLowerCase());
		const isLetter = currentIndex !== -1;
		const isSpecial = letter.match(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g);
		const isSpace = letter === ' ';

		if (isSpace) return (output += letter);

		if (isSpecial) return (output += letter);

		// Check if digit is a number
		if (!isLetter) {
			letter = Number(letter);
			const targetNumber = letter - places;
			const nextNumber = targetNumber < 0 ? 10 + targetNumber : targetNumber;
			output += nextNumber;
		} else {
			const isUppercase = letter === letter.toUpperCase();

			const targetIndex = currentIndex - places;
			let nextIndex = targetIndex;

			if (targetIndex < 0) nextIndex = alphabet.length + targetIndex;

			output += isUppercase
				? alphabet[nextIndex].toUpperCase()
				: alphabet[nextIndex];
		}
	});

	return output;
}
