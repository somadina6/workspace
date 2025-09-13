import React, { useState } from "react";
import Comment from "../types/Comment";
import { CommentComponent } from "./CommentComponent";

export const CommentSystem: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState("");

  // Add top level comment
  const addComment = () => {
    if (text.trim()) {
      setComments([...comments, { id: Date.now(), text, replies: [] }]);
      setText("");
    }
  };

  // Add a reply
  const addReply = (parentId: number, replyText: string) => {
    const updateReplies = (comments: Comment[]): Comment[] => {
      return comments.map((comment) =>
        comment.id === parentId
          ? {
              ...comment,
              replies: [
                ...comment.replies,
                { id: Date.now(), text: replyText, replies: [] },
              ],
            }
          : { ...comment, replies: updateReplies(comment.replies) }
      );
    };

    setComments(updateReplies(comments));
  };

  return (
    <div>
      <h2>Comment System</h2>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a comment..."
      />
      <button onClick={addComment}>Add Comment</button>

      <div>
        {comments.map((comment) => (
          <CommentComponent
            key={comment.id}
            comment={comment}
            addReply={addReply}
          />
        ))}
      </div>
    </div>
  );
};
