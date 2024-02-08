const logoutBtn = document.querySelector('.logout-btn');
logoutBtn.addEventListener('click', () => {
    window.location.href = '/home'
    document.cookie = `sessionToken=; expires=`;
    sessionStorage.clear();
})