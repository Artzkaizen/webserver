const passwordInput = document.querySelector('#password');
const passwordToggleBtn = document.querySelector('#password-toggle');
const eyeIconBtn = document.querySelectorAll('span');

passwordToggleBtn.addEventListener('click', function () {
    // Toggle password visibility
    passwordInput.type = (passwordInput.type === 'password') ? 'text' : 'password';

    // Change icon based on password visibility
    eyeIconBtn.forEach(function (icon) {
        icon.classList.toggle('show')
    });

});
