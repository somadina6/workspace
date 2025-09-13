import React, { useState } from "react";
import Comment from "../types/Comment";

type props = {
  comment: Comment;
  addReply: (parentId: number, text: string) => void;
};

export const CommentComponent: React.FC<props> = ({ comment, addReply }) => {
  const [replyText, setReplyText] = useState("");

  const handleReply = () => {
    if (replyText.trim()) {
      addReply(comment.id, replyText);
      setReplyText("");
    }
  };

  return (
    <div style={{ marginLeft: "20px", marginTop: "1px" }}>
      <p>{comment.text}</p>
      <input
        type="text"
        value={replyText}
        onChange={(e) => setReplyText(e.target.value)}
        placeholder="Write a reply..."
      />
      <button onClick={handleReply}>Reply</button>

      {/* Render replies recursively */}
      {comment.replies.map((reply) => (
        <CommentComponent key={reply.id} comment={reply} addReply={addReply} />
      ))}
    </div>
  );
};
