import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  constructor(public actionSheetController: ActionSheetController) {}
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: "Déclaration D'un Object",
      cssClass: 'text-sm',
      buttons: [
        {
          text: "Déclarer une nouvelle object",
          role: 'destructive',
          icon: 'add-circle',
          handler: () => {
            console.log('Delete clicked');
          },
        },
        {
          text: "Déclarer un object perdue",
          role: 'destructive',
          icon: 'warning',
          handler: () => {
            console.log('Delete clicked');
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
