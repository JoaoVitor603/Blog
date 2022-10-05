import { IPost } from '../../interfaces/IPost';
import HttpClient from '../httpClient';

class PostsService {
  static async readAll(): Promise<IPost[]> {
    const { data } = await HttpClient.api.get('/AllPosts');

    return data;
  }

  static async GetPosts(id: string | null): Promise<IPost[]> {
    const { data } = await HttpClient.api.get(`/posts/${id}`);

    return data;
  }
}

export default PostsService;
