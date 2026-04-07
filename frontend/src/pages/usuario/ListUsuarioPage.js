import './ListUsuarioPage.css'
import { createHeader } from '../../shared/Header.js'
import { logout } from '../../shared/util.js'; 

const pageName = 'Usuário';

class ListUsuarioPage extends HTMLElement {
    connectedCallback() {
        this.classList.add('ion-page');
        const cabecalho = createHeader(pageName);
        this.innerHTML = `
            ${cabecalho}
            <ion-content>
                <div class="list-usuario"></div>
            </ion-content>
        `;
        this.querySelector('#logout-btn')
        .addEventListener('click', logout);

         // buscando os usuarios
        const usuarios = this.fetchUsuarios() || [];
        
        // renderizando os usuarios no HTML
        this.renderUsuarios(usuarios);
    }

    fetchUsuarios() {
        return [
            {
                "id": 1,
                "nome": "Diego Pires",
                "usuario": "diego.pires",
                "senha": "123abc@",
                "perfil": 1
            },
            {
                "id": 2,
                "nome": "João da Couves",
                "usuario": "joao.couve",
                "senha": "123abc@",
                "perfil": 0
            },
            {
                "id": 3,
                "nome": "Fulano da Silva",
                "usuario": "fulano.silva",
                "senha": "123abc@",
                "perfil": 0
            }
        ]
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