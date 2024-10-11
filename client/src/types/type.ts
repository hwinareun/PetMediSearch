export interface PostState {
  id: string;
  category: string[];
  title: string;
  content: string;
  nickName: string;
  created_at: string;
}

export interface Category {
  category_id: number | null;
  category_name: string;
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
