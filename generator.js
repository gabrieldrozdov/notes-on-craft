const fs = require('fs');

// Get JSON
const archive = require('./archive.json');

// Convert to JSON object format
let archiveJSON = {};
for (let i of Object.keys(archive)) {
	let entry = archive[i];
	let key = entry['key'];
	archiveJSON[key] = entry;
}
console.log(archiveJSON);
generateHomepage();

function generatePages() {
	let entry = archiveJSON[key];

	// Generate filters list
	let filtersTemp = '';
	for (let filter of filters) {
		filtersTemp += `<div class="toc-filter" data-filter="ceramics" onclick="toggleFilter('ceramics')">Ceramics</div>`;
	}

	let content = `
		<div class="marquee">
			<p class="marquee-content">
				${}
			</p>
			<p class="marquee-content">
				${}
			</p>
		</div>
		
		<nav class="nav">
			<h1 class="nav-logo">Notes on Craft</h1>
			<div class="nav-links">
				<div class="nav-filter-toggle" onclick="toggleFilters()">
					<span>Filter</span>
					<svg viewBox="0 0 24 24"><path d="m12,18.666L2.104,5.334h19.792l-9.896,13.331Z"/></svg>
				</div>
				<a href="./" class="nav-link" data-active="1">Primary Index</a>
				<a href="/makers/" class="nav-link">Makers</a>
				<a href="/library/" class="nav-link">Library</a>
				<a href="/about/" class="nav-link">About</a>
			</div>
		</nav>

		<div class="toc-filters" data-active="0">
			<h2 class="toc-filters-heading">Selected Medium</h2>
			<div class="toc-filters-list">
				${filtersTemp}
			</div>
		</div>

		<main class="toc">

			<!-- CATEGORIES -->

			<div class="toc-header">
				<div class="toc-header-title">
					<h2>Category</h2>
					<div class="toc-header-controls">
						<button onclick="tocShuffle()">
							<svg viewBox="0 0 24 24"><path d="m4.811,10.008c.83-3.333,3.614-5.665,7.492-5.665,1.75,0,3.239.593,4.597,1.614l1.047-1.35c-1.489-1.284-3.485-2.009-5.628-2.009-4.805,0-8.322,3.02-9.197,7.41H0l3.812,6.652,3.779-6.652h-2.78Z"/><path d="m20.221,7.044l-3.796,6.653h2.954c-.749,3.483-3.537,5.944-7.552,5.944-1.751,0-3.239-.593-4.597-1.614l-1.047,1.35c1.489,1.284,3.485,2.009,5.628,2.009h.016c4.901,0,8.468-3.146,9.254-7.69h2.917l-3.779-6.653Z"/></svg>
						</button>
						<button onclick="tocScrollLeft()">
							<svg viewBox="0 0 24 24"><path d="m6.446,12l9.108-6.761v13.522l-9.108-6.761Z"/></svg>
						</button>
						<button onclick="tocScrollRight()">
							<svg viewBox="0 0 24 24"><path d="m17.554,12l-9.108-6.761v13.522l9.108-6.761Z"/></svg>
						</button>
					</div>
				</div>
			</div>

			<div class="toc-header">
				<div class="toc-header-title">
					<h2>Conversations</h2>
				</div>
				<p>
					Featuring transcripts from ongoing conversations with individual makers about their particular creative pursuits, and how a definition of craft acts in service of or in opposition to their practice.
				</p>
			</div>

			<div class="toc-header">
				<div class="toc-header-title">
					<h2>Participatory Invitations</h2>
				</div>
				<p>
					A series of participatory invitations generated from individual conversation, each one an open invitation to the public to participate in varied manners of making.
				</p>
			</div>

			<div class="toc-header">
				<div class="toc-header-title">
					<h2>Extended Notes</h2>
				</div>
				<p>
					An extension of each conversation, these  supplementary notes encapsulate each maker’s definition of craft and the varied content that inspires their individual creative pursuits.
				</p>
			</div>
			
			<!-- CONTENT -->

			<!-- Georgia Cloepfil -->

			<div class="toc-name" style="--primary: #5F82FF;">
				<h3>Georgia Cloepfil</h3>
			</div>

			<a href="#" class="toc-link" style="--primary: #5F82FF;" data-group="4">
				<div class="toc-link-title">
					<h4>Craft as Channeling Voice</h4>
				</div>

				<div class="toc-link-content toc-link-quote">
					<p class="toc-link-quote-text">
						The words are never going to be the same shape as the idea. But that's the whole adventure and ambition of writing. Without that, I might stop.
					</p>
					<p class="toc-link-quote-date">
						20 NOVEMBER 2023 • 08:00pm
					</p>
				</div>
			</a>

			<a href="#" class="toc-link" style="--primary: #5F82FF;" data-group="4">
				<div class="toc-link-title">
					<h4>A Workbook for New Beginnings</h4>
				</div>

				<div class="toc-link-content toc-link-img">
					<img src="https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1xw:0.74975xh;center,top&resize=1200:*">
				</div>
			</a>

			<a href="#" class="toc-link" style="--primary: #5F82FF;" data-group="4">
				<div class="toc-link-title">
					<h4>A Workbook for New Beginnings</h4>
				</div>

				<div class="toc-link-content toc-link-notes">
					<div class="text-link-notes-quote">
						<p class="text-link-notes-quote-text">
							But I cannot stand all day in the sun with my eyes on the ball; I cannot feel the flight of the ball through my body and think only of  the ball. I shall be a clinger to the outsides of . . .
						</p>
						<p class="text-link-notes-quote-credit">
							VIRGINIA WOOLF, <em>THE WAVES</em>
						</p>
					</div>
					<div class="text-link-notes-def">
						<p class="text-link-notes-def-term">
							CRAFT/KRAFT/: NOUN
						</p>
						<p class="text-link-notes-def-text">
							Careful attention to the sound and the balance of a sentence.
						</p>
					</div>
				</div>
			</a>

			<!-- Georgia Cloepfil -->

			<div class="toc-name" style="--primary: #28C065;">
				<h3>Georgia Cloepfil</h3>
			</div>

			<a href="#" class="toc-link" style="--primary: #28C065;" data-group="3">
				<div class="toc-link-title">
					<h4>Craft as Channeling Voice</h4>
				</div>

				<div class="toc-link-content toc-link-quote">
					<p class="toc-link-quote-text">
						The words are never going to be the same shape as the idea. But that's the whole adventure and ambition of writing. Without that, I might stop.
					</p>
					<p class="toc-link-quote-date">
						20 NOVEMBER 2023 • 08:00pm
					</p>
				</div>
			</a>

			<a href="#" class="toc-link" style="--primary: #28C065;" data-group="3">
				<div class="toc-link-title">
					<h4>A Workbook for New Beginnings</h4>
				</div>

				<div class="toc-link-content toc-link-img">
					<img src="https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1xw:0.74975xh;center,top&resize=1200:*">
				</div>
			</a>

			<a href="#" class="toc-link" style="--primary: #28C065;" data-group="3">
				<div class="toc-link-title">
					<h4>A Workbook for New Beginnings</h4>
				</div>

				<div class="toc-link-content toc-link-notes">
					<div class="text-link-notes-quote">
						<p class="text-link-notes-quote-text">
							But I cannot stand all day in the sun with my eyes on the ball; I cannot feel the flight of the ball through my body and think only of  the ball. I shall be a clinger to the outsides of . . .
						</p>
						<p class="text-link-notes-quote-credit">
							VIRGINIA WOOLF, <em>THE WAVES</em>
						</p>
					</div>
					<div class="text-link-notes-def">
						<p class="text-link-notes-def-term">
							CRAFT/KRAFT/: NOUN
						</p>
						<p class="text-link-notes-def-text">
							Careful attention to the sound and the balance of a sentence.
						</p>
					</div>
				</div>
			</a>

			<!-- Georgia Cloepfil -->

			<div class="toc-name" style="--primary: #5FA1FF;">
				<h3>Georgia Cloepfil</h3>
			</div>

			<a href="#" class="toc-link" style="--primary: #5FA1FF;" data-group="2">
				<div class="toc-link-title">
					<h4>Craft as Channeling Voice</h4>
				</div>

				<div class="toc-link-content toc-link-quote">
					<p class="toc-link-quote-text">
						The words are never going to be the same shape as the idea. But that's the whole adventure and ambition of writing. Without that, I might stop.
					</p>
					<p class="toc-link-quote-date">
						20 NOVEMBER 2023 • 08:00pm
					</p>
				</div>
			</a>

			<a href="#" class="toc-link" style="--primary: #5FA1FF;" data-group="2">
				<div class="toc-link-title">
					<h4>A Workbook for New Beginnings</h4>
				</div>

				<div class="toc-link-content toc-link-img">
					<img src="https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1xw:0.74975xh;center,top&resize=1200:*">
				</div>
			</a>

			<a href="#" class="toc-link" style="--primary: #5FA1FF;" data-group="2">
				<div class="toc-link-title">
					<h4>A Workbook for New Beginnings</h4>
				</div>

				<div class="toc-link-content toc-link-notes">
					<div class="text-link-notes-quote">
						<p class="text-link-notes-quote-text">
							But I cannot stand all day in the sun with my eyes on the ball; I cannot feel the flight of the ball through my body and think only of  the ball. I shall be a clinger to the outsides of . . .
						</p>
						<p class="text-link-notes-quote-credit">
							VIRGINIA WOOLF, <em>THE WAVES</em>
						</p>
					</div>
					<div class="text-link-notes-def">
						<p class="text-link-notes-def-term">
							CRAFT/KRAFT/: NOUN
						</p>
						<p class="text-link-notes-def-text">
							Careful attention to the sound and the balance of a sentence.
						</p>
					</div>
				</div>
			</a>

			<!-- Georgia Cloepfil -->

			<div class="toc-name" style="--primary: #5F82FF;">
				<h3>Georgia Cloepfil</h3>
			</div>

			<a href="#" class="toc-link" style="--primary: #5F82FF;" data-group="1">
				<div class="toc-link-title">
					<h4>Craft as Channeling Voice</h4>
				</div>

				<div class="toc-link-content toc-link-quote">
					<p class="toc-link-quote-text">
						The words are never going to be the same shape as the idea. But that's the whole adventure and ambition of writing. Without that, I might stop.
					</p>
					<p class="toc-link-quote-date">
						20 NOVEMBER 2023 • 08:00pm
					</p>
				</div>
			</a>

			<a href="#" class="toc-link" style="--primary: #5F82FF;" data-group="1">
				<div class="toc-link-title">
					<h4>A Workbook for New Beginnings</h4>
				</div>

				<div class="toc-link-content toc-link-img">
					<img src="https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1xw:0.74975xh;center,top&resize=1200:*">
				</div>
			</a>

			<a href="#" class="toc-link" style="--primary: #5F82FF;" data-group="1">
				<div class="toc-link-title">
					<h4>A Workbook for New Beginnings</h4>
				</div>

				<div class="toc-link-content toc-link-notes">
					<div class="text-link-notes-quote">
						<p class="text-link-notes-quote-text">
							But I cannot stand all day in the sun with my eyes on the ball; I cannot feel the flight of the ball through my body and think only of  the ball. I shall be a clinger to the outsides of . . .
						</p>
						<p class="text-link-notes-quote-credit">
							VIRGINIA WOOLF, <em>THE WAVES</em>
						</p>
					</div>
					<div class="text-link-notes-def">
						<p class="text-link-notes-def-term">
							CRAFT/KRAFT/: NOUN
						</p>
						<p class="text-link-notes-def-text">
							Careful attention to the sound and the balance of a sentence.
						</p>
					</div>
				</div>
			</a>

		</main>
	`

	// Create file
	fs.writeFile(`index/index.html`, content, err => {
		if (err) {
			console.error(err);
		}
	});
}