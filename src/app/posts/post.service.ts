import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Articles, SingleArticle, CreateArticle } from './article';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private httpClient: HttpClient, private authService: AuthService) {}

  getArticles() {
    console.log(environment);
    return this.httpClient.get<Articles>(`${environment.apiUrl}/api/articles`);
  }

  getArticle(slug: string) {
    return this.httpClient.get<SingleArticle>(`${environment.apiUrl}/api/articles/${slug}`);
  }

  createArticle(article: CreateArticle) {
    return this.httpClient.post<SingleArticle>(`${environment.apiUrl}/api/articles`, { article }, {
      headers: {
        Authorization: `Token ${this.authService.getToken()}`
      }
    });
  }

  titleExist(title: string) {
    return this.httpClient.get<{titleExist: boolean}>(`${environment.apiUrl}/api/articles/title-exist/${encodeURI(title)}`);
  }
}
