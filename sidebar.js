// Open and close sidebar sections
function toggleSidebarSection(section) {
	const sectionElmnt = document.querySelector(`[data-section="${section}"]`);
	if (parseInt(sectionElmnt.dataset.active) == 1) {
		sectionElmnt.dataset.active = 0;
	} else {
		sectionElmnt.dataset.active = 1;
	}
}

// Generate sidebar
let data;
function generateSidebar(name) {
	fetch('/data.json')
		.then((response) => response.json())
		.then((json) => {
			data = json;
			generateSidebarContent(name);
		})
}

function generateSidebarContent(name) {
	let entry;
	for (let key of Object.keys(data)) {
		if (data[key]['folder'] == name) {
			entry = data[key];
			break
		}
	}

	let categories = [];
	for (let category of entry['categories'].split(',')) {
		categories.push(category.toLowerCase().trim());
	}

	// Generate related links
	let relatedLinks = [];
	for (let key of Object.keys(data)) {
		if (data[key] == entry || data[key]['generate-subpages'] != 1) {
			continue
		}

		let relatedCategories = [];
		for (let category of data[key]['categories'].split(',')) {
			relatedCategories.push(category.toLowerCase().trim());
		}

		for (let category of categories) {
			if (relatedCategories.includes(category)) {
				relatedLinks.push(data[key]);
				continue
			}
		}
	}

	let relatedLinksHTML = ``;
	for (let relatedLink of relatedLinks) {
		relatedLinksHTML += `
			<a href="/conversations/${relatedLink['folder']}/" class="subpage-sidebar-link" style="--primary: ${relatedLink['color']}; order:${Math.floor(Math.random()*1000+10)};" data-categories="${relatedLink['categories']}">
				<div class="subpage-sidebar-link-title">
					<h4>${relatedLink['interview-title']}</h4>
				</div>

				<div class="subpage-sidebar-link-content subpage-sidebar-link-quote">
					<p class="subpage-sidebar-link-quote-text">
						${relatedLink['interview-quote']}
					</p>
					<p class="subpage-sidebar-link-quote-date">
						${relatedLink['date']}
					</p>
				</div>
			</a>

			<a href="/participatory-invitations/${relatedLink['folder']}/" class="subpage-sidebar-link" style="--primary: ${relatedLink['color']}; order:${Math.floor(Math.random()*1000+10)};" data-categories="${relatedLink['categories']}">
				<div class="subpage-sidebar-link-title">
					<h4>${relatedLink['invitation-title']}</h4>
				</div>

				<div class="subpage-sidebar-link-content subpage-sidebar-link-img">
					<img src="/assets/participatory-invitations/${relatedLink['invitation-img']}">
				</div>
			</a>

			<a href="/extended-notes/${relatedLink['folder']}/" class="subpage-sidebar-link" style="--primary: ${relatedLink['color']}; order:${Math.floor(Math.random()*1000+10)};" data-categories="${relatedLink['categories']}">
				<div class="subpage-sidebar-link-title">
					<h4>${relatedLink['note-headline']}</h4>
				</div>

				<div class="subpage-sidebar-link-content subpage-sidebar-link-notes">
					<div class="subpage-sidebar-link-notes-quote">
						<p class="subpage-sidebar-link-notes-quote-text">
							${relatedLink['note-quote']}
						</p>
						<p class="subpage-sidebar-link-notes-quote-credit">
							${relatedLink['note-quote-credit']}
						</p>
					</div>
					<div class="subpage-sidebar-link-notes-def">
						<p class="subpage-sidebar-link-notes-def-term">
							${relatedLink['note-word']}
						</p>
						<p class="subpage-sidebar-link-notes-def-text">
							${relatedLink['note-def']}
						</p>
					</div>
				</div>
			</a>
		`
	}
	
	let content = `
		<div class="subpage-sidebar-section" data-section="maker" data-active="0">
			<div class="subpage-sidebar-heading" style="--primary: ${entry['color']};" onclick="toggleSidebarSection('maker')">
				<h3>${entry['fullname']}</h3>
				<svg viewBox="0 0 24 24"><path d="m12,18.666L2.104,5.334h19.792l-9.896,13.331Z"/></svg>
			</div>
			
			
			<a href="/conversations/${entry['folder']}/" class="subpage-sidebar-link" style="--primary: ${entry['color']};" data-categories="${entry['categories']}">
				<div class="subpage-sidebar-link-title">
					<h4>${entry['interview-title']}</h4>
				</div>

				<div class="subpage-sidebar-link-content subpage-sidebar-link-quote">
					<p class="subpage-sidebar-link-quote-text">
						${entry['interview-quote']}
					</p>
					<p class="subpage-sidebar-link-quote-date">
						${entry['date']}
					</p>
				</div>
			</a>

			<a href="/participatory-invitations/${entry['folder']}/" class="subpage-sidebar-link" style="--primary: ${entry['color']};" data-categories="${entry['categories']}">
				<div class="subpage-sidebar-link-title">
					<h4>${entry['invitation-title']}</h4>
				</div>

				<div class="subpage-sidebar-link-content subpage-sidebar-link-img">
					<img src="/assets/participatory-invitations/${entry['invitation-img']}">
				</div>
			</a>

			<a href="/extended-notes/${entry['folder']}/" class="subpage-sidebar-link" style="--primary: ${entry['color']};" data-categories="${entry['categories']}">
				<div class="subpage-sidebar-link-title">
					<h4>${entry['note-headline']}</h4>
				</div>

				<div class="subpage-sidebar-link-content subpage-sidebar-link-notes">
					<div class="subpage-sidebar-link-notes-quote">
						<p class="subpage-sidebar-link-notes-quote-text">
							${entry['note-quote']}
						</p>
						<p class="subpage-sidebar-link-notes-quote-credit">
							${entry['note-quote-credit']}
						</p>
					</div>
					<div class="subpage-sidebar-link-notes-def">
						<p class="subpage-sidebar-link-notes-def-term">
							${entry['note-word']}
						</p>
						<p class="subpage-sidebar-link-notes-def-text">
							${entry['note-def']}
						</p>
					</div>
				</div>
			</a>
		</div>

		<div class="subpage-sidebar-section" data-section="related" data-active="0">
			<div class="subpage-sidebar-heading" style="--primary: var(--green);" onclick="toggleSidebarSection('related')">
				<h3>Related Readings</h3>
				<svg viewBox="0 0 24 24"><path d="m12,18.666L2.104,5.334h19.792l-9.896,13.331Z"/></svg>
			</div>

			${relatedLinksHTML}
		</div>
	`;

	const sidebar = document.querySelector('.subpage-sidebar');
	sidebar.innerHTML = content;
	

	// Hide related links if nothing there
	if (relatedLinks.length == 0) {
		const heading = document.querySelectorAll('.subpage-sidebar-heading')[1];
		heading.style.display = 'none';		
	}
}

let url = window.location.href.split('/');
generateSidebar(url[url.length-2]);