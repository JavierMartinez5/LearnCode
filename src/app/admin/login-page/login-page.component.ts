import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MyErrorStateMatcher } from 'src/app/shared/validation.errors';
import { AlertService } from '../services/alert.service';
import { AuthService, User } from '../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public form!: FormGroup
  public matcher = new MyErrorStateMatcher();
  public isSubmitted = false
  message!: string

  constructor(public auth: AuthService, private router: Router, private route: ActivatedRoute, private alertService: AlertService) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe((params: Params) => {
      if (params.logingAgain) {
        this.message = 'To be able open that page you should do login first'
      } else if (params.authFailed) {
        this.message = 'Session time is up. Please authorize again'
      }
    })

    this.form = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [Validators.required])
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }
    this.isSubmitted = true
    // for backEnd
    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    }
    this.auth.login(user).subscribe(()=> {
      this.form.reset()
      this.router.navigate(['/admin', 'dashboard'])
      this.isSubmitted = false
      this.alertService.success('login has succeeded!')
    }, () => {
      this.isSubmitted = false
    })
    
  }

}
