class BaseNav extends HTMLElement{
    connectedCallback(){
        const htmlFile = "baseElements/navigation.html"
        fetch(htmlFile)
        .then(response => response.text())
        .then(html => {
        this.innerHTML = html;

        const navbarToggle = this.querySelector('.navbar-toggle');
        const navbarMenu = this.querySelector('.navbar-menu');

        navbarToggle.addEventListener('click', () => {
            navbarToggle.classList.toggle('active');
            navbarMenu.classList.toggle('active');
        });
      });
    }
}

class BaseFooter extends HTMLElement{
    connectedCallback(){
        const htmlFile = "baseElements/footer.html"
        fetch(htmlFile)
        .then(response => response.text())
        .then(html => {
        this.innerHTML = html;
      });
    }
}

customElements.define('base-nav', BaseNav)
customElements.define('base-footer', BaseFooter)