import React, { useState } from 'react';
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";

const Log = ({sign}) => {
    const [signUpModal, setSignUpModal] = useState(sign);
    const [signInModal, setSignInModal] = useState(!sign);

    const handleModals = (e) => {
        if (e.target.id === "register"){
            setSignInModal(false);
            setSignUpModal(true);
        } else if (e.target.id === "login"){
            setSignInModal(true);
            setSignUpModal(false);
        }
    }

    return (
        <div>
            <div className={"connection-form"}>
                <div className={"form-container"}>
                    <ul>
                        <li onClick={handleModals} id='register' className={signUpModal ? "active-btn" : ""}>S'inscrire</li>
                        <li onClick={handleModals} id='login' className={signInModal ? "active-btn" : ""}>Se connecter</li>
                    </ul>
                    {signUpModal && <SignUpForm/>}
                    {signInModal && <SignInForm/>}
                </div>
            </div>
        </div>
    );
};

export default Log;
