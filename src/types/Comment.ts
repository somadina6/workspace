export type Comment = {
  id: number;
  text: string;
  replies: Comment[];
  likes: number;
};

export default Comment;
