function toggleNotesSection(elmnt) {
	if (parseInt(elmnt.dataset.active) == 1) {
		elmnt.dataset.active = 0;
	} else {
		elmnt.dataset.active = 1;
	}
}
function toggleNotesSectionAlt(elmnt) {
	elmntDOM = document.querySelector(elmnt);
	if (parseInt(elmntDOM.dataset.active) == 1) {
		elmntDOM.dataset.active = 0;
	} else {
		elmntDOM.dataset.active = 1;
	}
}