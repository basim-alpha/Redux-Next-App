/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addNewPost } from './postsSlice';
import { selectAllUsers } from '../users/usersSlice';
import { AppDispatch } from '@/app/store';

const AddPostForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');
  const [addRequestStatus, setAddRequestStatus] = useState('idle')


  const users = useSelector(selectAllUsers);

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const onContentChange = (e: React.ChangeEvent<HTMLInputElement>) => setContent(e.target.value);
  const onAuthorChange = (e: React.ChangeEvent<HTMLSelectElement>) => setUserId(e.target.value);

  const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle';


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (canSave) {
            try {
                setAddRequestStatus('pending')
                dispatch(addNewPost({ title, body: content, userId })).unwrap()

                setTitle('')
                setContent('')
                setUserId('')
            } catch (err) {
                console.error('Failed to save the post', err)
            } finally {
                setAddRequestStatus('idle')
            }
        }
  };

  const userOptions = users.map((user: any) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <div className="w-full max-w-md m-6 p-6 bg-blue-100 rounded-lg shadow-md border border-blue-200">
    <form onSubmit={handleSubmit}>
      <div>
        <label className='font-bold text-2xl mb-1' htmlFor="title">Title:</label><br />
        <input className='bg-white rounded-md border border-gray-400 p-2 mb-4 w-full'
          id="postTitle"
          name="postTitle"
          type="text"
          value={title}
          onChange={onTitleChange}
          required
        />
      </div>



      <div>
        <label className='font-bold text-2xl mb-1' htmlFor="postAuthor">Author:</label><br />
        <select className ='bg-white rounded-md border border-gray-400 p-2 mb-4 w-full' id='postAuthor' value={userId} onChange={onAuthorChange}>
          <option value="">Select an author</option>
          {userOptions}
        </select>
      </div>

      <div>
        <label className='font-bold text-2xl mb-1' htmlFor="content">Content:</label><br />
        <input className='bg-white rounded-md border border-gray-400 p-2 mb-4 w-full'
          id="postContent"
          name="postContent"
          type="text"
          value={content}
          onChange={onContentChange}
          required
        />
      </div>

      <button className='bg-blue-500 text-white rounded-md px-44 py-2 hover:bg-blue-600'
      disabled={!canSave} type="submit">Submit</button>
    </form>
    </div>
  );
};

export default AddPostForm;