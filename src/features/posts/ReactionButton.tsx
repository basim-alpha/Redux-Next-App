/* eslint-disable @typescript-eslint/no-explicit-any */

import { useDispatch} from "react-redux";
import { reactionAdded } from "./postsSlice";

const reactionEmoji: Record<string, string> = {
    thumbsUp: "👍",
    wow: "😮",
    heart: "❤️",
    rocket: "🚀",
    coffee: "☕"
};

const ReactionButton = ({ post }: any) => {
    const dispatch = useDispatch();

    const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
        return (
            <button
                key={name}
                type="button"
                className="reactionButton"
                onClick={() => dispatch(reactionAdded({ postId: post.id, reaction: name }))}
            >
                {emoji} {post.reactions[name]}
            </button>
        )
    })

    return (
        <div className="reactionButtons">
            {reactionButtons}
        </div>
    )
}

export default ReactionButton;