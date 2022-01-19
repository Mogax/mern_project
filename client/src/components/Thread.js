import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getPosts} from "../actions/post.actions";
import {isEmpty} from "../Utils/Utils";
import Card from "./Post/Card";

const Thread = () => {
    const [loadPost, setLoadPost] = useState(true);
    const [count, setCount] = useState(5);
    const dispatch = useDispatch();
    // noinspection JSUnresolvedVariable
    const posts = useSelector((state) => state.postReducer)

    useEffect(() => {
        const loadMore = () => {
            if(window.innerHeight  + window.pageYOffset +2 > document.scrollingElement.scrollHeight && loadPost===false){
                setLoadPost(true)
                setCount(count + 5)
            }
        }

        if (loadPost){
            dispatch(getPosts(count));
            setLoadPost(false)
        }

        window.addEventListener('scroll', loadMore);
        return () => window.removeEventListener('scroll', loadMore)
    }, [loadPost, dispatch, count])

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
