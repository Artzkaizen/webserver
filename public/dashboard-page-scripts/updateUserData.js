function updateUserData() {
    const userNameDisplay = document.getElementsByClassName('username')[0];
    const userImgDisplay = document.getElementsByClassName('user-img')[0];

    const user = sessionStorage.getItem("username");
    userNameDisplay.innerHTML = `<p>Hello, <strong>${user}</strong></p>`
    console.log(userImgDisplay)
    userImgDisplay.src = `/img/${user}.jpg`
}
document.addEventListener('DOMContentLoaded', function () {
    updateUserData();
});