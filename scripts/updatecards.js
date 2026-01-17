document.getElementById("filterToggle").addEventListener("click", () => {
			const menu = document.getElementById("filter-menu");
			menu.classList.toggle("open");
		});

		const filterMenu = document.getElementById("filter-menu");

		// Refilter projects on checkbox change
		filterMenu.addEventListener("change", applyFilters);

		function applyFilters() {
			const selected = Array.from(filterMenu.querySelectorAll("input:checked")).map(i => i.value);

			if (selected.length === 0) {
				projectCards.forEach(c => (c.style.display = "flex"));
				updateHiddenCards();
				return;
			}

			projects.forEach((p, i) => {
				const match = selected.every(sel => p.tags.includes(sel));
				projectCards[i].style.display = match ? "flex" : "none";
			});

			updateHiddenCards();
		}

		window.addEventListener("DOMContentLoaded", buildTagFilter);