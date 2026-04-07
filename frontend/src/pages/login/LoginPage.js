import './LoginPage.css'
import { createHeader } from '../../shared/Header.js'

const pageName = 'Login';

class LoginPage extends HTMLElement {
    connectedCallback() {
        this.classList.add('ion-page');
        const cabecalho = createHeader(pageName);
        this.innerHTML = `
            ${cabecalho}
            <div class="container">
                <ion-card>
                    <ion-card-header>
                        <ion-card-title>Acessar</ion-card-title>
                    </ion-card-header>
                    <ion-card-content>
                        <ion-item>
                            <ion-icon slot="start"name="person">
                            </ion-icon>
                            <ion-input type="text" id="usuario"
                            placeholder="Usuário"></ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-icon slot="start" name="lock-closed">
                            </ion-icon>
                            <ion-input type="password" id="senha"
                            placeholder="Senha"></ion-input>
                        </ion-item>

                        <ion-button expand="block" id="login" class="ion-margin-top">
                            Entrar
                        </ion-button>
                    </ion-card-content>
                </ion-card>
            </div>
        `;

        // Referencias
        const userInput = this.querySelector('#usuario');
        const passInput = this.querySelector('#senha');
        const btnLogin = this.querySelector('#login');

        btnLogin.addEventListener('click', async () => {
            const usuario = userInput.value;
            const senha = passInput.value;

            const loading = document.createElement('ion-loading');
            loading.message = 'Autenticando...';
            loading.duration = 3000;

            document.body.appendChild(loading);
            await loading.present();
            await loading.onDidDismiss(); // Aguardar o tempo do loading

            if (usuario == 'admin' && senha == 'admin') {
                toast('Login realizado com sucesso!', 'success');
                document.querySelector('ion-router').push('/home', 'forward')
            } else {
                toast('Usuário ou senha incorretos!');
            }
        })

        async function toast(mensagem, color = 'danger') {
            const toast = document.createElement('ion-toast');
            toast.message = mensagem;
            toast.color = color;
            toast.duration = 2000;
            toast.position = 'bottom';

            document.body.appendChild(toast);
            return toast.present();
        }
    }
}

customElements.define('login-page', LoginPage);