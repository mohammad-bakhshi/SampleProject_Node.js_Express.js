function deleteBlogger(id) {
    fetch(`/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    })
        .then(() => window.location.href = '/')
        .catch(function (error) {
            console.log(error);
        })
}
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = document.getElementById("form");
    const fname = document.getElementById("fname");
    const lname = document.getElementById("lname");
    const cellphone = document.getElementById("cellphone");
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const fnameValue = fname.value.trim();
    const lnameValue = lname.value.trim();
    const cellphoneValue = cellphone.value.trim();
    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();
    let result = {
        firstname: fnameValue,
        lastname: lnameValue,
        cellphone: cellphoneValue,
        username: usernameValue,
        password: passwordValue
    };
    const id = window.location.pathname.slice(1)
    //if (result.message === 'pass') {
        fetch(`/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(result)
        }).then(response => response.json())
            .then((data) => {
                if (data.result === true) {
                    window.location.replace(`/${id}`);
                }
                else {
                    $("div.failure").html(data.message);
                    $("div.failure").fadeIn(300).delay(1500).fadeOut(400);
                }
            }).catch(function (error) {
                console.log(error);
            })
    //}
});

function checkInputs() {
    // trim to remove the whitespaces
    let fnameResult, lnameResult, cellphoneResult, usernameResult, passwordResult;
    const fnameValue = fname.value.trim();
    const lnameValue = lname.value.trim();
    const cellphoneValue = cellphone.value.trim();
    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();



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
