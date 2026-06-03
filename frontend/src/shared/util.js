import { logout as authLogout } from './auth.js';

export function logout() {
    authLogout();
    const login_url = document.querySelector('ion-router')?.useHash ?? true;
    window.location.href = login_url == true ? '#/login' : '/login';
}