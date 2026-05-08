function setupFilters(projects, projectCards, updateHiddenCards) {
	const filterToggle = document.getElementById("filterToggle");
    const filterMenu = document.getElementById("filter-menu");

    filterToggle.addEventListener("click", () => {
        filterMenu.classList.toggle("open");
    });

    filterMenu.addEventListener("change", applyFilters);

    function applyFilters() {
        const selected = Array.from(filterMenu.querySelectorAll("input:checked")).map(i => i.value);

        if (selected.length === 0) {
            projectCards.forEach(c => (c.style.display = "flex"));
            updateHiddenCards();
            return;
        }

        projects.forEach((p, i) => {
            const match = selected.every(sel => p.filter_tags.includes(sel));
            projectCards[i].style.display = match ? "flex" : "none";
        });

        updateHiddenCards();
    }
}