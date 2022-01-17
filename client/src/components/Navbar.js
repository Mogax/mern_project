import React, {useContext} from 'react';
import {NavLink} from "react-router-dom";
import {UidContext} from "./AppContext";
import Logout from "./Log/Logout";

const Navbar = () => {
    const uid = useContext(UidContext);


    return (
        <nav>
            <div className="nav-container">
                <div className="logo">
                    <NavLink exact to="/">
                        <div className="logo">
                            <img src="./img/icon.png" alt="icon"/>
                            <h3>Raccoont</h3>
                        </div>
                    </NavLink>
                </div>
                {uid ? (
                    <ul>
                        <li/>
                        <li className={"welcome"}>
                            <NavLink exact to={"/profil"}>
                                <h5>Bienvenue 'valuer dynamique'</h5>
                            </NavLink>
                        </li>
                        <Logout/>
                    </ul>
                ) : (
                    <ul>
                        <li/>
                        <li>
                            <NavLink exact to={"/profil"}>
                                <img src="./img/icons/login.svg" alt="login"/>
                            </NavLink>
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
