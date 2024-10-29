// const value = prompt('hello');
// alert(value);
// const test = document.querySelector('#test');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchBtn');
const resultContainer = document.getElementById('result-container');
const wordTitle = document.getElementById('worldTitle');
const wordDescription = document.getElementById('wordDesc');
const audioButton = document.getElementById('audioBtn');

searchButton.addEventListener('click', ()=> {
	search();
});

searchInput.addEventListener('keyup',(event)=> {
	if (event.key==='Enter') {
		search();
	}
});

function search()  {
	const searchItem = searchInput.value.trim();
	if (searchItem === '') {
		alert("Cannot empty");
		return;
	}

	fetchDictioinaryData(searchItem);
}

async function fetchDictioinaryData(searchTerm){ 
try {
	const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`);
	if (!response.ok)
	{
		throw new Error("Not available word for meaning.");
	}
	const data = await response.json();
	displayResult(data);
	

} catch(err) {
	console.log(err);
	alert(err);
}


}

function displayResult(data) {
	resultContainer.style.display = 'block';

	const wordData = data[0];
	console.log(wordData,'worddata??');
	wordTitle.textContent = wordData.word;
	wordDescription.innerHTML = `
	<ul>
	${wordData.meanings.map(meaning=> `
<li>
<p>
<strong> Part of Speech: </strong> ${meaning.partOfSpeech} </p>
<p><strong> Definition: </strong> ${meaning.definitions[0].definition}</p>
</p>
</li>

	`).join('\n\n')}
	</ul>
	`;
}

audioButton.addEventListener('click', ()=> {
	const searchTerm = searchInput.value.trim();

	if (searchTerm === '') {
		alert("Enter a word to search");
		return;
	}

	speak(searchTerm);
});

function speak(word) {
	const speech = new SpeechSynthesisUtterance(word);
	speech.lang = 'en-US';
	speech.volume = 2;
	speech.rate = 1;
	speech.pitch = 1;
	window.speechSynthesis.speak(speech);
}