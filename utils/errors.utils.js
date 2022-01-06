module.exports.signUpErrors = (err) => {
    let errors = { pseudo: '', email: '', password: ''}

    if (err.message.includes('pseudo')) errors.pseudo = "Pseudo incorrect";
    if (err.message.includes('email')) errors.email = "Email incorrect";
    if (err.message.includes('password')) errors.password = "Le mot de passe doit faire 6 caractères minimum";

    if (err.code === 11000){
        if(err.keyValue.hasOwnProperty('pseudo')) errors.pseudo = `Le pseudo ${err.keyValue.pseudo} est déjà pris.`
        if(err.keyValue.hasOwnProperty('email')) errors.email = `Le email ${err.keyValue.email} est déjà pris.`
    }

    return errors;
}

module.exports.signInErrors = (err) => {
    let errors = {email: '',password: ''};

    if (err.message.includes('email')) errors.email = "Email inconnu";
    if (err.message.includes('password')) errors.password = "Le mot de passe ne correspond pas";
}
