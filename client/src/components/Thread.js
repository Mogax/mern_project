import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getPosts} from "../actions/post.actions";
import {isEmpty} from "../Utils/Utils";
import Card from "./Post/Card";

const Thread = () => {
    const [loadPost, setLoadPost] = useState(true);
    const dispatch = useDispatch();
    // noinspection JSUnresolvedVariable
    const posts = useSelector((state) => state.postReducer)

    useEffect(() => {
        if (loadPost){
            dispatch(getPosts());
            setLoadPost(false)
        }
    }, [loadPost, dispatch])
    console.log(posts)
    return (
        <div>
            <ul>
                {!isEmpty(posts[0]) && posts.map((post) => {
                    return <Card post={post} key={post._id}/>
                })}
            </ul>
        </div>
    );
};

export default Thread;
