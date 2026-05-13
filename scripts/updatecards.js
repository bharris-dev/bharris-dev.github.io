function setupFilters(projects, projectCards) {
    const filterToggle = document.getElementById("filterToggle");
    const filterMenu = document.getElementById("filter-menu");

    filterToggle.addEventListener("click", () => {
        filterMenu.classList.toggle("open");
    });

    filterMenu.addEventListener("change", applyFilters);

    function applyFilters() {
        const selected = Array.from(
            filterMenu.querySelectorAll("input:checked")
        ).map(i => i.value);

        if (selected.length === 0) {
            projectCards.forEach(card => {
                card.style.display = "";
            });
            return;
        }

        projects.forEach((project, i) => {
            const match = selected.every(tag =>
                project.filter_tags.includes(tag)
            );

            projectCards[i].style.display = match ? "" : "none";
        });
    }
}