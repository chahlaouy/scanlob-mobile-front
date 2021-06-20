import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {IonCheckbox, MenuController} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @Output('checkbox') checkbox: EventEmitter<any> = new EventEmitter<any>();
  @Input('categories') categories: any[] = [];

  collapsed: boolean;

  @ViewChild('checkbox', {static: false}) ionCheckbox : IonCheckbox;


  constructor(private menuController: MenuController,
              private router: Router) { }

  ngOnInit() {
    this.collapsed = true;
  }


  onClick() {
    this.collapsed = !this.collapsed;
  }

  checkboxSelected(ev: any) {
    this.menuController.close('filter').then();

    this.checkbox.emit({
      name: ev.target.name,
      selected: ev.target.checked
    });
  }

  closeMenu() {
    this.menuController.close('filter').then();
  }
}