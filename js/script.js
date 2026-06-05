/* SIGNUP */

const signupForm = document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", function (e) {

        e.preventDefault();

        clearErrors();

        const name = document.getElementById("name").value.trim();

        const email = document.getElementById("email").value.trim();

        const phone = document.getElementById("phone").value.trim();

        const city = document.getElementById("city").value.trim();

        const password = document.getElementById("password").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;

        let isValid = true;

        const namePattern = /^[A-Za-z ]+$/;

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const phonePattern =
            /^[0-9]{10}$/;

        const cityPattern =
            /^[A-Za-z ]+$/;

        const passwordPattern =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;


        /* NAME */

        if (name === "") {

            showError("name", "nameError",
                "Name is required");

            isValid = false;

        } else if (name.length < 3) {

            showError("name", "nameError",
                "Minimum 3 characters");

            isValid = false;

        } else if (!namePattern.test(name)) {

            showError("name", "nameError",
                "Only letters allowed");

            isValid = false;

        }


        /* EMAIL */

        if (email === "") {

            showError("email", "emailError",
                "Email is required");

            isValid = false;

        } else if (!emailPattern.test(email)) {

            showError("email", "emailError",
                "Invalid email address");

            isValid = false;

        } else {

            const users =
                JSON.parse(
                    localStorage.getItem("users")
                ) || [];

            const emailExists =
                users.some(user =>
                    user.email.toLowerCase() ===
                    email.toLowerCase()
                );

            if (emailExists) {

                showError(
                    "email",
                    "emailError",
                    "Email already registered"
                );

                isValid = false;
            }
        }


        /* PHONE */

        if (phone === "") {

            showError(
                "phone",
                "phoneError",
                "Phone number required"
            );

            isValid = false;

        } else if (!phonePattern.test(phone)) {

            showError(
                "phone",
                "phoneError",
                "Enter valid 10 digit number"
            );

            isValid = false;
        }


        /* CITY */

        if (city === "") {

            showError(
                "city",
                "cityError",
                "City required"
            );

            isValid = false;

        } else if (!cityPattern.test(city)) {

            showError(
                "city",
                "cityError",
                "Only letters allowed"
            );

            isValid = false;
        }


        /* PASSWORD */

        if (password === "") {

            showError(
                "password",
                "passwordError",
                "Password required"
            );

            isValid = false;

        } else if (!passwordPattern.test(password)) {

            showError(
                "password",
                "passwordError",
                "8+ chars, upper, lower, number & special char"
            );

            isValid = false;
        }


        /* CONFIRM PASSWORD */

        if (confirmPassword === "") {

            showError(
                "confirmPassword",
                "confirmPasswordError",
                "Confirm your password"
            );

            isValid = false;

        } else if (password !== confirmPassword) {

            showError(
                "confirmPassword",
                "confirmPasswordError",
                "Passwords do not match"
            );

            isValid = false;
        }


        if (!isValid) return;


        const users =
            JSON.parse(
                localStorage.getItem("users")
            ) || [];


        users.push({

            name,
            email,
            phone,
            city,
            password

        });


        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );


        alert(
            "Registration Successful"
        );


        signupForm.reset();


        window.location.href ="login.html";

    });

}

function togglePassword(id) {

    const field = document.getElementById(id);

    if (!field) return;

    const button = field.nextElementSibling;
    const icon = button.querySelector("i");

    if (field.type === "password") {
        field.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    } else {
        field.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    }
}

function clearErrors() {

    document.querySelectorAll(".error")
        .forEach(error => {

            error.innerText = "";

        });

    document
        .querySelectorAll(".form-control")
        .forEach(input => {

            input.classList.remove(
                "is-invalid",
                "is-valid"
            );

        });
}

function showError(inputId, errorId, message) {

    document.getElementById(errorId)
        .innerText = message;

    document.getElementById(inputId)
        .classList.add("is-invalid");
}


/* LOGIN */

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        clearErrors();

        const email = document
            .getElementById("loginEmail")
            .value
            .trim()
            .toLowerCase();

        const password = document
            .getElementById("loginPassword")
            .value
            .trim();

        let isValid = true;

        if (email === "") {
            showError(
                "loginEmailError",
                "Email is required"
            );
            isValid = false;
        }

        if (password === "") {
            showError(
                "loginPasswordError",
                "Password is required"
            );
            isValid = false;
        }

        if (!isValid) return;

        const users =
            JSON.parse(
                localStorage.getItem("users")
            ) || [];

        const user = users.find(
            u => u.email === email
        );

        if (!user) {

            showError(
                "loginEmailError",
                "Email not registered"
            );

            return;
        }

        if (user.password !== password) {

            showError(
                "loginPasswordError",
                "Incorrect password"
            );

            return;
        }

        localStorage.setItem("isLoggedIn","true" );
        localStorage.setItem("currentUser",JSON.stringify(user));

        localStorage.setItem("currentUser", user.name);
        alert("Login Successful");

        window.location.href = "home.html";

    });

}

function logout() {

    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");

    alert("Logged out successfully");

    window.location.href = "login.html";
}
