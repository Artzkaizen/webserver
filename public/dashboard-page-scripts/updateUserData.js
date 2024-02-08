async function updateUserData() {
    const user = sessionStorage.getItem("username");
    const userNameDisplay = document.getElementsByClassName('username')[0];
    const userImgDisplay = document.getElementsByClassName('user-img')[0];

    try{
        const response = await fetch(`/api/${user}/profile-picture-path`);
        const userProfilePictureUrl = await response.text();

        userNameDisplay.innerHTML = `<p>Hello, <strong>${user}</strong></p>`
        userImgDisplay.src = userProfilePictureUrl;
    }catch (error) {
        console.error('Error fetching user pic:', error.message);
    }
}
document.addEventListener('DOMContentLoaded', function () {
    updateUserData();
});