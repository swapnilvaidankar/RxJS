import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TestserviceService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    let userAPI = 'https://jsonplaceholder.typicode.com/users';
    return this.http.get(userAPI);
  }

  getPosts(userID: number) {
    let postsAPI = 'https://jsonplaceholder.typicode.com/posts/' + userID;
    return this.http.get(postsAPI);
  }

  getCommentsForPostId(postID: number) {
    let commentsAPI =
      'https://jsonplaceholder.typicode.com/comments?postId=' + postID;
    return this.http.get(commentsAPI);
  }
}
