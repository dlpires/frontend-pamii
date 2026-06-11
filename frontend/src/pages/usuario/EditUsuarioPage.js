import './EditUsuarioPage.css'
import { createHeader } from '../../shared/Header.js'
import { logout } from '../../shared/util.js';
import { api } from '../../shared/api.js';
import { isAuthenticated } from '../../shared/auth.js';

const pageName = 'Editar Usuario';

class EditUsuarioPage extends HTMLElement {
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
                    <ion-select name="perfil" label="Perfil" label-placement="floating">
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
        const btnCancelar = this.querySelector('#btn-cancelar');
        if (btnCancelar) {
            btnCancelar.addEventListener('click', () => window.history.back());
        }

        this.loadUsuarioData();
    }

    async loadUsuarioData() {
        const id = localStorage.getItem('usuarioId');
        if (!id) {
            this.toast('ID do usuário não encontrado');
            document.querySelector('ion-router').push('/usuario/list', 'back');
            return;
        }

        const loading = document.createElement('ion-loading');
        loading.message = 'Carregando dados...';
        document.body.appendChild(loading);
        await loading.present();

        try {
            const usuario = await api.get('/usuario/' + id);
            this.populateForm(usuario);
            
            const form = this.querySelector('#form-usuario');
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const formData = new FormData(form);
                const payload = {
                    nome: formData.get('nome'),
                    usuario: formData.get('usuario'),
                    senha: formData.get('senha'),
                    perfil: parseInt(formData.get('perfil'))
                };

                const saveLoading = document.createElement('ion-loading');
                saveLoading.message = 'Salvando alterações...';
                document.body.appendChild(saveLoading);
                await saveLoading.present();

                try {
                    await api.patch('/usuario/' + id, payload);
                    await saveLoading.dismiss();
                    this.toast('Usuário atualizado com sucesso!', 'success');
                    document.querySelector('ion-router').push('/usuario/list', 'forward');
                } catch (error) {
                    await saveLoading.dismiss();
                    this.toast(error.message || 'Erro ao atualizar usuário');
                }
            });

        } catch (error) {
            this.toast(error.message || 'Erro ao carregar dados do usuário');
            document.querySelector('ion-router').push('/usuario/list', 'back');
        } finally {
            await loading.dismiss();
        }
    }

    populateForm(usuario) {
        const form = this.querySelector('#form-usuario');
        form.elements['nome'].value = usuario.nome;
        form.elements['usuario'].value = usuario.usuario;
        form.elements['senha'].value = usuario.senha;
        form.elements['perfil'].value = usuario.perfil;
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

customElements.define('edit-usuario-page', EditUsuarioPage);