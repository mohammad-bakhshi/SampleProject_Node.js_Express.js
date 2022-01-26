const form = document.getElementById("form");
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const cellphone = document.getElementById("cellphone");
const gender = document.getElementsByName("gender");
const username = document.getElementById("username");
const password = document.getElementById("password");
//const validation = require("../../tools/validation");
form.addEventListener("submit", (e) => {
    e.preventDefault();

    let result = checkInputs();

    if (result.message === 'pass') {
        fetch('/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(result)
        }).then(function (response) {
            window.location.replace('/');
        }).catch(function (error) {
            console.log(error);
        })

    }
});

function checkInputs() {
    // trim to remove the whitespaces
    let fnameResult, lnameResult, cellphoneResult, usernameResult, passwordResult;
    const fnameValue = fname.value.trim();
    const lnameValue = lname.value.trim();
    const cellphoneValue = cellphone.value.trim();
    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();
    let genderValue;
    if (gender[0].checked) {
        genderValue = gender[0].value;
    } else if (gender[1].checked) {
        genderValue = gender[1].value;
    } else {
        genderValue = "empty";
    }


    if (!usernameValue) {
        setErrorFor(username, "Username cannot be blank");
        usernameResult = false;
    }
    //check username to be unique
    else {
        setSuccessFor(username);
        usernameResult = true;
    }

    if (!passwordValue) {
        setErrorFor(password, "Password cannot be blank");
        passwordResult = false;
    } else if (!isPassword(passwordValue)) {
        setErrorFor(password, "Must be at least 8 characters in length");
        passwordResult = false;
    } else {
        setSuccessFor(password);
        passwordResult = true;
    }

    if (!fnameValue) {
        setErrorFor(fname, "Firstname cannot be blank");
        fnameResult = false;
    } else {
        setSuccessFor(fname);
        fnameResult = true;
    }

    if (!lnameValue) {
        setErrorFor(lname, "Lastname cannot be blank");
        lnameResult = false;
    } else {
        setSuccessFor(lname);
        lnameResult = true;
    }

    if (!cellphoneValue) {
        setErrorFor(cellphone, "Cell phone cannot be blank");
        cellphoneResult = false;
    } else {
        setSuccessFor(cellphone);
        cellphoneResult = true;
    }

    if (
        fnameResult === true &&
        lnameResult === true &&
        cellphoneResult === true &&
        usernameResult === true &&
        passwordResult === true
    ) {
        return {
            firstname: fnameValue,
            lastname: lnameValue,
            cellphone: cellphoneValue,
            gender: genderValue,
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
