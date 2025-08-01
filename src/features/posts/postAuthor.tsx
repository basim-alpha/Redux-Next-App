import { useSelector} from "react-redux";
import React from 'react';
import { selectAllUsers } from "@/features/users/usersSlice";


const PostAuthor = ({userId}: any) => {
    const users = useSelector(selectAllUsers);
    
    const author = users.find((user: any) => user.id === userId);
    
    return <span>by {author ? author.name : 'Unknown author'}</span>;
    
}

export default PostAuthor;