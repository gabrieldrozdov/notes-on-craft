const fs = require('fs');

// Get JSON
const jsonData = require('./data.json');
const jsonLibrary = require('./library.json');

function generatePrimaryIndex() {
	let blocks = '';
	let categories = [];

	for (let i=0; i<Object.keys(jsonData).length; i++) {
		let entry = jsonData[i];
		if (entry['generate-subpages'] != 1) {
			continue
		}

		for (let category of entry['categories'].split(',')) {
			let formattedCategory = category.toLowerCase().trim();
			if (!categories.includes(formattedCategory) && category.length > 0) {
				categories.push(formattedCategory);
			}
		}

		blocks += `
			<div class="index-name" style="--primary: ${entry['color']};" data-group="${entry['folder']}" data-categories="${entry['categories']}">
				<h3>${entry['fullname']}</h3>
			</div>
			
			<a href="/conversations/${entry['folder']}/" class="index-link" style="--primary: ${entry['color']};" data-group="${entry['folder']}" data-categories="${entry['categories']}">
				<div class="index-link-title">
					<h4>${entry['interview-title']}</h4>
				</div>

				<div class="index-link-content index-link-quote">
					<p class="index-link-quote-text">
						${entry['interview-quote']}
					</p>
					<p class="index-link-quote-date">
						${entry['date']}
					</p>
				</div>
			</a>

			<a href="/participatory-invitations/${entry['folder']}/" class="index-link" style="--primary: ${entry['color']};" data-group="${entry['folder']}" data-categories="${entry['categories']}">
				<div class="index-link-title">
					<h4>${entry['invitation-title']}</h4>
				</div>

				<div class="index-link-content index-link-img">
					<img src="/assets/participatory-invitations/${entry['invitation-img']}">
				</div>
			</a>

			<a href="/extended-notes/${entry['folder']}/" class="index-link" style="--primary: ${entry['color']};" data-group="${entry['folder']}" data-categories="${entry['categories']}">
				<div class="index-link-title">
					<h4>${entry['note-headline']}</h4>
				</div>

				<div class="index-link-content index-link-notes">
					<div class="index-link-notes-quote">
						<p class="index-link-notes-quote-text">
							${entry['note-quote']}
						</p>
						<p class="index-link-notes-quote-credit">
							${entry['note-quote-credit']}
						</p>
					</div>
					<div class="index-link-notes-def">
						<p class="index-link-notes-def-term">
							${entry['note-word']}
						</p>
						<p class="index-link-notes-def-text">
							${entry['note-def']}
						</p>
					</div>
				</div>
			</a>
		`;
	}

	let categoriesTemp = '';
	for (let category of categories) {
		categoriesTemp += `
			<div class="nav-filter" data-filter="${category}" onclick="toggleFilter('${category}')">${category}</div>
		`;
	}

	let content = `
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Notes on Craft | Primary Index</title>
			<link rel="icon" type="png" href="/assets/ui/Notes-on-Craft_Favicon.png">
			<link rel="stylesheet" href="/style.css">
		</head>
		<body>
		
			<a class="marquee" href="/"></a>
			
			<nav class="nav">
				<h1 class="nav-logo"><a href="/">Notes on Craft</a></h1>
				<div class="nav-links">
					<div class="nav-filter-toggle" onclick="toggleFilters()">
						<span>Filter</span>
						<svg viewBox="0 0 24 24"><path d="m12,18.666L2.104,5.334h19.792l-9.896,13.331Z"/></svg>
					</div>
					<a href="/primary-index/" class="nav-link" data-active="1">Primary Index</a>
					<a href="/makers/" class="nav-link">Makers</a>
					<a href="/library/" class="nav-link">Library</a>
					<a href="/about/" class="nav-link">About</a>
				</div>
			</nav>
		
			<div class="nav-filters" data-active="0">
				<h2 class="nav-filters-heading">Selected Medium</h2>
				<div class="nav-filters-list">
					${categoriesTemp}
					<div class="nav-filter-clear" onclick="clearFilters();">X</div>
				</div>
			</div>
		
			<main class="index">
		
				<!-- CATEGORIES -->
		
				<div class="index-header">
					<div class="index-header-title">
						<h2>Category</h2>
						<div class="index-header-controls">
							<button onclick="indexShuffle()">
								<svg viewBox="0 0 24 24"><path d="m4.811,10.008c.83-3.333,3.614-5.665,7.492-5.665,1.75,0,3.239.593,4.597,1.614l1.047-1.35c-1.489-1.284-3.485-2.009-5.628-2.009-4.805,0-8.322,3.02-9.197,7.41H0l3.812,6.652,3.779-6.652h-2.78Z"/><path d="m20.221,7.044l-3.796,6.653h2.954c-.749,3.483-3.537,5.944-7.552,5.944-1.751,0-3.239-.593-4.597-1.614l-1.047,1.35c1.489,1.284,3.485,2.009,5.628,2.009h.016c4.901,0,8.468-3.146,9.254-7.69h2.917l-3.779-6.653Z"/></svg>
							</button>
							<button onclick="indexScrollLeft()" class="index-header-controls-arr">
								<svg viewBox="0 0 24 24"><path d="m6.446,12l9.108-6.761v13.522l-9.108-6.761Z"/></svg>
							</button>
							<button onclick="indexScrollRight()" class="index-header-controls-arr">
								<svg viewBox="0 0 24 24"><path d="m17.554,12l-9.108-6.761v13.522l9.108-6.761Z"/></svg>
							</button>
						</div>
					</div>
				</div>
		
				<div class="index-header">
					<div class="index-header-title">
						<h2>Conversations</h2>
					</div>
					<p>
						Featuring transcripts from ongoing conversations with individual makers about their particular creative pursuits, and how a definition of craft acts in service of or in opposition to their practice.
					</p>
				</div>
		
				<div class="index-header">
					<div class="index-header-title">
						<h2>Participatory Invitations</h2>
					</div>
					<p>
						A series of participatory invitations generated from individual conversation, each one an open invitation to the public to participate in varied manners of making.
					</p>
				</div>
		
				<div class="index-header">
					<div class="index-header-title">
						<h2>Extended Notes</h2>
					</div>
					<p>
						An extension of each conversation, these  supplementary notes encapsulate each maker’s definition of craft and the varied content that inspires their individual creative pursuits.
					</p>
				</div>
				
				<!-- CONTENT -->

				${blocks}
		
			</main>
		
			<script src="primary-index.js"></script>
			<script src="/marquee.js"></script>
		</body>
		</html>
	`

	// Create file
	fs.writeFile(`primary-index/index.html`, content, err => {
		if (err) {
			console.error(err);
		}
	});
}

