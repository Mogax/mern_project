import React, {useState} from 'react';
import axios from "axios";
import SignInForm from "./SignInForm";

const SignUpForm = () => {
    const [formSubmit, setFormSubmit] = useState(false);
    const [pseudo, setPseudo] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [controlPassword, setControlPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        const terms = document.getElementById('terms');
        const pseudoError = document.querySelector('.pseudo.error');
        const emailError = document.querySelector('.email.error');
        const passwordError = document.querySelector('.password.error');
        const passwordConfirmError = document.querySelector('.password-confirm.error');
        const termsError = document.querySelector('.terms.error');

        passwordConfirmError.innerHTML = "";
        termsError.innerHTML = "";

        if (password !== controlPassword){
            passwordConfirmError.innerHTML = "Les mots de passe ne sont pas identiques";
        }else if (!terms.checked){
            termsError.innerHTML = "Veuillez valider les conditions générales"
        } else {
            await axios({
                method:"post",
                url: `${process.env.REACT_APP_API_URL}api/user/register`,
                data: {
                    pseudo,
                    email,
                    password,
                }
            })
                .then((res) => {
                    if (res.data.errors){
                        pseudoError.innerHTML = res.data.errors.pseudo;
                        emailError.innerHTML = res.data.errors.email;
                        passwordError.innerHTML = res.data.errors.password;
                    } else {
                        setFormSubmit(true)
                    }
                })
        }

    }

    return (
        <>
            {formSubmit ? (
                    <>
                        <SignInForm/>
                        <span/>
                        <h4 className="success">Enregistrement réussi, veuillez-vous connecter</h4>
                    </>
                ) :
                <form action="" onSubmit={handleRegister} id="sign-up-form">
                    <label htmlFor="pseudo">Pseudo</label>
                    <br/>
                    <input type="text" name="pseudo" id="pseudo" onChange={(e) => setPseudo(e.target.value)}
                           value={pseudo}/>
                    <div className="pseudo error"/>
                    <br/>
                    <label htmlFor="email">Email</label>
                    <br/>
                    <input type="text" name="email" id="email" onChange={(e) => setEmail(e.target.value)}
                           value={email}/>
                    <div className="email error"/>
                    <br/>
                    <label htmlFor="password">Mot de passe</label>
                    <br/>
                    <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)}
                           value={password}/>
                    <div className="password error"/>
                    <br/>
                    <label htmlFor="password-conf">Confimer mot de passe</label>
                    <br/>
                    <input type="password" name="password" id="password-conf"
                           onChange={(e) => setControlPassword(e.target.value)} value={controlPassword}/>
                    <div className="password-confirm error"/>
                    <br/>
                    <input type="checkbox" id="terms"/>
                    <label htmlFor="terms">J'accepte les <a href="/" target="_blank" rel="noopener noreferrer">conditions
                        générales</a></label>
                    <div className="terms error"/>
                    <br/>
                    <input type="submit" value="Valider Inscription"/>
                </form>
            }
        </>
    );
};

export default SignUpForm;
