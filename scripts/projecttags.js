function buildTagFilter() {
    const menu = document.getElementById("filter-menu");

    const tagCount = {};
    projects.forEach(p => {p.tags.forEach(t => {tagCount[t] = (tagCount[t] || 0) + 1;});});

    menu.innerHTML = Object.keys(tagCount).sort().map(t => `
        <label>
            <input type="checkbox" value="${t}">
            ${t} (${tagCount[t]})
        </label>
    `).join("");
}