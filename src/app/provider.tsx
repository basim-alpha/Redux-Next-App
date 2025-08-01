'use client';

import { Provider } from 'react-redux';
import { store } from './store';
import { fetchUsers } from '@/features/users/usersSlice';



export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
export default ReduxProvider;