const form = document.querySelector('.form');
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
            }else {
                const inputElements = document.querySelectorAll('.login-error');
                const loginInfo = document.querySelector('.login-info')
                inputElements.forEach(input => {
                    input.style.border = '2px solid red';
                    loginInfo.innerHTML = 'Please a matching username and password';
                    loginInfo.style.color = 'red'
                    input.addEventListener('click', () => {
                        input.style.border = 'none'
                    })
                });

            }
    }
    authenticateUser();
})