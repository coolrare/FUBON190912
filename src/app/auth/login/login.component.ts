import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginFail } from '../login-user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  redirect = '/';

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe(queryParamMap => {
      // console.log(queryParamMap);
      this.redirect = queryParamMap.get('redirect');
    });
  }

  login(form: NgForm) {
    if (form.valid) {
      this.authService.login(form.value.email, form.value.password).subscribe(
        result => {
          console.log(result);
          this.authService.setLogin(result.user.token);
          // localStorage.setItem('apiKey', result.user.token);
          this.router.navigateByUrl(this.redirect);
        },
        (err: HttpErrorResponse) => {
          alert((err.error as LoginFail).body[0]);
        }
      );
    }
  }
}
