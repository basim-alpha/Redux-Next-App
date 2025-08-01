/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react'

import PostAuthor from './postAuthor';
import TimeAgo from './TimeAgo';
import ReactionButton from "./ReactionButton";
import Link from 'next/link';

const PostExcerpt = ({post}: any) => {
    console.log("PostExcerpt post Id:", post.id);
    return (
        <div  className="w-full flex mt-4">
            <div className="rounded-lg border bg-blue-100 border-blue-200 mb-4 p-8 inline-block w-400">
                <h1 className="text-4xl pb-2">{post.title}</h1>
                <p className="text-gray-500 text-2xl">{post.body.substring(0, 75)}</p>
                <p className="text-gray-400 text-lg mt-2 mb-2">
                <Link href={`/post/${post.id}`} className="text-blue-500 hover:underline mr-1">View Post</Link>
                    <PostAuthor userId={post.userId} />
                    <TimeAgo timestamp={post.date} />
                </p>
                <ReactionButton post={post} />
            </div>
        </div>  
    )
}

export default PostExcerpt