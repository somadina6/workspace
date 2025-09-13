import React, { useState } from "react";
import Comment from "../types/Comment";

type props = {
  comment: Comment;
  addReply: (parentId: number, text: string) => void;
  addLike: (id: number) => void;
  deleteComment: (id: number) => void;
};

export const CommentComponent: React.FC<props> = ({
  comment,
  addReply,
  addLike,
  deleteComment,
}) => {
  const [replyText, setReplyText] = useState("");

  const handleReply = () => {
    if (replyText.trim()) {
      addReply(comment.id, replyText);
      setReplyText("");
    }
  };

  return (
    <div style={{ marginLeft: "20px", marginTop: "10px" }}>
      <div className="comment-box">
        <p className="comment-text">{comment.text}</p>

        <div className="comment-actions">
          <button className="like-button" onClick={() => addLike(comment.id)}>
            👍
          </button>
          <p>{comment.likes}</p>
          <button
            className="delete-button"
            onClick={() => deleteComment(comment.id)}
          >
            🗑️
          </button>
        </div>

        <input
          type="text"
          className="reply-input"
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          placeholder="Write a reply..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleReply();
            }
          }}
        />
        <button className="button" onClick={handleReply}>
          Reply
        </button>
      </div>

      {/* Render replies recursively */}
      {comment.replies.map((reply) => (
        <CommentComponent
          key={reply.id}
          comment={reply}
          addReply={addReply}
          addLike={addLike}
          deleteComment={deleteComment}
        />
      ))}
    </div>
  );
};
