// Listen button
let audio = new Audio();
function listenToRecording(file) {
	const listenButton = document.querySelector('.conversation-body-listen');
	if (parseInt(listenButton.dataset.active) == "1") {
		audio.removeEventListener("ended", stopAudio);
		audio.pause();
		listenButton.dataset.active = 0;
	} else {
		audio.removeEventListener("ended", stopAudio);
		audio = new Audio(`/assets/recordings/${file}`);
		audio.addEventListener("ended", stopAudio);
		audio.play();
		listenButton.dataset.active = 1;
	}
}
function stopAudio() {
	const listenButton = document.querySelector('.conversation-body-listen');
	audio.removeEventListener("ended", stopAudio);
	audio.pause();
	listenButton.dataset.active = 0;
}

// Slideshow
function prevSlide(elmnt) {
	let slides = elmnt.querySelectorAll('[data-slide]');
	for (let slide of slides) {
		slide.dataset.active = 0;
	}

	let maxSlides = parseInt(slides[slides.length-1].dataset.slide);
	elmnt.dataset.slide = parseInt(elmnt.dataset.slide) - 1;
	if (parseInt(elmnt.dataset.slide) < 0) {
		elmnt.dataset.slide = maxSlides;
	}
	for (let activeSlide of elmnt.querySelectorAll(`[data-slide="${elmnt.dataset.slide}"]`)) {
		activeSlide.dataset.active = 1;
	}
}
function nextSlide(elmnt) {
	let slides = elmnt.querySelectorAll('[data-slide]');
	for (let slide of slides) {
		slide.dataset.active = 0;
	}

	let maxSlides = parseInt(slides[slides.length-1].dataset.slide);
	elmnt.dataset.slide = parseInt(elmnt.dataset.slide) + 1;
	if (parseInt(elmnt.dataset.slide) > maxSlides) {
		elmnt.dataset.slide = 0;
	}
	for (let activeSlide of elmnt.querySelectorAll(`[data-slide="${elmnt.dataset.slide}"]`)) {
		activeSlide.dataset.active = 1;
	}
}