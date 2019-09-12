import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Articles } from '../article';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  articles: Articles;

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.getArticles().subscribe(articles => {
      this.articles = articles;
    });
  }

}
