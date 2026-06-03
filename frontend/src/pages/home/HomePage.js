import './HomePage.css'
import { createHeader } from '../../shared/Header.js'
import { logout } from '../../shared/util.js';
import { isAuthenticated } from '../../shared/auth.js';

const pageName = 'Home';

class HomePage extends HTMLElement {
    connectedCallback() {
        if (!isAuthenticated()) {
            document.querySelector('ion-router').push('/login', 'root');
            return;
        }
        this.classList.add('ion-page');
        const cabecalho = createHeader(pageName);
        this.innerHTML = `
            ${cabecalho}
        `;

        this.querySelector('#logout-btn')
        .addEventListener('click', logout);
    }
}

customElements.define('home-page', HomePage);