import React, {useState} from 'react';
import LeftNav from "../LeftNav";
import {useDispatch, useSelector} from "react-redux";
import UploadImg from "./UploadImg";
import {updateBio} from "../../actions/user.actions";

const UpdateProfil = () => {
    const [bio, setBio] = useState('');
    const [updateForm, setUpdateForm] = useState(false);
    // noinspection JSUnresolvedVariable
    const userData = useSelector((state) => state.userReducer)
    const dispatch = useDispatch();

    const handleUpdate = (e) => {
        console.log(userData._id, bio)
        dispatch(updateBio(userData._id, bio));
        setUpdateForm(!updateForm);
    }

    return (
        <div className="profile-container">
            <LeftNav />
            <h1>Profil de {userData.pseudo}</h1> {/*TODO change De en d' si voyelle*/}
            <div className="update-container">
                <div className="left-part">
                    <h3>Photo de profil</h3>
                    <img src={userData.picture} alt="photo de profil"/>
                    <UploadImg/>
                    {/*<p>{errors.maxSize}</p>*/}
                    {/*<p>{errors.format}</p>*/}
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
                </div>
            </div>
        </div>
    );
};

export default UpdateProfil;
