// Open filters menu
function toggleFilters() {
	const navFilters = document.querySelector('.nav-filters');
	const navFilterToggle = document.querySelector('.nav-filter-toggle');
	if (parseInt(navFilters.dataset.active) == 1) {
		navFilters.dataset.active = 0;
		navFilterToggle.dataset.active = 0;
	} else {
		navFilters.dataset.active = 1;
		navFilterToggle.dataset.active = 1;
	}
}

// Filter items
let activeFilters = [];
function toggleFilter(filter) {
	const filterToggle = document.querySelector(`.nav-filter[data-filter="${filter}"]`);
	if (parseInt(filterToggle.dataset.active) == 1) {
		filterToggle.dataset.active = 0;
		activeFilters.splice(activeFilters.indexOf(filter.toLowerCase()), 1)
	} else {
		filterToggle.dataset.active = 1;
		activeFilters.push(filter.toLowerCase());
	}

	// Filter out items
	console.log(activeFilters);
	if (activeFilters.length == 0) {
		for (let libraryItem of document.querySelectorAll('.library-item')) {
			libraryItem.dataset.hide = 0;
		}
	} else {
		for (let libraryItem of document.querySelectorAll('.library-item')) {
			let hide = 1;
			for (let category of libraryItem.dataset.categories.split(',')) {
				if (activeFilters.includes(category.trim().toLowerCase())) {
					hide = 0;
				}
			}
			libraryItem.dataset.hide = hide;
		}
	}
}

// Remove all filters
function clearFilters() {
	activeFilters = [];
	for (let filterToggle of document.querySelectorAll('.nav-filter')) {
		filterToggle.dataset.active = 0;
	}
	for (let libraryItem of document.querySelectorAll('.library-item')) {
		libraryItem.dataset.hide = 0;
	}
}

// Sort items
let sortCategory = 'title';
let sortMode = 'ascending';
function sortLibrary(category) {
	for (let sortToggle of document.querySelectorAll('.library-nav-col')) {
		sortToggle.dataset.active = 0;
	}
	let activeToggle = document.querySelector(`.library-nav-col[data-sort="${category}"]`);

	if (category == sortCategory) {
		if (sortMode == 'ascending') {
			sortMode = 'descending';
			activeToggle.dataset.active = 1;
		} else {
			sortMode = 'ascending';
			activeToggle.dataset.active = 2;
		}
	} else {
		sortCategory = category;
		sortMode = 'descending';
		activeToggle.dataset.active = 1;
	}

	// Do the actual sorting TODO
	let sortList = [];
	if (category == 'title') {

	} else if (category == 'lastname') {

	} else if (category == 'firstname') {
		
	} else if (category == 'source') {
		
	} else if (category == 'year') {
		
	}

	if (sortMode == 'ascending') {
		sortList.reverse();
	}
	let orderTrack = 0;
	for (let listItem of sortList) {
		let libraryItem = document.querySelector(`.library-item[data-id="${listItem}"`);
		libraryItem.style.order = orderTrack;
		orderTrack++;
	}
}

// Click on an item
function focusLibraryItem(elmnt) {
	if (elmnt == document.querySelector('.library-item[data-active="1"]')) {
		elmnt.dataset.active = 0;
		return
	}
	for (let libraryItem of document.querySelectorAll('.library-item')) {
		libraryItem.dataset.active = 0;
	}
	elmnt.dataset.active = 1;
}