function generateMakers() {
	let makers = '';
	let categories = [];

	for (let i=0; i<Object.keys(jsonData).length; i++) {
		let entry = jsonData[i];

		if (entry['generate-bio'] != 1) {
			continue
		}

		for (let category of entry['categories'].split(',')) {
			let formattedCategory = category.toLowerCase().trim();
			if (!categories.includes(formattedCategory) && category.length > 0) {
				categories.push(formattedCategory);
			}
		}

		let instagram = '';
		let website = '';
		if (entry['instagram'].length > 0) {
			instagram = `<a href="https://www.instagram.com/${entry['instagram']}" target="_blank">@${entry['instagram']}</a>`;
		}
		if (entry['website'].length > 0) {
			website = `<a href="${entry['website']}" target="_blank">Website</a>`;
		}

		let links = '';
		if (entry['generate-subpages'] == 1) {
			links = `
				<div class="maker-links">
					<a href="/conversations/${entry['folder']}/">${entry['interview-title']}</a>
					<a href="/participatory-invitations/${entry['folder']}/">${entry['invitation-title']}</a>
					<a href="/extended-notes/${entry['folder']}/">${entry['note-headline']}</a>
				</div>
			`;
		}

		let makerImg = `
			<div class="maker-img">
				<img src="/assets/bios/regular/${entry['bio-photo']}" class="maker-img-normal">
			</div>
		`;
		if (entry['generate-subpages'] == 1) {
			makerImg = `
				<a class="maker-img-link" href="/conversations/${entry['folder']}/">
					<img src="/assets/bios/regular/${entry['bio-photo']}" class="maker-img-normal">
					<img src="/assets/bios/hover/${entry['bio-photo']}" class="maker-img-hover">
				</a>
			`;
		}
		makers += `
			<div class="maker" data-categories="${entry['categories']}" id="${entry['folder']}">
			${makerImg}

			<div class="maker-info">
				<div class="maker-info-left">
					<h2>${entry['fullname']} <span>${entry['pronouns']}</span></h2>
					<p>${entry['occupations']}</p>
					<p>${entry['location']}</p>
				</div>
				<div class="maker-info-right">
					${website}
					${instagram}
				</div>
			</div>

			<div class="maker-bio">
				${entry['bio']}
			</div>

			${links}
		</div>
		`;
	}

	let categoriesTemp = '';
	for (let category of categories) {
		categoriesTemp += `
			<div class="nav-filter" data-filter="${category}" onclick="toggleFilter('${category}')">${category}</div>
		`;
	}

	let bios = '';
	for (let i=0; i<Object.keys(jsonData).length; i++) {
		let entry = jsonData[i];
		if (entry['generate-bio'] != 1) {
			break
		}

		bios += `
			<div class="index-name" style="--primary: ${entry['color']};" data-group="${entry['folder']}" data-categories="${entry['categories']}">
				<h3>${entry['fullname']}</h3>
			</div>
			
			<a href="/conversations/${entry['folder']}/" class="index-link" style="--primary: ${entry['color']};" data-group="${entry['folder']}" data-categories="${entry['categories']}">
				<div class="index-link-title">
					<h4>${entry['interview-title']}</h4>
				</div>

				<div class="index-link-content index-link-quote">
					<p class="index-link-quote-text">
						${entry['interview-quote']}
					</p>
					<p class="index-link-quote-date">
						${entry['date']}
					</p>
				</div>
			</a>

			<a href="/participatory-invitations/${entry['folder']}/" class="index-link" style="--primary: ${entry['color']};" data-group="${entry['folder']}" data-categories="${entry['categories']}">
				<div class="index-link-title">
					<h4>${entry['invitation-title']}</h4>
				</div>

				<div class="index-link-content index-link-img">
					<img src="/assets/participatory-invitations/${entry['invitation-img']}">
				</div>
			</a>

			<a href="/extended-notes/${entry['folder']}/" class="index-link" style="--primary: ${entry['color']};" data-group="${entry['folder']}" data-categories="${entry['categories']}">
				<div class="index-link-title">
					<h4>${entry['note-headline']}</h4>
				</div>

				<div class="index-link-content index-link-notes">
					<div class="index-link-notes-quote">
						<p class="index-link-notes-quote-text">
							${entry['note-quote']}
						</p>
						<p class="index-link-notes-quote-credit">
							${entry['note-quote-credit']}
						</p>
					</div>
					<div class="index-link-notes-def">
						<p class="index-link-notes-def-term">
							${entry['note-word']}
						</p>
						<p class="index-link-notes-def-text">
							${entry['note-def']}
						</p>
					</div>
				</div>
			</a>
		`;
	}

	let content = `
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Notes on Craft | Makers</title>
			<link rel="icon" type="png" href="/assets/ui/Notes-on-Craft_Favicon.png">
			<link rel="stylesheet" href="/style.css">
		</head>
		<body>
		
			<a class="marquee" href="/"></a>
			
			<nav class="nav">
				<h1 class="nav-logo"><a href="/">Notes on Craft</a></h1>
				<div class="nav-links">
					<div class="nav-filter-toggle" onclick="toggleFilters()">
						<span>Filter</span>
						<svg viewBox="0 0 24 24"><path d="m12,18.666L2.104,5.334h19.792l-9.896,13.331Z"/></svg>
					</div>
					<a href="/primary-index/" class="nav-link">Primary Index</a>
					<a href="/makers/" class="nav-link" data-active="1">Makers</a>
					<a href="/library/" class="nav-link">Library</a>
					<a href="/about/" class="nav-link">About</a>
				</div>
			</nav>
		
			<div class="nav-filters" data-active="0">
				<h2 class="nav-filters-heading">Selected Medium</h2>
				<div class="nav-filters-list">
					${categoriesTemp}
					<div class="nav-filter-clear" onclick="clearFilters();">X</div>
				</div>
			</div>
		
			<main class="makers">
				${makers}
			</main>
		
			<script src="makers.js"></script>
			<script src="/marquee.js"></script>
		</body>
		</html>
	`

	// Create file
	fs.writeFile(`makers/index.html`, content, err => {
		if (err) {
			console.error(err);
		}
	});
}

