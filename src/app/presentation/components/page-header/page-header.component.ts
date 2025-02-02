import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
  imports: [CommonModule, IonicModule],
})
export class PageHeaderComponent implements OnInit {
  @Input() pageTitle!: string;
  @Input() showActionButton = false;
  @Input() actionButtonLabel = '';
  @Input() actionButtonIcon = '';
  @Output() actionButtonRequest = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

  emitActionButtonRequest() {
    this.actionButtonRequest.emit();
  }
}
