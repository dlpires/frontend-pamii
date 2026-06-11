import './ListUsuarioPage.css'
import { createHeader } from '../../shared/Header.js'
import { logout } from '../../shared/util.js';
import { isAuthenticated } from '../../shared/auth.js';
import { api } from '../../shared/api.js';

const pageName = 'Usuário';

class ListUsuarioPage extends HTMLElement {
    connectedCallback() {
        if (!isAuthenticated()) {
            document.querySelector('ion-router').push('/login', 'root');
            return;
        }
        this.classList.add('ion-page');
        const cabecalho = createHeader(pageName);
        this.innerHTML = `
            ${cabecalho}
            <ion-content>
                <div class="list-usuario"></div>
            </ion-content>
        `;
        const logoutBtn = this.querySelector('#logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', logout);
        }

         // buscando os usuarios
        this.loadUsuarios();
    }

    async loadUsuarios() {
        try {
            const usuarios = await this.fetchUsuarios();
            this.renderUsuarios(usuarios);
        } catch (error) {
            console.error('Erro ao carregar usuários:', error);
            this.renderUsuarios([]);
        }
    }

    async fetchUsuarios() {
        return await api.get('/usuario');
    }

    renderUsuarios(usuarios) {
        const container = this.querySelector(".list-usuario");

        // SE USUARIO VAZIO, MOSTRAR MENSAGEM AO USUÁRIO
        if (usuarios.length === 0) {
            container.innerHTML = '<p> Nenhum usuario encontrado </p>'
            return;
        }
        
        const usuarioItems = usuarios.map(usuario => `
            <ion-item>
                <ion-label>
                <h2 style="display: flex; align-items: center; gap: 8px;">
                    <ion-icon
                    name="${usuario.perfil == 0 ? 'restaurant' : 'person'}"
                    color="${usuario.perfil == 0 ? 'primary' : 'secondary'}"
                    style="flex-shrink: 0;"
                    ></ion-icon>
                    <span>${usuario.nome}</span>
                </h2>
                <p>${usuario.usuario}</p>
                </ion-label>

                <ion-buttons slot="end">
                <ion-button fill="clear" class="btn-edit" data-id="${usuario.id}">
                    <ion-icon slot="icon-only" name="create-outline"></ion-icon>
                </ion-button>
                <ion-button fill="clear" color="danger" class="btn-delete" data-id="${usuario.id}">
                    <ion-icon slot="icon-only" name="trash-outline"></ion-icon>
                </ion-button>
                </ion-buttons>
            </ion-item>
            `).join('');
    
        container.innerHTML = `<ion-list>${usuarioItems}</ion-list>`;
    }
}

customElements.define('list-usuario-page', ListUsuarioPage);