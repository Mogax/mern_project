import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {isEmpty} from "../../Utils/Utils";
import FollowHandler from "./FollowHandler";

const FriendsHint = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [playOnce, setPlayOnce] = useState(true);
    const [friendsHint, setFriendsHint] = useState([]);

    // noinspection JSUnresolvedVariable
    const userData = useSelector((state) => state.userReducer)
    // noinspection JSUnresolvedVariable
    const usersData = useSelector((state) => state.usersReducer)

    useEffect(() => {
        const notFriendList = () => {
            let array = [];
            array = usersData.filter((user) => user._id !== userData._id && !user.followers.includes(userData._id));
            array.sort(() => 0.5 - Math.random())

            array.length = Math.floor((window.innerHeight-415)/60) - 1
            setFriendsHint(array)
        }

        if ((playOnce && !isEmpty(usersData[0]) && !isEmpty(userData._id))){
            notFriendList();
            setIsLoading(false);
            setPlayOnce(false);
        }
    }, [userData, usersData, playOnce])

    return (
        <div className="get-friends-container">
            <h4>Suggestions</h4>
            {isLoading ? (
                <div className="icon">
                    <i className="fas fa-spinner fa-pulse"/>
                </div>
            ) : (
                <ul>
                    {friendsHint && friendsHint.map(user => {
                        return (
                            // <li></li>
                            <li className="user-hint" key={user._id}>
                                <img src={user.picture} alt="user-pict"/>
                                <p>{user.pseudo}</p>
                                <FollowHandler idToFollow={user._id} type='suggestion'/>
                            </li>
                        )
                    })}
                </ul>
            )}
        </div>
    );
};

export default FriendsHint;
