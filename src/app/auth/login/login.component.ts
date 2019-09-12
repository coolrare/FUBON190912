import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginFail } from '../login-user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {}

  login() {
    this.authService.login(this.email, this.password).subscribe(
      result => {
        console.log(result);
        this.router.navigateByUrl('/');
      },
      (err: HttpErrorResponse ) => {
        alert((err.error as LoginFail).body[0]);
      }
    );
  }
}
