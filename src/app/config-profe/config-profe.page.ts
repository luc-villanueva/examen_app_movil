import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { getAuth, sendEmailVerification, verifyBeforeUpdateEmail, sendPasswordResetEmail } from 'firebase/auth';
import { addIcons } from 'ionicons';
import { personCircle, personCircleOutline, sunny, sunnyOutline } from 'ionicons/icons';

@Component({
  selector: 'app-config-profe',
  templateUrl: './config-profe.page.html',
  styleUrls: ['./config-profe.page.scss'],
})
export class ConfigProfePage implements OnInit {

  userEmail: string = '';
  paletteToggle = false;
  qrScannedToday = false;

  constructor(private alertController: AlertController, private router: Router) {
    addIcons({ personCircle, personCircleOutline, sunny, sunnyOutline });
  }

  async ngOnInit() {
    const auth = getAuth();
    const user = auth.currentUser;
      const qrScanned = localStorage.getItem('qrScanned') === 'true';
      const qrScannedDate = localStorage.getItem('qrScannedDate');
      const today = new Date().toISOString().split('T')[0];

      window.addEventListener('storage', (event) => {
        if (event.key === 'paletteToggle') {
          const newState = JSON.parse(event.newValue || 'false');
          this.initializeDarkPalette(newState);
        }
      });

    if (qrScanned && qrScannedDate) {
        const scannedDate = qrScannedDate.split('T')[0];
        this.qrScannedToday = scannedDate === today;
      }
    if (user) {
      this.userEmail = user.email || '';
    }

    const savedToggleState = localStorage.getItem('paletteToggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    if (savedToggleState !== null) {
      this.initializeDarkPalette(JSON.parse(savedToggleState));
    } else {
      this.initializeDarkPalette(prefersDark.matches);
    }

    prefersDark.addEventListener('change', (mediaQuery) => this.initializeDarkPalette(mediaQuery.matches));
  }



  initializeDarkPalette(isDark: boolean) {
    this.paletteToggle = isDark;
    this.toggleDarkPalette(isDark);
  }

  toggleChange(ev: any) {
    const isChecked = ev.detail.checked;
    this.toggleDarkPalette(isChecked);
    localStorage.setItem('paletteToggle', JSON.stringify(isChecked));
  }


  toggleDarkPalette(shouldAdd: boolean) {
    document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
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
      buttons: ['OK'],
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
          },
        },
        {
          text: 'Cerrar Sesión',
          handler: () => {
            sessionStorage.removeItem('token');
            this.router.navigate(['/login']);
          },
        },
      ],
    });

    await alert.present();
  }
}
