import { IPost, IUpdatePost } from '../../interfaces/IPost';
import HttpClient from '../httpClient';

class PostsService {
  static async readAll(): Promise<IPost[]> {
    const { data } = await HttpClient.api.get('/AllPosts');

    return data;
  }

  static async getUserPosts(id: string | null): Promise<IPost[]> {
    const { data } = await HttpClient.api.get(`/posts/${id}`);

    return data;
  }

  static async createPost(newPostFields: IUpdatePost, id: string | null, token: string | null): Promise<IPost[]> {
    HttpClient.api.defaults.headers.common.Authorization = `Bearer ${token}`;
    const { title, content, category } = newPostFields;

    const { data } = await HttpClient.api.post(`/posts/${id}`, { title, content, category });

    return data;
  }

  static async delete(userId: string | null, postId: string | null, token: string | null): Promise<string> {
    HttpClient.api.defaults.headers.common.Authorization = `Bearer ${token}`;
    const obj = {
      postId,
    };
    const { data } = await HttpClient.api.delete(`/posts/${userId}`, { data: obj });

    return data;
  }
}

export default PostsService;
