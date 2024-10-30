import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private alertController: AlertController,
    private afAuth: AngularFireAuth
  ) {}

  async onLogin() {
    console.log('Intentando iniciar sesión con:', this.email);

    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(this.email, this.password);
      console.log('Inicio de sesión exitoso:', userCredential);

      if (userCredential.user) {
        const uid = userCredential.user.uid;
        localStorage.setItem('token', uid);

        const email = userCredential.user.email;

        if (email) {
          if (email.endsWith('@duocuc.cl')) {
            console.log('Redirigiendo a la página del menú...');
            this.router.navigate(['/menu']);
          } else if (email.endsWith('@profesor.duocuc.cl')) {
            console.log('Redirigiendo a la página de inicio...');
            this.router.navigate(['/home']);
          } else {
            console.warn('Correo electrónico no autorizado:', email);
            const alert = await this.alertController.create({
              header: 'Error',
              message: 'Correo electrónico no autorizado.',
              buttons: ['OK'],
            });
            await alert.present();
          }
        }
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Credenciales incorrectas o error en el inicio de sesión.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }

  async forgotPassword() {
    console.log("Forgot Password clicked"); // Verificar si el click funciona
    const alert = await this.alertController.create({
      header: 'Restablecer Contraseña',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Ingresa tu correo electrónico',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Enviar',
          handler: async (data) => {
            const email = data.email;
            if (email) {
              try {
                await this.afAuth.sendPasswordResetEmail(email);
                const successAlert = await this.alertController.create({
                  header: 'Correo enviado',
                  message: `Se ha enviado un correo para restablecer la contraseña a ${email}.`,
                  buttons: ['OK'],
                });
                await successAlert.present();
              } catch (error) {
                console.error('Error al enviar correo de restablecimiento de contraseña:', error);
                const errorAlert = await this.alertController.create({
                  header: 'Error',
                  message: 'Hubo un problema al enviar el correo. Por favor, intenta nuevamente.',
                  buttons: ['OK'],
                });
                await errorAlert.present();
              }
            }
          },
        },
      ],
    });

    await alert.present();
  }

  ngOnInit() {}
}
