fetch('data/projects.json')
	.then((response) => response.json())
	.then((projects) => {
		const projectContainer = document.querySelector(".project-list");
		const showFeaturedOnly =projectContainer.dataset.featured === "true";

		const visibleProjects = showFeaturedOnly ? projects.filter(project => project.featured) : projects;

		visibleProjects.forEach((p) => {
			const hasImage = p.images && p.images.length > 0;

			// Project card
			const card = document.createElement("div");
			card.className = "project-card";
			card.id = p.id;

			if (hasImage) {
				card.style.backgroundImage = `url('${p.images[0]}')`;
			}

			const cardTitle = document.createElement("p");
			cardTitle.textContent = p.title;
			card.appendChild(cardTitle);

			// Modal
			const modal = document.createElement("div");
			modal.id = `${p.id}-modal`;
			modal.className = "modal";

			const modalContent = document.createElement("div");
			modalContent.className = "modal-content";

			const closeBtn = document.createElement("span");
			closeBtn.className = "close";
			closeBtn.innerHTML = "&times;";

			const heading = document.createElement("h2");
			heading.textContent = p.title;

			const description = document.createElement("p");
			description.textContent = p.longDesc;

			const tagsList = document.createElement("ul");

			p.tags.forEach((tag) => {
				const li = document.createElement("li");
				li.textContent = tag;
				tagsList.appendChild(li);
			});

			modalContent.appendChild(closeBtn);
			modalContent.appendChild(heading);
			modalContent.appendChild(description);
			modalContent.appendChild(tagsList);

			// Project link
			if (p.link) {
				const linkWrapper = document.createElement("p");

				const link = document.createElement("a");
				link.href = p.link;
				link.target = "_blank";
				link.textContent = "→ View Project";

				linkWrapper.appendChild(link);
				modalContent.appendChild(linkWrapper);
			}

			// Project images
			if (p.images && p.images.length > 0) {
				const imagesContainer = document.createElement("div");
				imagesContainer.className = "modal-images";

				p.images.forEach((src) => {
					const img = document.createElement("img");
					img.src = src;
					img.alt = `${p.title} screenshot`;
					imagesContainer.appendChild(img);
				});

				modalContent.appendChild(imagesContainer);
			}

			modal.appendChild(modalContent);

			// Add elements to page
			projectContainer.appendChild(card);
			projectContainer.appendChild(modal);

			// Open modal
			card.addEventListener("click", () => {
				modal.style.display = "block";
			});

			// Close modal
			closeBtn.addEventListener("click", () => {
				modal.style.display = "none";
			});
		});

		const projectCards = document.querySelectorAll(".project-card");

		// Close modal when clicking outside content
		window.addEventListener("click", (event) => {
			document.querySelectorAll(".modal").forEach((modal) => {
				if (event.target === modal) {
					modal.style.display = "none";
				}
			});
		});

		if (!showFeaturedOnly) {
			buildTagFilter(visibleProjects);
			setupFilters(visibleProjects, projectCards);
		}
	});