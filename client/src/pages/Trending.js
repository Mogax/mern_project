import React, {useContext} from 'react';
import {UidContext} from "../components/AppContext";
import {useSelector} from "react-redux";
import LeftNav from "../components/LeftNav";
import {isEmpty} from "../Utils/Utils";
import Card from "../components/Post/Card";
import Trends from "../components/Trends";
import FriendsHint from "../components/Profil/FriendsHint";

const Trending = () => {
    const uid = useContext(UidContext);
    // noinspection JSUnresolvedVariable
    const trendList = useSelector((state) => state.trendingReducer)


    return (
        <div className="trending-page">
            <LeftNav/>
            <div className="main">
                <ul>
                    {!isEmpty(trendList[0]) && trendList.map((post) => <Card post={post} key={post._id}/>)}
                </ul>
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

export default Trending;
