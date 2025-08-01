/* eslint-disable @typescript-eslint/no-explicit-any */

import { useSelector } from 'react-redux'

import { selectPostById } from '@/features/posts/postsSlice'
import PostAuthor from '@/features/posts/postAuthor'
import TimeAgo from '@/features/posts/TimeAgo'
import ReactionButton from '@/features/posts/ReactionButton'
import { useParams } from 'react-router-dom';


const SinglePostPage = () => {

      const { postId } = useParams()

    const post = useSelector((state) => selectPostById(state, Number(postId)))
    
    if (!post ) {
        return (
            <div>Post Not Found!</div>
        )
    }

     return (
        <div  className="w-full flex mt-4">
            <div className="rounded-lg border border-gray-300 mb-4 p-8 inline-block">
                <h1 className="text-4xl pb-2">{post.title}</h1>
                <p className="text-gray-500 text-2xl">{post.body}</p>
                <p className="text-gray-400 text-lg mt-2 mb-2">
                    <PostAuthor userId={post.userId} />
                    <TimeAgo timestamp={post.date} />
                </p>
                <ReactionButton post={post} />
            </div>
        </div>  
    )
  
}

export default SinglePostPage