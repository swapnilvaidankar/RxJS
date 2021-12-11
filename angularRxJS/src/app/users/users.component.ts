import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, delay, switchMap } from 'rxjs/operators';
import { TestserviceService } from '../testservice.service';
@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  // public postObservable: Observable<any>;
  public postId: number = 0;
  public comments: any[] = [];
  public noOfPosts: number = 0;
  public userId: number = 0;
  public loading: string = 'Loading ...';
  constructor(private testService: TestserviceService) {}

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.testService
    //     .getUsers()
    //     .pipe(debounceTime(3000))
    //     .subscribe((users) => {
    //       console.log('Users > ', users);
    //     });
    // }, 3000);

    // this.testService
    //   .getPosts(1)
    //   // .pipe(debounceTime(3000))
    //   .subscribe((posts) => {
    //     console.log('Posts > ', posts);
    //   });
    this.testService
      .getUsers()
      .pipe(
        delay(2000),
        switchMap((user) => {
          this.userId = user[1].id;
          console.log('*** SW > User > ', user, ', UserID > ', this.userId);
          return this.testService.getPosts(this.userId);
        }),
        delay(2000),
        switchMap((post: any) => {
          console.log('*** SW > Post > ', post.id);
          this.postId = post.id;
          return this.testService.getCommentsForPostId(post.id);
        })
      )
      .subscribe((comments: any) => {
        console.log('*** SW > Comments > ', comments);
        this.comments = comments;
      });
    // this.testService
    //   .getPosts(this.postId)
    //   .pipe(
    //     switchMap((post: any) => {
    //       // console.log('SW > Post > ', post.id);
    //       return this.testService.getCommentsForPostId(post.id);
    //     })
    //   )
    //   .subscribe((comments: any) => {
    //     // console.log('SW > Comments > ', comments);
    //     // this.comments = comments;
    //   });
  }
}
