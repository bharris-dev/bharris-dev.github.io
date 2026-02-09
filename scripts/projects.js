const projects = [
			{
				id: "roguelite",
				title: "Rougelite Game (WIP)",
				shortDesc: "Card-based casino shoot-em-up roguelite made in Godot Engine.",
				longDesc: `Tackle enemies both in the battlefield and casino in this wild casino shoot-em-up roguelite. Unlock and deploy gadgets to get an edge over the house, and new weapons to stay alive against the horde outside.`,
				tags: ["Game Development", "Godot (gdscript)", "Mechanics", "Physics"],
				link: "",
				images: ["images/roguelite/camera.png"]
			},
			{
				id: "league random champ selector",
				title: "League of Legends Random Champion Selector",
				shortDesc: "Selects a random League of Legends champion to play.",
				longDesc: `Coded using HTML, TailwindCSS, and JavaScript, champion data is accessed from Riot Games' Data Dragon Public API and applied to pick a random playable champion for your next match.`,
				tags: ["HTML", "TailwindCSS", "JavaScript", "API"],
				link: "./randomlolchamp",
				images: ["images/lolchamppicker/pick.png"]
			},
			{
				id: "educational game",
				title: "Educational Game (binary/hex/dec)",
				shortDesc: "Educational game to test binary/dec/hex conversion knowledge.",
				longDesc: `Coded in C# using the Unity Engine.`,
				tags: ["C#", "Unity"],
				link: "./uni-project-educational-game",
				images: [""]
			},
			{
				id: "game studio website",
				title: "Game Studio Website",
				shortDesc: "",
				longDesc: ``,
				tags: ["HTML", "CSS", "JavaScript"],
				link: "https://biggermenthanmost.github.io/",
				images: [""]
			},
		];

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
				<div class="project-card" id="${p.id}" style="${bgStyle}" onclick="openModal('${p.id}')">
					<p>${p.title}</p>
				</div>
				<div id="${p.id}-modal" class="modal">
					<div class="modal-content">
						<span class="close" onclick="closeModal('${p.id}')">&times;</span>
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

		// * Modal functions *
		function openModal(id) { document.getElementById(`${id}-modal`).style.display = "block"; }
		function closeModal(id) { document.getElementById(`${id}-modal`).style.display = "none"; }
		window.onclick = function(event) {
			document.querySelectorAll(".modal").forEach(modal => {
				if (event.target === modal){
					modal.style.display = "none";
				} 
			});
		};

		// Show/hide extra rows
		function updateHiddenCards() {
			const containerWidth = projectContainer.offsetWidth;
			const cardWidth = projectCards[0].offsetWidth + 16;
			const cardsPerRow = Math.floor(containerWidth / cardWidth);

			let hasExtraRows = false;

			projectCards.forEach((card, index) => {
				if (index >= cardsPerRow) {
					card.classList.add("hidden");
					hasExtraRows = true;
				} else {
					card.classList.remove("hidden");
				}
			});

			// Show/hide reveal button based on extra rows
			revealBtn.style.display = hasExtraRows ? "block" : "none";
		}


		updateHiddenCards();
		window.addEventListener("resize", updateHiddenCards);


		revealBtn.addEventListener("click", () => {
		const hiddenCards = Array.from(projectCards).filter(c => c.classList.contains("hidden"));

		if (hiddenCards.length > 0) {
			hiddenCards.forEach((card, i) => {
				setTimeout(() => card.classList.remove("hidden"), i * 100);
			});
			revealBtn.textContent = "Show Less Projects";
		} else {
			const extraCards = Array.from(projectCards).filter(c => !c.classList.contains("hidden") && !isFirstRow(c));
			extraCards.forEach((card, i) => {
				setTimeout(() => card.classList.add("hidden"), i * 100);
			});
			revealBtn.textContent = "Show More Projects";
		}
		});

		// Detect first row of project section
		function isFirstRow(card) {
			const containerWidth = projectContainer.offsetWidth;
			const cardWidth = card.offsetWidth + 16;
			const cardsPerRow = Math.floor(containerWidth / cardWidth);
			const index = Array.from(projectCards).indexOf(card);
			return index < cardsPerRow;
		}

		buildTagFilter();