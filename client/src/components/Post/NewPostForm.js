import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {isEmpty, timestampParser} from "../../Utils/Utils";
import {NavLink} from "react-router-dom";

const NewPostForm = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [postPicture, setPostPicture] = useState(null);
    const [video, setVideo] = useState('');
    const [file, setFile] = useState();
    // noinspection JSUnresolvedVariable
    const userData = useSelector(state => state.userReducer)

    const handlePicture = () => {

    }

    const handlePost = () => {

    }

    const cancelPost = () => {
        setMessage('');
        setPostPicture('');
        setVideo('');
        setFile('');
    }

    useEffect(() => {
        if(!isEmpty(userData)){
            setIsLoading(false)
        }
    }, [userData])

    return (
        <div className="post-container">
            {isLoading ? (
                <i className="fas fa-spinner fa-pulse"/>
            ) : (
                <>
                    <div className="data">
                        <p><span>{userData.following ? userData.following.length : "0"}</span> Abonnement{userData.following && userData.following.length>1 && "s"}</p>
                        <p><span>{userData.followers ? userData.followers.length : "0"}</span> Abonnée{userData.followers && userData.followers.length>1 && "s"}</p>
                    </div>
                    <NavLink exact to="/profil">
                        <div className="user-info">
                            <img src={userData.picture} alt="user-picture"/>
                        </div>
                    </NavLink>
                    <div className="post-form">
                        <textarea name="message" id="message" placeholder="Quoi de neuf ?" onChange={(e)=> setMessage(e.target.value)} value={message}/>
                        {(message || postPicture || video.length>20) && (
                            <li className="card-container">
                                <div className="card-left">
                                    <img src={userData.picture} alt="user-picture"/>
                                </div>
                                <div className="card-right">
                                    <div className="card-header">
                                        <div className="pseudo">
                                            <h3>{userData.pseudo}</h3>
                                        </div>
                                        <span>{timestampParser(Date.now())}</span>
                                    </div>
                                    <div className="content">
                                        <p>{message}</p>
                                        {postPicture && (
                                            <img src={postPicture} alt="post-picture"/>
                                        )}
                                        {video && (
                                            <iframe width="500" height="300" src={video} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" title={video}/>
                                        )}
                                    </div>
                                </div>
                            </li>
                        )}
                        <div className="footer-form">
                            <div className="icon">
                                {isEmpty(video) && (
                                    <>
                                        <img src="./img/icons/picture.svg" alt="image-upload"/>
                                        <input type="file" id="file-upload" name="file" accept=".jpg, .jpeg, .png" onChange={handlePicture}/>
                                    </>
                                )}
                                {video && (
                                    <button onClick={() => setVideo("")}>Supprimer video</button>
                                )}
                            </div>
                            <div className="btn-send">
                                {(message || postPicture || video.length>20) && (
                                    <button className="cancel" onClick={cancelPost}>Annuler message</button>
                                )}
                                <button className="send" onClick={handlePost}>Envoyer</button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default NewPostForm;
