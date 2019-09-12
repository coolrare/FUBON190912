import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';
import { Article } from '../article';
import { map, switchMap, single, share, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  id: string;
  article: Article;
  article$: Observable<Article>;

  constructor(private route: ActivatedRoute, private postService: PostService) {}

  ngOnInit() {
    // this.route.paramMap.subscribe(map => {
    //   console.log(map);
    //   this.id = map.get('id');

    //   this.postService.getArticle(this.id).subscribe(singleArticle => {
    //     this.article = singleArticle.article;
    //   });
    // });

    // this.route.paramMap
    //   .pipe(
    //     map(paramMap => paramMap.get('id')),
    //     switchMap(id => this.postService.getArticle(id))
    //   )
    //   .subscribe(singleArticle => {
    //     this.article = singleArticle.article;
    //   });

    this.article$ = this.route.paramMap.pipe(
      map(paramMap => paramMap.get('id')),
      switchMap(id => this.postService.getArticle(id)),
      map(singleArticle => singleArticle.article),
      // share()
      shareReplay(1)
    );
  }
}
