class BaseNav extends HTMLElement{
    connectedCallback(){
        const htmlFile = "baseElements/navigation.html"
        fetch(htmlFile)
        .then(response => response.text())
        .then(html => {
        this.innerHTML = html;

        const navbarToggle = this.querySelector('.navbar-toggle');
        const navbarMenu = this.querySelector('.navbar-menu');
        
        const isOnMobile = isMobile();

        let navScroll = 0;

        if(isOnMobile){
            navScroll = 20;
        } else{
            navScroll = 100;
        }

        navbarToggle.addEventListener('click', () => {
            navbarToggle.classList.toggle('active');
            navbarMenu.classList.toggle('active');
        });

        const navbar = document.querySelector(".navbar");

        window.addEventListener("scroll", () => {
            navbar.classList.toggle("solid", window.scrollY > navScroll);
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

function isMobile(){
    return /Android|iPhone/.test(navigator.userAgent);
}