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
		for (let maker of document.querySelectorAll('.maker')) {
			maker.dataset.hide = 0;
		}
	} else {
		for (let maker of document.querySelectorAll('.maker')) {
			let hide = 1;
			for (let category of maker.dataset.categories.split(',')) {
				if (activeFilters.includes(category.trim().toLowerCase())) {
					hide = 0;
				}
			}
			maker.dataset.hide = hide;
		}
	}
}

// Remove all filters
function clearFilters() {
	activeFilters = [];
	for (let filterToggle of document.querySelectorAll('.nav-filter')) {
		filterToggle.dataset.active = 0;
	}
	for (let maker of document.querySelectorAll('.maker')) {
		maker.dataset.hide = 0;
	}
}

// Toggle bios
function toggleMakerBio(target, toggle) {
	let elmnt = document.querySelector(`[data-bio="${target}"]`);
	if (parseInt(elmnt.dataset.active) == 0) {
		elmnt.dataset.active = 1;
		toggle.dataset.active = 1;
	} else {
		elmnt.dataset.active = 0;
		toggle.dataset.active = 0;
	}
}