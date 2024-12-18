import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
})
export class RegistrarPage implements OnInit {
  registerForm: FormGroup;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private formBuilder: FormBuilder
  ) {
    this.registerForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-zA-Z0-9._%+-]+@duocuc\\.cl$')
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(7),
          Validators.pattern('^[a-zA-Z0-9]+$')
        ]
      ]
    });
  }

  ngOnInit() {}

  async register() {
    if (this.registerForm.invalid) {
      alert("Por favor, complete todos los campos correctamente.");
      return;
    }

    const { email, password } = this.registerForm.value;

    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      console.log("Usuario registrado:", userCredential.user);
      alert("Usuario registrado exitosamente");
      this.router.navigate(['/login']);
    } catch (error) {
      console.error("Error al registrar:", error);

      if (error instanceof Error) {
        alert("Error al registrar: " + error.message);
      } else {
        alert("Error desconocido al registrar");
      }
    }
  }
}
