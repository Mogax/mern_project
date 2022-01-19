import React, {useContext} from 'react';
import LeftNav from "../components/LeftNav";
import Thread from "../components/Thread";
import {UidContext} from "../components/AppContext";
import Log from "../components/Log";
import NewPostForm from "../components/Post/NewPostForm";
import Trends from "../components/Trends";
import FriendsHint from "../components/Profil/FriendsHint";

const Home = () => {
    const uid = useContext(UidContext)

    return (
        <div className="home">
            <LeftNav/>
            <div className="main">
                <div className="home-header">
                    {uid ? <NewPostForm/> : <Log sign={false}/> }
                </div>
                <Thread/>
            </div>
            <div className="right-side">
                <div className="right-side-container">
                    <Trends/>
                    {uid && <FriendsHint/>}
                </div>
            </div>
        </div>
    );
};

export default Home;
