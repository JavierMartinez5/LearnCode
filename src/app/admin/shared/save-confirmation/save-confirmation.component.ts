import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-save-confirmation',
  templateUrl: './save-confirmation.component.html',
  styleUrls: ['./save-confirmation.component.scss']
})
export class SaveConfirmationComponent implements OnInit {
  public toolTipDelay = 1000


  @Output('onAction') onAction: EventEmitter<string> = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  public action(action: string) {
    this.onAction.emit(action)
  }

}
