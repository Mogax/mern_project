import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {isEmpty, timestampParser} from "../../Utils/Utils";
import FollowHandler from "../Profil/FollowHandler";
import {addComment, getPosts} from "../../actions/post.actions";
import EditDeleteComment from "./EditDeleteComment";

const CardComments = ({post}) => {
    const [text, setText] = useState('');

    // noinspection JSUnresolvedVariable
    const usersData = useSelector((state) => state.usersReducer);
    // noinspection JSUnresolvedVariable
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    const handleComment = (e) => {
    e.preventDefault();
    if (text) {
        dispatch(addComment(post._id, userData._id, text, userData.pseudo))
            .then(() => dispatch(getPosts()))
            .then(() => setText(''));
    }
    }
    console.log(post)
    return (
        <div className="comments-container">
            {post.comments.map(comment => {
                return (
                    <div className={comment.commenterId === userData._id ? "comment-container client" : "comment-container"} key={comment._id}>
                        <div className="left-part">
                            <img src={!isEmpty(usersData[0]) && usersData.filter((user) => user._id===comment.commenterId)[0].picture} alt="commenter-pic"/>

                        </div>
                        <div className="right-part">
                            <div className="comment-header">
                                <div className="pseudo">
                                    <h3>{comment.commenterPseudo}</h3>
                                    {comment.commenterId !== userData._id && (
                                        <FollowHandler idToFollow={comment.commenterId} type="card"/>
                                    )}
                                </div>
                                <span>{timestampParser(comment.timestamp)}</span>
                            </div>
                            <p>{comment.text}</p>
                            {userData._id && userData._id===comment.commenterId && (
                                <EditDeleteComment comment={comment} postId={post._id}/>
                            )}
                        </div>
                    </div>
                )
            })}
            {userData._id && (
                <form action="" onSubmit={handleComment} className="comment-form">
                    <input type="text" name="text" onChange={(e) => setText(e.target.value)} value={text} placeholder="Laisser un commentaire"/>
                    <br/>
                    <input type="submit" value="Envoyer"/>
                </form>
            )}
        </div>
    );
};

export default CardComments;
