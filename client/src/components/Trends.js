import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {isEmpty} from "../Utils/Utils";
import {getTrends} from "../actions/post.actions";
import {NavLink} from "react-router-dom";

const Trends = () => {
    // noinspection JSUnresolvedVariable
    const posts = useSelector((state) => state.allPostsReducer)
    // noinspection JSUnresolvedVariable
    const usersData = useSelector((state) => state.usersReducer)
    // noinspection JSUnresolvedVariable
    const trendList = useSelector((state) => state.trendingReducer)

    const dispatch = useDispatch()

    useEffect(() => {
        if(!isEmpty(posts[0])){
            const postsArr = Object.keys(posts).map((i) => posts[i]);
            let sortedArr = postsArr.sort((a, b) => {
              return b.likers.length - a.likers.length
            })
            sortedArr.length = 3
            dispatch(getTrends(sortedArr))
        }
    }, [posts, dispatch])

    return (
        <div className="trending-container">
            <h4>Trending</h4>
            <NavLink exact to={'/trending'}>
                <ul>
                    {!isEmpty(trendList[0]) && trendList.map((post) => {
                        return (
                            <li key={post.id}>
                                <div>
                                    {post.picture && <img src={post.picture} alt="post-pic"/>}
                                    {post.video && <iframe width="500" height="300" src={post.video} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" title={post._id}/>}
                                    {(isEmpty(post.picture) && isEmpty(post.video)) && (
                                        <img src={!isEmpty(usersData[0]) && usersData.filter((user) => user._id===post.posterId)[0].picture} alt="profil-pic"/>
                                    )}
                                </div>
                                <div className="trend-content">
                                    <p>{post.message}</p>
                                    <span>Lire</span>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </NavLink>
        </div>
    );
};

export default Trends;
