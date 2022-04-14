import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  })
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  async login() {
    console.log(this.loginForm.invalid)
    if (this.loginForm.invalid) return

    try {

      Swal.fire({
        title: 'Loading',
        didOpen: () => {
          Swal.showLoading()
        }
      })
      const { email, password } = this.loginForm.value;
      const session = await this.authService.login(email, password);
      console.log(session)
      Swal.close();
      this.router.navigate(['/'])
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: "Error",
        text: error.message,
      })
    }


  }

}
