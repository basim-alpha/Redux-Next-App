"use client";

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUsers } from '@/features/users/usersSlice';
import AddPostForm from '@/features/posts/AddPostForm';
import PostsList from '@/features/posts/postsList';
import { AppDispatch } from './store';

export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
   <main className="min-h-screen p-6 bg-gray-50">
  <div className="flex items-center justify-center">
    <AddPostForm />
  </div>
   <div className="flex items-center justify-center">
      <PostsList />
      </div>
    </main>
  );
}
