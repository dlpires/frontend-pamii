import './CadUsuarioPage.css'
import { createHeader } from '../../shared/Header.js'
import { logout } from '../../shared/util.js';
import { api } from '../../shared/api.js';
import { isAuthenticated } from '../../shared/auth.js';

const pageName = 'Cadastrar Usuario';

class CadUsuarioPage extends HTMLElement {
    connectedCallback() {
        if (!isAuthenticated()) {
            document.querySelector('ion-router').push('/login', 'root');
            return;
        }
        this.classList.add('ion-page');
        const cabecalho = createHeader(pageName);
        this.innerHTML = `
            ${cabecalho}
            <ion-content class="ion-padding">
                <form id="form-usuario">
                <ion-list>
                    <ion-item>
                    <ion-input type="text" name="nome" label="Nome Completo" label-placement="floating" required></ion-input>
                    </ion-item>

                    <ion-item>
                    <ion-input type="text" name="usuario" label="Usuário" label-placement="floating" required></ion-input>
                    </ion-item>

                    <ion-item>
                    <ion-input type="password" name="senha" label="Senha" label-placement="floating" required></ion-input>
                    </ion-item>

                    <ion-item>
                    <ion-select name="perfil" label="Perfil" label-placement="floating" value="1">
                        <ion-select-option value="0">Administrador</ion-select-option>
                        <ion-select-option value="1">Atendente</ion-select-option>
                    </ion-select>
                    </ion-item>
                </ion-list>

                <div class="ion-padding">
                    <ion-button expand="block" type="submit" class="ion-margin-top">
                    <ion-icon name="checkmark-circle" slot="start" style="margin-right: 8px;"></ion-icon>
                    Salvar Usuário
                    </ion-button>
                    <ion-button expand="block" color="danger" id="btn-cancelar">
                    <ion-icon name="close-circle" slot="start" style="margin-right: 8px;"></ion-icon>
                    Cancelar
                    </ion-button>
                </div>
                </form>
            </ion-content>
        `;
        const logoutBtn = this.querySelector('#logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', logout);
        }

        const form = this.querySelector('#form-usuario');
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const formData = new FormData(form);
                const payload = {
                    nome: formData.get('nome'),
                    usuario: formData.get('usuario'),
                    senha: formData.get('senha'),
                    perfil: parseInt(formData.get('perfil'))
                };

                const loading = document.createElement('ion-loading');
                loading.message = 'Salvando usuário...';
                document.body.appendChild(loading);
                await loading.present();

                try {
                    await api.post('/usuario', payload);
                    await loading.dismiss();
                    this.toast('Usuário cadastrado com sucesso!', 'success');
                    const router = document.querySelector('ion-router');
                    if (router) {
                        router.push('/usuario/list', 'forward');
                    }
                } catch (error) {
                    await loading.dismiss();
                    this.toast(error.message || 'Erro ao cadastrar usuário');
                }
            });
        }

        const btnCancelar = this.querySelector('#btn-cancelar');
        if (btnCancelar) {
            btnCancelar.addEventListener('click', () => window.history.back());
        }
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

customElements.define('cad-usuario-page', CadUsuarioPage);