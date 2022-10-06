export interface IPost {
  id: string;
  title: string;
  content: string;
  postOwnerUserName: string;
  postOwnerId: string;
  category: string[];
  created_at: string;
  updated_at?: Date;
}

export interface IUpdatePost {
  title: string;
  content: string;
  category: string;
}
