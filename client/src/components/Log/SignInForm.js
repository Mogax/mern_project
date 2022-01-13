import React, { useState } from 'react';
import axios from 'axios';

const SignInForm = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleLogin = (e) =>{

    }

    return (
        <form action="" onSubmit={handleLogin} id="sign-in-form">
            <label htmlFor="email">Email</label>
            <br/>
            <input type="text" name="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email}/>
            <div className="email error"/>
            <br/>
            <label htmlFor="password">Password</label>
            <br/>
            <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password}/>
            <input type="submit"/>
        </form>
    );
};

export default SignInForm;
