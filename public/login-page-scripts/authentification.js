const form = document.querySelector('.form');
const city = document.getElementById('user-city');
form.addEventListener('submit', (event) => {
    event.preventDefault()
    async function authenticateUser() {

        const username = document.querySelector("#username").value;
        const password = document.querySelector("#password").value;

            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: "username=" + username + "&password=" + password
            });

            const resData = await response.text()

            if (response.status === 200)
            {
                window.location = '/dashboard'
                document.cookie = `sessionToken=${resData}`;
                sessionStorage.setItem("username", username);
            }else {
                const inputElements = document.querySelectorAll('.login-error');
                const loginInfo = document.querySelector('.login-info')
                inputElements.forEach(input => {
                    input.style.border = '2px solid red';
                    loginInfo.innerHTML = 'Please enter a matching username and password';
                    loginInfo.style.color = 'red'
                    input.addEventListener('click', () => {
                        input.style.border = 'none'
                    })
                });

            }
    }
    authenticateUser();
})

const loginBtn = document.getElementById('login');
const createBtn = document.getElementById('create-btn');

function handleBtnClick() {
    form.style.display = 'flex';
    loginBtn.style.display = 'none'
    createBtn.style.display = 'none'
}
loginBtn.addEventListener('click', () => {
    handleBtnClick();
});
createBtn.addEventListener('click', () => {
    handleBtnClick();
    city.style.display = 'block'
});