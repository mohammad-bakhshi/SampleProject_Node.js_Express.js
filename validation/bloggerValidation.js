const createValidator = (input) => {
    let result = {
        message: [],
        status: true
    };
    if (!input.firstname) {
        result.message.push("firstname is required.");
        result.status = false;
    }
    else if (input.firstname.length < 2) {
        result.message.push("firstname length must be at least 2.");
        result.status = false;
    }
    else if (input.firstname.length > 30) {
        result.message.push("firstname length must be at most 30.");
        result.status = false;
    }
    if (!input.lastname) {
        result.message.push("lastname is required.");
        result.status = false;
    } else if (input.lastname.length < 2) {
        result.message.push("lastname length must be at least 2.");
        result.status = false;
    }
    else if (input.lastname.length > 30) {
        result.message.push("lastname length must be at most 30.");
        result.status = false;
    }
    if (!input.username) {
        result.message.push("username is required.");
        result.status = false;
    } else if (input.username.length < 6) {
        result.message.push("username length must be at least 6.");
        result.status = false;
    }
    else if (input.username.length > 30) {
        result.message.push("username length must be at most 30.");
        result.status = false;
    }
    if (!input.password) {
        result.message.push("password is required.");
        result.status = false;
    }
    else if (!isPassword(input.password)) {
        result.message.push("password is not valid.");
        result.status = false;
    }
    if (!input.cellphone) {
        result.message.push("cell phone is required.");
        result.status = false;
    }
    // else if(!isCellphone(input.cellphone)) {
    //     result.message.push("cellphone is not valid.");
    //     result.status = false;
    // }
    return result;
}

const updateValidator = (input) => {
    let result = {
        message: [],
        status: true
    };
    if (input.firstname) {
        if (input.firstname.length < 2) {
            result.message.push("firstname length must be at least 2.");
            result.status = false;
        }
        else if (input.firstname.length > 30) {
            result.message.push("firstname length must be at most 30.");
            result.status = false;
        }
    }
    if (input.lastname) {
        if (input.lastname.length < 2) {
            result.message.push("lastname length must be at least 2.");
            result.status = false;
        }
        else if (input.lastname.length > 30) {
            result.message.push("lastname length must be at most 30.");
            result.status = false;
        }
    }
    if (input.username) {
        if (input.username.length < 6) {
            result.message.push("username length must be at least 6.");
            result.status = false;
        }
        else if (input.username.length > 30) {
            result.message.push("username length must be at most 30.");
            result.status = false;
        }
    }
    // if (input.password) {
    //     if (!isPassword(input.password)) {
    //         result.message.push("password is not valid.");
    //         result.status = false;
    //     }
    // }
    return result;
}

const loginValidator = (input) => {
    let result = {
        message: [],
        status: true
    };
    if (!input.username) {
        result.message.push("username is required.");
        result.status = false;
    } else if (input.username.length < 6) {
        result.message.push("username length must be at least 6.");
        result.status = false;
    }
    else if (input.username.length > 30) {
        result.message.push("username length must be at most 30.");
        result.status = false;
    }
    if (!input.password) {
        result.message.push("password is required.");
        result.status = false;
    }
    else if (!isPassword(input.password)) {
        result.message.push("password is not valid.");
        result.status = false;
    }
    return result;
}

function isPassword(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
}

// function isCellphone(cellphone){
//     return /\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/.test(cellphone);
// }

module.exports = { createValidator, loginValidator, updateValidator };
