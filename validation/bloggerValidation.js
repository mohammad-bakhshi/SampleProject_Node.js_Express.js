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
    } else if (input.username.length < 2) {
        result.message.push("username length must be at least 2.");
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
    if (!input.cellphone) {
        result.message.push("cell phone is required.");
        result.status = false;
    }
    return result;
}

const updateValidator = (input) => {
    if (input.companyName || input.registrationNumber || input.province || input.city || input.registrationDate || input.telephoneNumber) {
        return true;
    }
    return false;
}

module.exports = { createValidator, updateValidator };
