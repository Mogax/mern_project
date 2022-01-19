import React, {useState} from 'react';
import LeftNav from "../LeftNav";
import {useDispatch, useSelector} from "react-redux";
import UploadImg from "./UploadImg";
import {updateBio} from "../../actions/user.actions";
import {dateParser} from "../../Utils/Utils";
import FollowHandler from "./FollowHandler";

const UpdateProfil = () => {
    const [bio, setBio] = useState('');
    const [updateForm, setUpdateForm] = useState(false);
    const [followingPopup, setFollowingPopup] = useState(false);
    const [followersPopup, setFollowersPopup] = useState(false);

    // noinspection JSUnresolvedVariable
    const userData = useSelector((state) => state.userReducer)
    // noinspection JSUnresolvedVariable
    const usersData = useSelector((state) => state.usersReducer)
    // noinspection JSUnresolvedVariable
    const error = useSelector((state) => state.errorReducer.userError)
    const dispatch = useDispatch();


    const handleUpdate = (e) => {
        dispatch(updateBio(userData._id, bio));
        setUpdateForm(!updateForm);
    }

    return (
        <div className="profile-container">
            <LeftNav />
            <h1>Profil {userData.pseudo!==undefined?("aeiouyh").includes(userData.pseudo[0].toLowerCase()) ? 'd\'':'de ':"" } {userData.pseudo}</h1>
            <div className="update-container">
                <div className="left-part">
                    <h3>Photo de profil</h3>
                    <img src={userData.picture} alt="photo de profil"/>
                    <UploadImg/>
                    <p>{error.maxSize}</p>
                    <p>{error.format}</p>
                </div>
                <div className="right-part">
                    <div className="bio-update">
                        <h3>Biographie</h3>
                        {updateForm === false && (
                            <>
                                <p onClick={() => setUpdateForm(!updateForm)}>{userData.bio}</p>
                                <button onClick={() => setUpdateForm(!updateForm)}>Modifier Bio</button>
                            </>
                        )}
                        {updateForm && (
                            <>
                                <textarea defaultValue={userData.bio} onChange={(e) => setBio(e.target.value)}/>
                                <button onClick={handleUpdate}>Valider modification</button>
                            </>
                        )}
                    </div>
                    <h4>Membre depuis le : {dateParser(userData.createdAt)}</h4>
                    <h5 onClick={() => setFollowingPopup(!followingPopup)}>Abonnements : {userData.following ? userData.following.length : "0"}</h5>
                    <h5 onClick={() => setFollowersPopup(!followersPopup)}>Abonnés : {userData.followers ? userData.followers.length : "0"}</h5>
                </div>
            </div>
            {followingPopup && (
                <div className="popup-profil-container">
                    <div className="modal">
                        <h3>Abonnements</h3>
                        <span className="cross" onClick={() => setFollowingPopup(!followingPopup)}>&#10005;</span>
                        <ul>
                            {usersData.map((user) => {
                                for (let i = 0; i<userData.following.length;i++){
                                    if(user._id === userData.following[i]){
                                        return (
                                            <li>
                                                <img src={user.picture} alt="user-picture"/>
                                                <h4>{user.pseudo}</h4>
                                                <div className="follow-handler">
                                                    <FollowHandler idToFollow={user._id} type="suggestion"/>
                                                </div>
                                            </li>
                                        )
                                    }
                                }
                            })}
                        </ul>
                    </div>
                </div>
            )}
            {followersPopup && (
                <div className="popup-profil-container">
                    <div className="modal">
                        <h3>Abonnées</h3>
                        <span className="cross" onClick={() => setFollowersPopup(!followersPopup)}>&#10005;</span>
                        <ul>
                            {usersData.map((user) => {
                                for (let i = 0; i<userData.followers.length;i++){
                                    if(user._id === userData.followers[i]){
                                        return (
                                            <li>
                                                <img src={user.picture} alt="user-picture"/>
                                                <h4>{user.pseudo}</h4>
                                                <div className="follow-handler">
                                                    <FollowHandler idToFollow={user._id} type="suggestion"/>
                                                </div>
                                            </li>
                                        )
                                    }
                                }
                            })}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UpdateProfil;
