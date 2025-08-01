import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import './globals.css';
import {ReduxProvider} from '@/app/provider';
import { store } from './store';
import { fetchUsers } from '@/features/users/usersSlice';

export const metadata = {
  title: 'Redux + Next.js 15',
  description: 'Using Redux Toolkit with App Router (Official Way)',
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
