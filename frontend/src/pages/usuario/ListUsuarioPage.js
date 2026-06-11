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
                <ion-fab vertical="bottom" horizontal="end" slot="fixed">
                    <ion-fab-button id="btn-add-usuario">
                        <ion-icon name="add"></ion-icon>
                    </ion-fab-button>
                </ion-fab>
            </ion-content>
        `;
        const logoutBtn = this.querySelector('#logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', logout);
        }

        const btnAdd = this.querySelector('#btn-add-usuario');
        if (btnAdd) {
            btnAdd.addEventListener('click', () => {
                document.querySelector('ion-router').push('/usuario/create', 'forward');
            });
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

        // Listeners para editar e deletar
        this.querySelector('.list-usuario').querySelectorAll('.btn-edit').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.dataset.id;
                localStorage.setItem('usuarioId', id);
                document.querySelector('ion-router').push('/usuario/edit', 'forward');
            });
        });

        this.querySelector('.list-usuario').querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', async () => {
                const id = btn.dataset.id;
                await this.confirmDelete(id);
            });
        });
    }

    async confirmDelete(id) {
        const alert = document.createElement('ion-alert');
        alert.header = 'Confirmar Exclusão';
        alert.message = 'Tem certeza que deseja excluir este usuário?';
        alert.buttons = [
            {
                text: 'Cancelar',
                role: 'cancel'
            },
            {
                text: 'Excluir',
                handler: async () => {
                    try {
                        await api.delete('/usuario/' + id);
                        this.toast('Usuário excluído com sucesso!', 'success');
                        this.loadUsuarios();
                    } catch (error) {
                        this.toast(error.message || 'Erro ao excluir usuário');
                    }
                }
            }
        ];
        document.body.appendChild(alert);
        await alert.present();
    }

    async toast(mensagem, color = 'danger') {
        const toast = document.createElement('ion-toast');
        toast.message = mensagem;
        toast.color = color;
        toast.duration = 2000;
        toast.position = 'bottom';

        document.body.appendChild(toast);
        return toast.present();
    }
}

customElements.define('list-usuario-page', ListUsuarioPage);