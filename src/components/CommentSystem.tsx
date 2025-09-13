import React, { useState } from "react";
import Comment from "../types/Comment";
import { CommentComponent } from "./CommentComponent";

export const CommentSystem: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState("");

  // Add top level comment
  const addComment = () => {
    if (text.trim()) {
      setComments([
        ...comments,
        { id: Date.now(), text, replies: [], likes: 0 },
      ]);
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
                { id: Date.now(), text: replyText, replies: [], likes: 0 },
              ],
            }
          : { ...comment, replies: updateReplies(comment.replies) }
      );
    };

    setComments(updateReplies(comments));
  };

  const addLike = (id: number) => {
    const updateLikes = (comments: Comment[]): Comment[] => {
      return comments.map((comment) =>
        comment.id === id
          ? { ...comment, likes: comment.likes + 1 }
          : { ...comment, replies: updateLikes(comment.replies) }
      );
    };

    setComments(updateLikes(comments));
  };

  const deleteComment = (id: number) => {
    const removeComment = (comments: Comment[]): Comment[] => {
      return comments
        .filter((comment) => comment.id !== id) // remove if matches
        .map((comment) => ({
          ...comment,
          replies: removeComment(comment.replies), // check inside replies too
        }));
    };

    setComments(removeComment(comments));
  };

  return (
    <div className="main">
      <h2>Comment System</h2>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a comment..."
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addComment();
          }
        }}
      />
      <button className="button" onClick={addComment}>
        Add Comment
      </button>

      <div>
        {comments.map((comment) => (
          <CommentComponent
            key={comment.id}
            comment={comment}
            addReply={addReply}
            addLike={addLike}
            deleteComment={deleteComment}
          />
        ))}
      </div>
    </div>
  );
};
