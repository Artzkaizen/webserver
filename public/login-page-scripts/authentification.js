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
            }
    }
    authenticateUser();
})