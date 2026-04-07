export function logout() {
    const login_url = document.querySelector('ion-router')?.useHash ?? true;
    window.location.href = login_url == true ? '#/login' : '/login';
}