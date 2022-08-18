import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'student-registration-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  @Output()
  closeMenuEmitter: EventEmitter<string> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  closeMenu() {
    this.closeMenuEmitter.emit('close');
  }
}
