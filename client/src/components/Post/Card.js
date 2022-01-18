import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {dateParser, isEmpty} from "../../Utils/Utils";
import FollowHandler from "../Profil/FollowHandler";

const Card = ({post}) => {
    const [isLoading, setIsLoading] = useState(true);
    // noinspection JSUnresolvedVariable
    const usersData = useSelector((state) => state.usersReducer);
    // noinspection JSUnresolvedVariable
    const userData = useSelector((state) => state.userReducer);

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
                            !isEmpty(usersData[0]) &&
                                usersData.map((user) => {
                                    if (user._id===post.posterId) return user.picture;
                                }).join('')
                        } alt="poster-pic"/>
                    </div>
                    <div className={"card-right"}>
                        <div className="card-header">
                            <div className="pseudo">
                                <h3>{
                                    !isEmpty(usersData[0]) &&
                                    usersData.map((user) => {
                                        if (user._id === post.posterId) return user.pseudo;
                                    }).join('')
                                }
                                </h3>
                                {post.posterId !== userData._id &&
                                (
                                    <FollowHandler idToFollow={post.posterId} type="card"/>
                                )}
                            </div>
                            <span>{dateParser(post.createdAt)}</span>
                        </div>
                        <p>{post.message}</p>
                        {post.picture && <img src={post.picture} alt="card-pic" className="card-pic"/>}
                        {post.video && <iframe width="500" height="300" src={post.video} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"/>}
                        <div className="card-footer">
                            <div className="comment-icon">
                                <img src="./img/icons/message1.svg" alt="comment"/>
                                <span>{post.comments.length}</span>
                            </div>
                            <h6>Like button</h6>
                            <img src="./img/icons/share.svg" alt="share"/>
                        </div>
                    </div>
                </>
            )}
        </li>
    );
};

export default Card;
