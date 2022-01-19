import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {dateParser, isEmpty} from "../../Utils/Utils";
import FollowHandler from "../Profil/FollowHandler";
import LikeButton from "./LikeButton";
import {updatePost} from "../../actions/post.actions";
import DeleteCard from "./DeleteCard";
import CardComments from "./CardComments";

const Card = ({post}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdated, setIsUpdated] = useState(false);
    const [textUpdate, setTextUpdate] = useState(null);
    const [showComments, setShowComments] = useState(false);

    // noinspection JSUnresolvedVariable
    const usersData = useSelector((state) => state.usersReducer);
    // noinspection JSUnresolvedVariable
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    const updateItem = async () => {
        if (textUpdate) {
            await dispatch(updatePost(post._id, textUpdate))
        }
        setIsUpdated(false)
    }

    useEffect(() => {
        !isEmpty(usersData[0]) && setIsLoading(false)
    }, [usersData])

    return (
        <li className="card-container" key={post._id}>
            {isLoading ? (
                <i className="fas fa-spinner fa-spin"/>
            ) : (
                <>
                    <div className="card-left">
                        <img src={
                            !isEmpty(usersData[0]) && usersData.filter((user) => user._id===post.posterId)[0].picture
                        } alt="poster-pic"/>
                    </div>
                    <div className={"card-right"}>
                        <div className="card-header">
                            <div className="pseudo">
                                <h3>{
                                    !isEmpty(usersData[0]) && usersData.filter((user) => user._id===post.posterId)[0].pseudo
                                }
                                </h3>
                                {post.posterId !== userData._id &&
                                (
                                    <FollowHandler idToFollow={post.posterId} type="card"/>
                                )}
                            </div>
                            <span>{dateParser(post.createdAt)}</span>
                        </div>
                        {!isUpdated && <p>{post.message}</p>}
                        {isUpdated && (
                            <div className="update-post">
                                <textarea defaultValue={post.message} onChange={(e) => setTextUpdate(e.target.value)}/>
                                <div className="button-container">
                                    <button className="btn" onClick={updateItem}>
                                        Valider modification
                                    </button>
                                </div>
                            </div>
                        )}

                        {post.picture && <img src={post.picture} alt="card-pic" className="card-pic"/>}
                        {post.video && <iframe width="500" height="300" src={post.video} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" title={post._id}/>}
                        {userData._id === post.posterId && (
                            <div className="button-container">
                                <div onClick={() => setIsUpdated(!isUpdated)}>
                                    <img src="./img/icons/edit.svg" alt=""/>
                                </div>
                                <DeleteCard post={post}/>
                            </div>
                        )}
                        <div className="card-footer">
                            <div className="comment-icon">
                                <img onClick={() => setShowComments(!showComments)} src="./img/icons/message1.svg" alt="comment"/>
                                <span>{post.comments.length}</span>
                            </div>
                            <LikeButton post={post} />
                            <img src="./img/icons/share.svg" alt="share"/>
                        </div>
                        {showComments && <CardComments post={post}/>}
                    </div>
                </>
            )}
        </li>
    );
};

export default Card;
