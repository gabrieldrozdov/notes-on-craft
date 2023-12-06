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
	if (activeFilters.length == 0) {
		for (let block of document.querySelectorAll('[data-categories]')) {
			block.dataset.hide = 0;
		}
	} else {
		for (let block of document.querySelectorAll('[data-categories]')) {
			let hide = 1;
			for (let category of block.dataset.categories.split(',')) {
				if (activeFilters.includes(category.trim().toLowerCase())) {
					hide = 0;
				}
			}
			block.dataset.hide = hide;
		}
	}

	// Quick scroll back to start
	const index = document.querySelector('.index');
	index.style.scrollBehavior = 'unset';
	index.scrollLeft = 0;
	setTimeout(() => {
		index.style.scrollBehavior = 'smooth';
	}, 50)
}

// Remove all filters
function clearFilters() {
	activeFilters = [];
	for (let filterToggle of document.querySelectorAll('.nav-filter')) {
		filterToggle.dataset.active = 0;
	}
	for (let block of document.querySelectorAll('[data-categories]')) {
		block.dataset.hide = 0;
	}

	// Quick scroll back to start
	const index = document.querySelector('.index');
	index.style.scrollBehavior = 'unset';
	index.scrollLeft = 0;
	setTimeout(() => {
		index.style.scrollBehavior = 'smooth';
	}, 50)
}

// Add hover effects to grouped links
for (let link of document.querySelectorAll('.index-link')) {
	link.addEventListener('mouseenter', () => {highlightGroup(link.dataset.group)});
	link.addEventListener('mouseleave', () => {unhighlightGroup(link.dataset.group)});
}
function highlightGroup(group) {
	for (let link of document.querySelectorAll(`.index-link[data-group="${group}"`)) {
		link.dataset.highlight = 1;
	}
}
function unhighlightGroup(group) {
	for (let link of document.querySelectorAll(`.index-link[data-group="${group}"`)) {
		link.dataset.highlight = 0;
	}
}

// Shuffle columns
function indexShuffle() {

	// Move items randomly in groups of 4
	let i = 0;
	let randomOrder = Math.floor(Math.random()*300+1);
	for (let block of document.querySelectorAll('[data-group]')) {
		if (i%4 == 0) {
			randomOrder = Math.floor(Math.random()*300+1);
		}
		block.style.order = randomOrder;
		i++;
	}

	// Quick scroll back to start
	const index = document.querySelector('.index');
	index.style.scrollBehavior = 'unset';
	index.scrollLeft = 0;
	setTimeout(() => {
		index.style.scrollBehavior = 'smooth';
	}, 50)
}
function indexScrollLeft() {
	const index = document.querySelector('.index');
	index.scrollLeft -= 500;
}
function indexScrollRight() {
	const index = document.querySelector('.index');
	index.scrollLeft += 500;

}