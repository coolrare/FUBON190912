import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';
import { PostService } from '../post.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  form = this.fb.group({
    title: this.fb.control('test'),
    description: this.fb.control(''),
    body: this.fb.control('body...'),
    tagList: this.fb.array([this.fb.control('HTML'), this.fb.control('CSS'), this.fb.control('JavaSCript')])
  });

  get tags() {
    return (this.form.get('tagList') as FormArray).controls;
  }

  constructor(private fb: FormBuilder, private postService: PostService) {}

  ngOnInit() {
    // console.log(this.form.get('tagList').controls);
    // console.log();
  }

  addTag() {
    (this.form.get('tagList') as FormArray).push(this.fb.control(''));
  }

  removeTag(index: number) {
    (this.form.get('tagList') as FormArray).removeAt(index);
  }

  save() {
    this.form.get('description').setValue(this.form.get('body').value);
    console.log(this.form.value);
    this.postService.createArticle(this.form.value).subscribe(result => {
      console.log(result);
    });
  }
}
