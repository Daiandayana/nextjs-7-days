import { create } from "zustand";
import { Comment } from "@/types/Comment";

interface CommentStore {
  comments: Comment[];
  setComments: (comments: Comment[]) => void;
  addComment: (comment: Comment) => void;
  removeComment: (commentId: string) => void;
}

export const useCommentStore = create<CommentStore>((set) => ({
  comments: [],
  setComments: (comments) => set({ comments }),
  addComment: (comment) =>
    set((state) => ({ comments: [comment, ...state.comments] })),
  removeComment: (commentId) =>
    set((state) => ({
      comments: state.comments.filter((c) => c._id !== commentId),
    })),
}));
