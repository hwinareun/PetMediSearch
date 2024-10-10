export interface PostState {
  id: string;
  category: string[];
  title: string;
  content: string;
  nickName: string;
  created_at: string;
}

export interface Category {
  id: number | null;
  name: string;
  isActive?: boolean;
}

export interface Comment {
  id: string;
  commentText: string;
  postId: string;
  userId: any;
  nickName: string;
  createdAt: string;
  isEdit: boolean;
}
