const form = document.querySelector('.form');
form.addEventListener('submit', (event) => {
    event.preventDefault()
    async function authenticateUser() {

        const username = document.querySelector("#username").value;
        const password = document.querySelector("#password").value;

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: "username=" + username + "&password=" + password
            });

            console.log(response)
        } catch (error) {
            console.error('Error during authentication:', error.message);
        }
    }
    authenticateUser();
})
