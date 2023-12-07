function toggleNotesSection(elmnt) {
	if (parseInt(elmnt.dataset.active) == 1) {
		elmnt.dataset.active = 0;
	} else {
		elmnt.dataset.active = 1;
	}
}