import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { getAuth, sendEmailVerification, verifyBeforeUpdateEmail, sendPasswordResetEmail } from 'firebase/auth';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
})
export class ConfigPage implements OnInit {
  userEmail: string = '';

  constructor(private alertController: AlertController, private router: Router) {}

  async ngOnInit() {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      this.userEmail = user.email || '';
    }
  }

  async sendEmailToUpdateEmail() {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const alert = await this.alertController.create({
        header: 'Cambiar Correo',
        inputs: [
          {
            name: 'newEmail',
            type: 'email',
            placeholder: 'Ingresa el nuevo correo electrónico',
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
              const newEmail = data.newEmail;
              try {
                await verifyBeforeUpdateEmail(user, newEmail);
                const successAlert = await this.alertController.create({
                  header: 'Correo enviado',
                  message: `Se ha enviado un correo de confirmación a ${newEmail}.`,
                  buttons: ['OK'],
                });
                await successAlert.present();
              } catch (error) {
                console.error('Error al enviar correo de confirmación:', error);
              }
            },
          },
        ],
      });


      await alert.present();
    }
  }

  async sendEmailToResetPassword() {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user && this.userEmail) {
      try {
        await sendPasswordResetEmail(auth, this.userEmail);
        const successAlert = await this.alertController.create({
          header: 'Correo enviado',
          message: `Se ha enviado un correo para restablecer la contraseña a ${this.userEmail}.`,
          buttons: ['OK'],
        });
        await successAlert.present();
      } catch (error) {
        console.error('Error al enviar correo de restablecimiento de contraseña:', error);
        const errorAlert = await this.alertController.create({
          header: 'Error',
          message: 'No se pudo enviar el correo de restablecimiento. Inténtalo nuevamente.',
          buttons: ['OK'],
        });
        await errorAlert.present();
      }
    }
  }

  async showComingSoon(message: string) {
    const alert = await this.alertController.create({
      header: 'Próximamente',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async logout() {
    const alert = await this.alertController.create({
      header: 'Un momento!',
      message: '¿Estás seguro de que deseas cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancelado');
          }
        },
        {
          text: 'Cerrar Sesión',
          handler: () => {
            localStorage.removeItem('token');
            this.router.navigate(['/login']);
          }
        }
      ]
    });

    await alert.present();
  }
}
