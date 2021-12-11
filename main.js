const alphabet = [
	'a',
	'b',
	'c',
	'd',
	'e',
	'f',
	'g',
	'h',
	'i',
	'j',
	'k',
	'l',
	'm',
	'n',
	'o',
	'p',
	'q',
	'r',
	's',
	't',
	'u',
	'v',
	'w',
	'x',
	'y',
	'z',
];

const copyButton = document.querySelector('.copy-button');
const form = document.querySelector('form');

document.addEventListener('DOMContentLoaded', () => {
	form.addEventListener('submit', handleFormSubmit);
	copyButton.addEventListener('click', copyToClipboard);
});

function copyToClipboard() {
	const output = document.querySelector('.output');

	navigator.clipboard.writeText(output.textContent);
	output.classList.add('active');

	setTimeout(() => {
		output.classList.remove('active');
	}, 4000);
}

function handleFormSubmit(e) {
	e.preventDefault();

	const input = e.target.querySelector('#text').value;
	const algo = e.target.querySelector('#algo').value;
	const type = e.target.querySelector('#type').value;
	const trim = e.target.querySelector('#trim').checked;
	const output = document.querySelector('.output');

	const places = Number(algo.substr(3));

	const rotated =
		type === 'forwards'
			? rotateStringForwards(input, places, trim)
			: rotateStringBackwards(input, places, trim);

	output.textContent = rotated;

	copyButton.classList.add('shown');
}

function rotateStringForwards(text, places, trim = false) {
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

function rotateStringBackwards(text, places, trim = false) {
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
