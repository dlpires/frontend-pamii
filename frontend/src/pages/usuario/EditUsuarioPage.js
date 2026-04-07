import './EditUsuarioPage.css'
import { createHeader } from '../../shared/Header.js'
import { logout } from '../../shared/util.js';

const pageName = 'Editar Usuario';

class EditUsuarioPage extends HTMLElement {
    connectedCallback() {
        this.classList.add('ion-page');
        const cabecalho = createHeader(pageName);
        this.innerHTML = `
            ${cabecalho}
            <ion-content class="ion-padding">
                <form id="form-usuario">
                <ion-list>
                    <ion-item>
                    <ion-input type="text" name="nome" label="Nome Completo" label-placement="floating" value="Diego Pires" required></ion-input>
                    </ion-item>

                    <ion-item>
                    <ion-input type="text" name="usuario" label="Usuário" label-placement="floating" value="diego.pires" required></ion-input>
                    </ion-item>

                    <ion-item>
                    <ion-input type="password" name="senha" label="Senha" label-placement="floating" value="123abc@" required></ion-input>
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
        this.querySelector('#logout-btn')
        .addEventListener('click', logout);
        this.querySelector('#btn-cancelar').addEventListener('click', () =>  windows.history.back());
    }
}

customElements.define('edit-usuario-page', EditUsuarioPage);