function generateLibrary() {
	let libraryItems = '';
	let categories = [];
	for (let i=0; i<Object.keys(jsonLibrary).length; i++) {
		let entry = jsonLibrary[i];

		for (let category of entry['categories'].split(',')) {
			let formattedCategory = category.toLowerCase().trim();
			if (!categories.includes(formattedCategory) && category.length > 0) {
				categories.push(formattedCategory);
			}
		}

		let itemLink = '';
		let itemPDF = '';
		if (entry['link'].length > 0) {
			itemLink = `<a href="${entry['link']}" target="_blank">Link</a>`;
		}
		if (entry['pdf'].length > 0) {
			itemPDF = `<a href="/assets/pdfs/${entry['pdf']}" target="_blank">PDF Download</a>`;
		}

		libraryItems += `
			<div class="library-item" data-categories="${entry['categories']}" onclick="focusLibraryItem(this)" data-title="${entry['title']}" data-lastname="${entry['lastname']}" data-firstname="${entry['firstname']}" data-source="${entry['source']}" data-year="${entry['year']}">
				<div class="library-item-info">
					<div>${entry['title']}</div>
					<div>${entry['lastname']}</div>
					<div>${entry['firstname']}</div>
					<div>${entry['source']}</div>
					<div>${entry['year']}</div>
				</div>
				<div class="library-item-focus">
					<div class="library-item-links">
						<span>${entry['type']}</span>
						${itemLink}
						${itemPDF}
					</div>
					<div class="library-item-desc">
						${entry['desc']}
					</div>
				</div>
			</div>
		`;
	}

	let categoriesTemp = '';
	for (let category of categories) {
		categoriesTemp += `
			<div class="nav-filter" data-filter="${category}" onclick="toggleFilter('${category}')">${category}</div>
		`;
	}

	let content = `
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Notes on Craft | Library</title>
			<link rel="icon" type="png" href="/assets/ui/Notes-on-Craft_Favicon.png">
			<link rel="stylesheet" href="/style.css">
		</head>
		<body>
		
			<a class="marquee" href="/"></a>
			
			<nav class="nav">
				<h1 class="nav-logo"><a href="/">Notes on Craft</a></h1>
				<div class="nav-links">
					<div class="nav-filter-toggle" onclick="toggleFilters()">
						<span>Filter</span>
						<svg viewBox="0 0 24 24"><path d="m12,18.666L2.104,5.334h19.792l-9.896,13.331Z"/></svg>
					</div>
					<a href="/primary-index/" class="nav-link">Primary Index</a>
					<a href="/makers/" class="nav-link">Makers</a>
					<a href="/library/" class="nav-link" data-active="1">Library</a>
					<a href="/about/" class="nav-link">About</a>
				</div>
			</nav>
		
			<div class="nav-filters" data-active="0">
				<h2 class="nav-filters-heading">Selected Medium</h2>
				<div class="nav-filters-list">
					${categoriesTemp}
					<div class="nav-filter-clear" onclick="clearFilters();">X</div>
				</div>
			</div>
		
			<main class="library-container">
				<div class="library">
					<div class="library-nav">
						<div class="library-nav-col" data-active="1" data-sort="title" onclick="sortLibrary('title');"><span>Title</span> <svg viewBox="0 0 24 24"><path d="m12,18.666L2.104,5.334h19.792l-9.896,13.331Z"/></svg></div>
						<div class="library-nav-col" data-sort="lastname" onclick="sortLibrary('lastname');"><span>Author Last Name</span> <svg viewBox="0 0 24 24"><path d="m12,18.666L2.104,5.334h19.792l-9.896,13.331Z"/></svg></div>
						<div class="library-nav-col" data-sort="firstname" onclick="sortLibrary('firstname');"><span>Author First Name</span> <svg viewBox="0 0 24 24"><path d="m12,18.666L2.104,5.334h19.792l-9.896,13.331Z"/></svg></div>
						<div class="library-nav-col" data-sort="source" onclick="sortLibrary('source');"><span>Source</span> <svg viewBox="0 0 24 24"><path d="m12,18.666L2.104,5.334h19.792l-9.896,13.331Z"/></svg></div>
						<div class="library-nav-col" data-sort="year" onclick="sortLibrary('year');"><span>Year</span> <svg viewBox="0 0 24 24"><path d="m12,18.666L2.104,5.334h19.792l-9.896,13.331Z"/></svg></div>
					</div>
		
					<div class="library-content">
						${libraryItems}
					</div>
				</div>
			</main>
		
			<script src="library.js"></script>
			<script src="/marquee.js"></script>
		</body>
		</html>
	`

	// Create file
	fs.writeFile(`library/index.html`, content, err => {
		if (err) {
			console.error(err);
		}
	});
}

