import './ListMesaPage.css'
import { createHeader } from '../../shared/Header.js'
import { logout } from '../../shared/util.js';

const pageName = 'Mesa';

class ListMesaPage extends HTMLElement {
    connectedCallback() {
        this.classList.add('ion-page');
        const cabecalho = createHeader(pageName);
        this.innerHTML = `
            ${cabecalho}
            <ion-content>
                <div class="list-mesa"></div>
            </ion-content>
        `;
        this.querySelector('#logout-btn')
        .addEventListener('click', logout);

        const mesas = this.fetchMesas() || [];
        this.renderMesas(mesas);
    }

    fetchMesas() {
        return [
            {
                "id": 1,
                "qtd_cadeiras": 4
            },
            {
                "id": 2,
                "qtd_cadeiras": 6
            },
            {
                "id": 3,
                "qtd_cadeiras": 2
            }
        ]
    }

    renderMesas(mesas) {
        const container = this.querySelector(".list-mesa");

        if (mesas.length === 0) {
            container.innerHTML = '<p> Nenhuma mesa encontrada </p>'
            return;
        }

        const mesaItems = mesas.map(mesa => `
            <ion-item>
                <ion-label>
                    <h2>Mesa ${mesa.id}</h2>
                    <p>${mesa.qtd_cadeiras} cadeiras</p>
                </ion-label>

                <ion-buttons slot="end">
                    <ion-button fill="clear" class="btn-edit" data-id="${mesa.id}">
                        <ion-icon slot="icon-only" name="create-outline"></ion-icon>
                    </ion-button>
                    <ion-button fill="clear" color="danger" class="btn-delete" data-id="${mesa.id}">
                        <ion-icon slot="icon-only" name="trash-outline"></ion-icon>
                    </ion-button>
                </ion-buttons>
            </ion-item>`).join('');

        container.innerHTML = `<ion-list>${mesaItems}</ion-list>`;
    }
}

customElements.define('list-mesa-page', ListMesaPage);
