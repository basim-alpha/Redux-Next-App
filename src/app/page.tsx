"use client";
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import PostsList from '@/features/posts/postsList';
import AddPostForm from '@/features/posts/AddPostForm';



export default function HomePage() {
  // return (
  //   <Routes>
  //     <Route path="/" element={<Layout />}>

  //       <Route index element={<PostsList />} />

  //       <Route path="post">
  //         <Route index element={<AddPostForm />} />
  //         <Route path=":postId" element={<SinglePostPage />} />
  //         {/* <Route path="edit/:postId" element={<EditPostForm />} /> */}
  //       </Route>

  //     </Route>
  //   </Routes>
  // )
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Posts</h1>
      <AddPostForm />
      <PostsList/>
    </main>
  );
}