function generateSubpages() {
	for (let i=0; i<Object.keys(jsonData).length; i++) {
		let entry = jsonData[i];

		if (entry['generate-subpages'] != 1) {
			continue
		}
		


		// CONVERSATIONS
		const transcript = fs.readFileSync(`transcripts/${entry['folder']}.html`);
		conversationContent = `
			<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Notes on Craft | Conversations | ${entry['fullname']}</title>
				<link rel="icon" type="png" href="/assets/ui/Notes-on-Craft_Favicon.png">
				<link rel="stylesheet" href="/style.css">
			</head>
			<body>
			
				<a class="marquee" href="/"></a>
				
				<nav class="nav">
					<h1 class="nav-logo"><a href="/">Notes on Craft</a></h1>
					<div class="nav-links">
						<a href="/primary-index/" class="nav-link">Primary Index</a>
						<a href="/makers/" class="nav-link">Makers</a>
						<a href="/library/" class="nav-link">Library</a>
						<a href="/about/" class="nav-link">About</a>
					</div>
				</nav>
			
				<main class="subpage">
					<div class="subpage-content">
						<header class="conversation-header">
							<div class="conversation-header-lead">
								<span>${entry['interview-subhead']}</span>
								<span>${entry['date']}</span>
							</div>
							<div class="conversation-header-info">
								${entry['pronouns']}<br>
								${entry['occupations']}<br>
								${entry['location']}
							</div>
							<p class="conversation-header-bio">
								${entry['bio']}
							</p>
						</header>
			
						<h2 class="conversation-body-heading">${entry['interview-title']}</h2>
			
						<div class="conversation-body">
							<button class="conversation-body-listen" onclick="listenToRecording('${entry['soundbite']}')">
								<div class="conversation-body-listen-text">Listen</div>
								<div class="conversation-body-listen-symbol">
									<div></div>
								</div>
							</button>
			
							${transcript}
			
						</div>
					</div>
			
					<div class="subpage-sidebar"></div>
				</main>
			
				<script src="/conversations/conversations.js"></script>
				<script src="/marquee.js"></script>
				<script src="/sidebar.js"></script>
			</body>
			</html>
		`;

		if (!fs.existsSync(`conversations/${entry['folder']}`)) {
			fs.mkdirSync(`conversations/${entry['folder']}`);
		}

		// Create file
		fs.writeFile(`conversations/${entry['folder']}/index.html`, conversationContent, err => {
			if (err) {
				console.error(err);
			}
		});



		// PARTICIPATORY INVITATIONS
		let toolkit = '';
		for (let line of entry['invitation-tools']) {
			toolkit += `
				<div>
					<svg viewBox="0 0 24 24"><path d="m17.554,12l-9.108-6.761v13.522l9.108-6.761Z"/></svg>
					<span>${line}</span>
				</div>
			`
		}


		invitationContent = `
			<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Notes on Craft | Participatory Invitations | ${entry['fullname']}</title>
				<link rel="icon" type="png" href="/assets/ui/Notes-on-Craft_Favicon.png">
				<link rel="stylesheet" href="/style.css">
			</head>
			<body>

				<a class="marquee" href="/"></a>
				
				<nav class="nav">
					<h1 class="nav-logo"><a href="/">Notes on Craft</a></h1>
					<div class="nav-links">
						<a href="/primary-index/" class="nav-link">Primary Index</a>
						<a href="/makers/" class="nav-link">Makers</a>
						<a href="/library/" class="nav-link">Library</a>
						<a href="/about/" class="nav-link">About</a>
					</div>
				</nav>

				<main class="subpage">
					<div class="subpage-content">
						<header class="invitations-header">
							<h2 class="invitations-header-title">${entry['invitation-title']}</h2>
							<p class="invitations-header-info">
								${entry['invitation-mediums']}
							</p>
						</header>

						<div class="invitations-body">
							<div class="invitations-body-col">
								<div class="invitations-toolkit">
									<h3 class="invitations-toolkit-title">Toolkit</h3>
									<div class="invitations-toolkit-list">
										${toolkit}
									</div>
									<img src="/assets/participatory-invitations/
									${entry['invitation-img2']}" class="invitations-toolkit-img">
								</div>

								<div class="invitations-body-section">
									<h3>Input</h3>
									${entry['invitation-input']}
								</div>
							</div>

							<div class="invitations-body-col">
								<div class="invitations-body-section">
									<h3 class="invitations-body-section-title">Action</h3>
									${entry['invitation-action']}
								</div>

								<div class="invitations-body-section">
									<h3 class="invitations-body-section-title">Output</h3>
									${entry['invitation-output']}
								</div>
							</div>


						</div>
					</div>

					<div class="subpage-sidebar">
						<div class="subpage-sidebar-section" data-section="maker" data-active="1">
							<div class="subpage-sidebar-heading" style="--primary: #5F82FF;" onclick="toggleSidebarSection('maker')">
								<h3>Georgia Cloepfil</h3>
								<svg viewBox="0 0 24 24"><path d="m12,18.666L2.104,5.334h19.792l-9.896,13.331Z"/></svg>
							</div><a href="/conversations/georgia-cloepfil/" class="subpage-sidebar-link" style="--primary: #5F82FF;" data-categories="ceramics, GLASS">
								<div class="subpage-sidebar-link-title">
									<h4>Test 2</h4>
								</div>
					
								<div class="subpage-sidebar-link-content subpage-sidebar-link-quote">
									<p class="subpage-sidebar-link-quote-text">
										The words are never going to be the same shape as the idea. But that's the whole adventure and ambition of writing. Without that, I might stop.
									</p>
									<p class="subpage-sidebar-link-quote-date">
										30 October 2023
									</p>
								</div>
							</a>
					
							<a href="/participatory-invitations/georgia-cloepfil/" class="subpage-sidebar-link" style="--primary: #5F82FF;" data-categories="ceramics, GLASS">
								<div class="subpage-sidebar-link-title">
									<h4>Test 2</h4>
								</div>
					
								<div class="subpage-sidebar-link-content subpage-sidebar-link-img">
									<img src="https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1xw:0.74975xh;center,top&resize=1200:*">
								</div>
							</a>
					
							<a href="/participatory-invitations/georgia-cloepfil/" class="subpage-sidebar-link" style="--primary: #5F82FF;" data-categories="ceramics, GLASS">
								<div class="subpage-sidebar-link-title">
									<h4>Test 2</h4>
								</div>
					
								<div class="subpage-sidebar-link-content subpage-sidebar-link-notes">
									<div class="subpage-sidebar-link-notes-quote">
										<p class="subpage-sidebar-link-notes-quote-text">
											But I cannot stand all day in the sun with my eyes on the ball; I cannot feel the flight of the ball through my body and think only of the ball. I shall be a clinger to the outsides of words all my life. Yet I could not live with him and suffer his stupidity. He will coarsen and snore. He will marry and there will be scenes of tenderness at breakfast. But now he is young. Not a thread, not a sheet of paper lies between him and the sun, between him and the rain, between him and the moon as he lies naked, tumbled, hot, on his bed. Now as they drive along the high road in their brake his face is mottled red and yellow. He will throw off his coat and stand with his legs apart, with his hands ready, watching the wicket. And he will pray, “Lord let us win”; he will think of one thing only, that they should win.
										</p>
										<p class="subpage-sidebar-link-notes-quote-credit">
											Virginia Woolf, <em>The Waves</em>
										</p>
									</div>
									<div class="subpage-sidebar-link-notes-def">
										<p class="subpage-sidebar-link-notes-def-term">
											Craft/Kraft/: Noun
										</p>
										<p class="subpage-sidebar-link-notes-def-text">
											Careful attention to the sound and the balance of a sentence.
										</p>
									</div>
								</div>
							</a>
						</div>

						<div class="subpage-sidebar-section" data-section="related" data-active="1">
							<div class="subpage-sidebar-heading" style="--primary: var(--green);" onclick="toggleSidebarSection('related')">
								<h3>Related Readings</h3>
								<svg viewBox="0 0 24 24"><path d="m12,18.666L2.104,5.334h19.792l-9.896,13.331Z"/></svg>
							</div><a href="/conversations/georgia-cloepfil/" class="subpage-sidebar-link" style="--primary: #5F82FF;" data-categories="ceramics, GLASS">
								<div class="subpage-sidebar-link-title">
									<h4>Test 2</h4>
								</div>
					
								<div class="subpage-sidebar-link-content subpage-sidebar-link-quote">
									<p class="subpage-sidebar-link-quote-text">
										The words are never going to be the same shape as the idea. But that's the whole adventure and ambition of writing. Without that, I might stop.
									</p>
									<p class="subpage-sidebar-link-quote-date">
										30 October 2023
									</p>
								</div>
							</a>
					
							<a href="/participatory-invitations/georgia-cloepfil/" class="subpage-sidebar-link" style="--primary: #5F82FF;" data-categories="ceramics, GLASS">
								<div class="subpage-sidebar-link-title">
									<h4>Test 2</h4>
								</div>
					
								<div class="subpage-sidebar-link-content subpage-sidebar-link-img">
									<img src="https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1xw:0.74975xh;center,top&resize=1200:*">
								</div>
							</a>
					
							<a href="/participatory-invitations/georgia-cloepfil/" class="subpage-sidebar-link" style="--primary: #5F82FF;" data-categories="ceramics, GLASS">
								<div class="subpage-sidebar-link-title">
									<h4>Test 2</h4>
								</div>
					
								<div class="subpage-sidebar-link-content subpage-sidebar-link-notes">
									<div class="subpage-sidebar-link-notes-quote">
										<p class="subpage-sidebar-link-notes-quote-text">
											But I cannot stand all day in the sun with my eyes on the ball; I cannot feel the flight of the ball through my body and think only of the ball. I shall be a clinger to the outsides of words all my life. Yet I could not live with him and suffer his stupidity. He will coarsen and snore. He will marry and there will be scenes of tenderness at breakfast. But now he is young. Not a thread, not a sheet of paper lies between him and the sun, between him and the rain, between him and the moon as he lies naked, tumbled, hot, on his bed. Now as they drive along the high road in their brake his face is mottled red and yellow. He will throw off his coat and stand with his legs apart, with his hands ready, watching the wicket. And he will pray, “Lord let us win”; he will think of one thing only, that they should win.
										</p>
										<p class="subpage-sidebar-link-notes-quote-credit">
											Virginia Woolf, <em>The Waves</em>
										</p>
									</div>
									<div class="subpage-sidebar-link-notes-def">
										<p class="subpage-sidebar-link-notes-def-term">
											Craft/Kraft/: Noun
										</p>
										<p class="subpage-sidebar-link-notes-def-text">
											Careful attention to the sound and the balance of a sentence.
										</p>
									</div>
								</div>
							</a>
						</div>
					</div>
				</main>

				<script src="/extended-notes/extended-notes.js"></script>
				<script src="/marquee.js"></script>
				<script src="/sidebar.js"></script>
			</body>
			</html>
		`;

		if (!fs.existsSync(`participatory-invitations/${entry['folder']}`)) {
			fs.mkdirSync(`participatory-invitations/${entry['folder']}`);
		}

		// Create file
		fs.writeFile(`participatory-invitations/${entry['folder']}/index.html`, invitationContent, err => {
			if (err) {
				console.error(err);
			}
		});



		// EXTENDED NOTES
		let quote = '';
		if (entry['note-quote2'].length > 0) {
			quote = `
				<div class="notes-body-quote">
					<p class="notes-body-quote-text">
						${entry['note-quote2']}
					</p>
					<p class="notes-body-quote-credit">
						${entry['note-quote2-credit']}
					</p>
				</div>
			`;
		}

		notesContent = `
			<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Notes on Craft | Extended Notes | ${entry['fullname']}</title>
				<link rel="icon" type="png" href="/assets/ui/Notes-on-Craft_Favicon.png">
				<link rel="stylesheet" href="/style.css">
			</head>
			<body>
			
				<a class="marquee" href="/"></a>
				
				<nav class="nav">
					<h1 class="nav-logo"><a href="/">Notes on Craft</a></h1>
					<div class="nav-links">
						<a href="/primary-index/" class="nav-link">Primary Index</a>
						<a href="/makers/" class="nav-link">Makers</a>
						<a href="/library/" class="nav-link">Library</a>
						<a href="/about/" class="nav-link">About</a>
					</div>
				</nav>
			
				<main class="subpage">
					<div class="subpage-content">
						<header class="notes-header">
							<div class="notes-header-left">
								<p class="notes-header-word">${entry['note-word']}</p>
								<p class="notes-header-def">${entry['note-def']}</p>
							</div>
							<p class="notes-header-title">
								${entry['note-headline']}
							</p>
						</header>
			
						<div class="notes-quote">
							<p class="notes-quote-text">
								${entry['note-quote']}
							</p>
							<p class="notes-quote-credit">
								${entry['note-quote-credit']}
							</p>
						</div>
			
						<div class="notes-body">
							<div class="notes-body-header">
								<h2 class="notes-body-header-title">Extended Notes</h2>
								<h2 class="notes-body-header-date">${entry['date']}</h2>
							</div>
			
							<div class="notes-body-content">
								<div class="notes-body-content-col">
			
									${quote}
			
									<div class="notes-body-section" data-active="1">
										<div class="notes-body-section-heading" onclick="toggleNotesSection(this.parentElement);">
											<h4>Read</h4>
											<svg viewBox="0 0 24 24"><path d="m12,18.666L2.104,5.334h19.792l-9.896,13.331Z"/></svg>
										</div>
										<div class="notes-body-section-content">
											${entry['note-read']}
										</div>
									</div>
			
								</div>
			
								<div class="notes-body-content-col">
			
									<div class="notes-body-section" data-active="1">
										<div class="notes-body-section-heading" onclick="toggleNotesSection(this.parentElement);">
											<h4>Watch</h4>
											<svg viewBox="0 0 24 24"><path d="m12,18.666L2.104,5.334h19.792l-9.896,13.331Z"/></svg>
										</div>
										<div class="notes-body-section-content">
											${entry['note-watch']}
										</div>
									</div>
			
									<div class="notes-body-section" data-active="1">
										<div class="notes-body-section-heading" onclick="toggleNotesSection(this.parentElement);">
											<h4>Listen</h4>
											<svg viewBox="0 0 24 24"><path d="m12,18.666L2.104,5.334h19.792l-9.896,13.331Z"/></svg>
										</div>
										<div class="notes-body-section-content">
											${entry['note-listen']}
										</div>
									</div>
			
									<div class="notes-body-section" data-active="1">
										<div class="notes-body-section-heading" onclick="toggleNotesSection(this.parentElement);">
											<h4>Explore</h4>
											<svg viewBox="0 0 24 24"><path d="m12,18.666L2.104,5.334h19.792l-9.896,13.331Z"/></svg>
										</div>
										<div class="notes-body-section-content">
											${entry['note-explore']}
										</div>
									</div>
			
								</div>
							</div>
						</div>
					</div>
			
					<div class="subpage-sidebar"></div>
				</main>
			
				<script src="/extended-notes/extended-notes.js"></script>
				<script src="/marquee.js"></script>
				<script src="/sidebar.js"></script>
			</body>
			</html>
		`;

		if (!fs.existsSync(`extended-notes/${entry['folder']}`)) {
			fs.mkdirSync(`extended-notes/${entry['folder']}`);
		}

		// Create file
		fs.writeFile(`extended-notes/${entry['folder']}/index.html`, notesContent, err => {
			if (err) {
				console.error(err);
			}
		});
	}
}

generatePrimaryIndex();
generateLibrary();
generateMakers();
generateSubpages();