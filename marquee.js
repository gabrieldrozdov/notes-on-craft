fetch('/data.json')
	.then((response) => response.json())
	.then((json) => {
		let options = [];
		for (let key of Object.keys(json)) {
			if (json[key]['generate-subpages'] != 1) {
				continue
			}
			if (json[key]['marquee'].length > 0) {
				options.push([json[key]['marquee'], json[key]['folder']]);
			}
		}
		generateMarquee(options[Math.floor(Math.random()*options.length)]);
	})

function generateMarquee([text, url]) {
	const marquee = document.querySelector('.marquee');
	marquee.href = `/conversations/${url}/`;
	marquee.innerHTML = `
		<p class="marquee-content">
			${text}
		</p>
		<p class="marquee-content">
			${text}
		</p>
	`;
}