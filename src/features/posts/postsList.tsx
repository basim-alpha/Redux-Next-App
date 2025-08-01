/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { useSelector, useDispatch}  from "react-redux";
import React, { useEffect } from 'react';
import { selectAllPosts, getPostsStatus, getPostsError, fetchPosts } from "@/features/posts/postsSlice";

import PostExcerpt from "./PostExcerpt";
import { AppDispatch } from "@/app/store";

const PostsList = () => {
    const dispatch = useDispatch<AppDispatch>();

    const posts = useSelector(selectAllPosts);
    const postStatus = useSelector(getPostsStatus);
    const postError = useSelector(getPostsError);

    useEffect(() => {
        if (postStatus === 'idle') {
            dispatch(fetchPosts());
        }
    }, [postStatus, dispatch])

    let content;
    if (postStatus === 'loading') {
        content = <p>Loading...</p>;
    } else if (postStatus === 'succeeded') {
        const orderedPosts = posts.slice().sort((a: { date: any; }, b: { date: string; }) => b.date.localeCompare(a.date))
        content = orderedPosts.map((post: { id: number; }) => <PostExcerpt key={post.id} post={post} />)
    } else if (postStatus === 'failed') {
        content = <p>{postError}</p>;
    }

    return (
        <div className="posts-list">
            {content}
        </div>
    )

}

export default PostsList