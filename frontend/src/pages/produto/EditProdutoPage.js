import './EditProdutoPage.css'
import { createHeader } from '../../shared/Header.js'
import { logout } from '../../shared/util.js';

const pageName = 'Editar Produto';

class EditProdutoPage extends HTMLElement {
    connectedCallback() {
        this.classList.add('ion-page');
        const cabecalho = createHeader(pageName);
        this.innerHTML = `
            ${cabecalho}
            <ion-content class="ion-padding">
                <form id="form-produto">
                    <ion-list>
                        <ion-item>
                            <ion-input type="text" name="dsc_produto"
                            label="Descrição do Produto" label-placement="floating" value="Macarronada" required>
                            </ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-input type="number" step="0.01" name="valor_unit"
                            label="Valor Unitário" label-placement="floating" value="20.99" required>
                            </ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-label>Ativo</ion-label>
                            <ion-toggle slot="end" name="status" checked></ion-toggle>
                        </ion-item>
                    </ion-list>
                    <div class="ion-padding">
                        <ion-button expand="block" type="submit" class="ion-margin-top">
                        Salvar Produto
                        </ion-button>
                        <ion-button expand="block" color="danger" id="btn-cancelar">
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

customElements.define('edit-produto-page', EditProdutoPage);