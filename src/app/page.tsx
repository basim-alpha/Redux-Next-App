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
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Posts</h1>
      <AddPostForm />
      <PostsList />
    </main>
  );
}
