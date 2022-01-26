const form = document.getElementById("form");
const username = document.getElementById("username");
const password = document.getElementById("password");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    let result = checkInputs();

    if (result.message === 'pass') {
        fetch('/check', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(result)
        }).then(response=>response.json())
        .then((data)=>{
            window.location.href=`/${data._id}`;
        })
        .catch(function (error) {
            console.log(error);
        })
    }
});

function checkInputs() {
    // trim to remove the whitespaces
    let usernameResult, passwordResult;
    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();

    if (usernameValue === "") {
        setErrorFor(username, "Username cannot be blank");
        usernameResult = false;
    } else if (usernameValue.length < 2) {
        setErrorFor(username, "At least two characters");
        usernameResult = false;
    } else {
        setSuccessFor(username);
        usernameResult = true;
    }

    if (passwordValue === "") {
        setErrorFor(password, "Password cannot be blank");
        passwordResult = false;
    } else if (!isPassword(passwordValue)) {
        setErrorFor(password, "Must be at least 8 characters in length");
        passwordResult = false;
    } else {
        setSuccessFor(password);
        passwordResult = true;
    }
    if (
        usernameResult === true &&
        passwordResult === true
    ) {
        return {
            username: usernameValue,
            password: passwordValue,
            message: "pass",
        };
    } else {
        return { message: "fail" };
    }
}

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector("small");
    formControl.className = "form-control error";
    small.innerText = message;
}

function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = "form-control success";
}

function isPassword(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
}
