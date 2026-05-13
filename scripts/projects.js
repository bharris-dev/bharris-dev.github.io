fetch('data/projects.json')
	.then((response) => response.json())
	.then((projects) => {
		const projectContainer = document.querySelector(".project-list");
		const revealBtn = document.getElementById("reveal-btn");

		// Create project cards
		projects.forEach(p => {
			const hasImage = p.images && p.images.length > 0;
			const bgStyle = hasImage ? `background-image: url('${p.images[0]}');` : "";
			
			const projectLinkHTML = p.link ? `<p><a href="${p.link}" target="_blank">&#8594; View Project</a></p>` : "";

			const projectImagesHTML = p.images 
				? `<div class="modal-images">
					${p.images.map(src => `<img src="${src}" alt="${p.title} screenshot">`).join("")}
				</div>`
				: "";

			const cardHTML = `
				<div class="project-card" id="${p.id}" style="${bgStyle}">
					<p>${p.title}</p>
				</div>
				<div id="${p.id}-modal" class="modal">
					<div class="modal-content">
						<span class="close">&times;</span>
						<h2>${p.title}</h2>
						<p>${p.longDesc}</p>
						<ul>${p.tags.map(t => `<li>${t}</li>`).join("")}</ul>
						${projectLinkHTML}
						${projectImagesHTML}
					</div>
				</div>
			`;
			projectContainer.insertAdjacentHTML("beforeend", cardHTML);
		});

		const projectCards = document.querySelectorAll(".project-card");

		// Open modal on card click
		projectCards.forEach(card => {
			card.addEventListener("click", () => {
				const modal = document.getElementById(`${card.id}-modal`);
				if (modal) modal.style.display = "block";
			});
		});

		// Close modal on X click
		document.querySelectorAll(".close").forEach(btn => {
			btn.addEventListener("click", (e) => {
				const modal = e.target.closest(".modal");
				if (modal) modal.style.display = "none";
			});
		});

		// * Modal functions *
		function openModal(id) { document.getElementById(`${id}-modal`).style.display = "block"; }
		function closeModal(id) { document.getElementById(`${id}-modal`).style.display = "none"; }
		window.addEventListener("click", (event) => {
			document.querySelectorAll(".modal").forEach(modal => {
				if (event.target === modal) {
					modal.style.display = "none";
				}
			});
		});

		buildTagFilter(projects);
		setupFilters(projects, projectCards);
});