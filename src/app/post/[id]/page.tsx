/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useSelector } from "react-redux";
import { useEffect, use } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store"; 

import { selectPostById, fetchPosts } from "@/features/posts/postsSlice";
import PostAuthor from "@/features/posts/postAuthor";
import TimeAgo from "@/features/posts/TimeAgo";
import ReactionButton from "@/features/posts/ReactionButton";
import Link from "next/link";


export default function SinglePostPage({ params }: { params: Promise<{ id: any }> }) {

    const resolvedParams = use(params);
    const postId = Number(resolvedParams.id); 
    
    console.log("resolvedParams:", resolvedParams);
    console.log("postId (as number):", postId);

    const dispatch = useDispatch<AppDispatch>();
    const post = useSelector((state) => selectPostById(state, postId));

    useEffect(() => {
        if (!post) {
            dispatch(fetchPosts());
        }
    }, [dispatch, post]);

    if (!post) {
        return (
            <div className="text-center text-2xl mt-10 text-red-500">
                Post Not Found!
            </div>
        );
    }

    return (
        <div className="w-full flex mt-4">
            <div className="rounded-lg border border-gray-300 mb-4 p-8 inline-block">
                <h1 className="text-4xl pb-2">{post.title}</h1>
                <p className="text-gray-500 text-2xl">{post.body}</p>
                <p className="text-gray-400 text-lg mt-2 mb-2">
                <Link href={`/edit-post/${post.id}`} className="text-blue-500 hover:underline">Edit Post</Link>
                    <PostAuthor userId={post.userId} />
                    <TimeAgo timestamp={post.date} />
                </p>
                <ReactionButton post={post} />
            </div>
        </div>
    );
}