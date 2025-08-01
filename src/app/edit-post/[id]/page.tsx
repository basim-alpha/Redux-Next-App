/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { use, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectPostById, updatePost, deletePost } from '@/features/posts/postsSlice'
import { useRouter } from 'next/navigation';

import { selectAllUsers } from '@/features/users/usersSlice'
import { AppDispatch } from '@/app/store'

const EditPostForm = ({ params }: { params: Promise<{ id: any }> } ) => {

    const router = useRouter();

    const resolvedParams = use(params);
    const postId = Number(resolvedParams.id); 
        
    console.log("resolvedParams:", resolvedParams);
    console.log("postId:", postId);
        

    const post = useSelector((state) => selectPostById(state, postId))
    const users = useSelector(selectAllUsers)

    const [title, setTitle] = useState(post?.title)
    const [content, setContent] = useState(post?.body)
    const [userId, setUserId] = useState(post?.userId)
    const [requestStatus, setRequestStatus] = useState('idle')

    const dispatch = useDispatch<AppDispatch>()

    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }

    const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)
    const onContentChanged = (e: React.ChangeEvent<HTMLInputElement>) => setContent(e.target.value)
    const onAuthorChanged = (e: React.ChangeEvent<HTMLSelectElement>) => setUserId(Number(e.target.value))

    const canSave = [title, content, userId].every(Boolean) && requestStatus === 'idle';

    // Fixed: Proper form submission handler
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission
        
        if (canSave) {
            try {
                setRequestStatus('pending')
                await dispatch(updatePost({ 
                    id: post.id, 
                    title, 
                    body: content, 
                    userId, 
                    reactions: post.reactions 
                })).unwrap()

                
                console.log("Post updated successfully, navigating to:", `/post/${postId}`);
                router.push(`/post/${postId}`); 

            } catch (err) {
                console.error('Failed to save the post', err)
            } finally {
                setRequestStatus('idle')
            }
        }
    }

    const onDeletePostClicked = () => {
        try {
            setRequestStatus('pending')
            dispatch(deletePost({ id: post.id })).unwrap()

            setTitle('')
            setContent('')
            setUserId('')
            router.push(`/`);
        } catch (err) {
            console.error('Failed to delete the post', err)
        } finally {
            setRequestStatus('idle')
        }
    }

    const usersOptions = users.map((user: any) => (
        <option
            key={user.id}
            value={user.id}
        >{user.name}</option>
    ))

    return (
        <div className="w-full flex m-8 justify-center">
         <div className="w-full max-w-md m-6 p-6 bg-blue-100 rounded-lg shadow-md border border-blue-200">
        <form onSubmit={handleSubmit}>
            <div>
                <label className='font-bold text-2xl mb-1' htmlFor="postTitle">Post Title:</label><br />
                <input className='bg-white rounded-md border border-gray-400 p-2 mb-4 w-full'
                    id="postTitle"
                    name="postTitle"
                    type="text"
                    value={title || ''} 
                    onChange={onTitleChanged}
                    required
                />
            </div>

            <div>
                <label className='font-bold text-2xl mb-1' htmlFor="postAuthor">Author:</label><br />
                <select className ='bg-white rounded-md border border-gray-400 p-2 mb-4 w-full' 
                        id='postAuthor' 
                        value={userId || ''}
                        onChange={onAuthorChanged}>
                    <option value="">Select an author</option>
                    {usersOptions}
                </select>
            </div>

            <div>
                <label className='font-bold text-2xl mb-1' htmlFor="postContent">Content:</label><br />
                <input className='bg-white rounded-md border border-gray-400 p-2 mb-4 w-full'
                    id="postContent"
                    name="postContent"
                    type="text"
                    value={content || ''}
                    onChange={onContentChanged}
                    required
                />
            </div>
            <div>
            <button className='bg-blue-400 text-white rounded-md px-34 py-2 m-2 hover:bg-blue-600'
                    disabled={!canSave} 
                    type="submit">
                {requestStatus === 'pending' ? 'Updating...' : 'Update Post'}
            </button>
            </div>
            <div>
             <button className="deleteButton bg-red-400 text-white rounded-md px-35 py-2 m-2 hover:bg-red-600"
                    type="button"
                    onClick={onDeletePostClicked}
                >
                    Delete Post
                </button>
                </div>
        </form>
        </div>
        </div>
    )
}

export default EditPostForm