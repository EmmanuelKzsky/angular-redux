import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  })

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  async crearUsuario() {
    if (this.registrationForm.invalid) return;
    Swal.fire({
      title: 'Loading',
      didOpen: () => {
        Swal.showLoading()
      }
    })
    const { nombre, email, password } = this.registrationForm.value
    try {
      const credenciales = await this.authService.crearUsuario(nombre, email, password);
      console.log(credenciales)
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
