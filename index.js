const movies = 'https://api.jikan.moe/v4/top/anime?type=movie';
const series = 'https://api.jikan.moe/v4/top/anime?type=tv';
let animeContainer;

// url is a params passed when the function is called.
const getAnimies = async (url) => {
	// await API response
	const res = await fetch(url);
	// await and stream to JSON
	const result = await res.json();
	// only if the result is available
	if (result) {
		// ternary return statement to get the container to push the result to
		// if it is movies push it to movies section else push to tv section.
		const d = url.endsWith('movie') ? true : false;
		animeContainer = url.endsWith('movie')
			? document.getElementById('anime__movies')
			: document.getElementById('anime__series');

		// style the containers or add a class
		// I just set a background color for testing purpose
		animeContainer.style.background = 'blue';

		//loop through the data and populate the HTML content
		loopResult(result, animeContainer);
	}
};

// function declaration for clicked images
//id is passed from the getAnimies function declaration
const handleImageClick = (id) => {
	// navigate  to a different page.
	window.location.href = `single.html?id=${id}`;
};

// working with filter
const listItems = document.getElementsByTagName('li');
let filter;
for (let index = 0; index < listItems.length; index++) {
	const value = listItems[index];
	value.addEventListener('click', (e) =>
		handleFilter(value.innerText.toLowerCase())
	);
}

const handleFilter = async (value) => {
	const filterSection = document.getElementById('filter__section');
	const filterTitle = document.getElementById('filter__title');
	const filterContainer = document.getElementById('filter__container');

	filterSection.style.display = 'none';
	filterContainer.innerHTML = null;

	if (value.includes('updated')) {
		filterData('airing', filterContainer);
	} else if (value.includes('trending')) {
		filterData('bypopularity', filterContainer);
	} else if (value.includes('most')) {
		filterData('favorite', filterContainer);
	} else if (value.includes('rated')) {
		filterData('upcoming', filterContainer);
	}

	if (filterContainer.innerHTML != null) {
		filterSection.style.display = 'block';
		filterTitle.innerText = value;
	}
};

const loopResult = (result, container) => {
	result.data.forEach((anime) => {
		const animeImage = document.createElement('img');
		animeImage.src = anime.images.webp.image_url;

		// add onClick to the images or buttons or whatever needs to be clicked to get to the page of a single anime
		// this is a function call
		animeImage.addEventListener('click', () =>
			handleImageClick(anime.mal_id)
		);
		container.appendChild(animeImage);
	});
};

const filterData = async (filterValue, container) => {
	const res = await fetch(
		`https://api.jikan.moe/v4/top/anime?type=tv&filter=${filterValue}`
	);
	// await and stream to JSON
	const result = await res.json();
	// only if the result is available
	if (result) {
		loopResult(result, container);
	}
};

// function calls on initial render
// getAnimies(movies);
// getAnimies(series);
