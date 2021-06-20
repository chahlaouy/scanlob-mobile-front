import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage implements OnInit{


  public cart: any
  public total: any
  
  constructor(public actionSheetController: ActionSheetController,private cartService: CartService) {}
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

  ngOnInit(){
    this.cartService.cartData.subscribe(data => {
      this.cart = data;
    });

    this.cartService.cartTotal.subscribe(total => this.total = total);
  }
}
