function updateUserData() {
    const userNameDisplay = document.getElementsByClassName('username')[0];
    const user = sessionStorage.getItem("username");
    userNameDisplay.innerHTML = `<p>Hello, <strong>${user}</strong></p>`
}
document.addEventListener('DOMContentLoaded', function () {
    updateUserData();
});