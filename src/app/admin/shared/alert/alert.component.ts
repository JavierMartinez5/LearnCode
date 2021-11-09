import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, Subscription } from 'rxjs';
import { Alert, AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {
  @Input() delay = 5000
  public text = ''
  public type = 'success'
  aSub!: Subscription
  durationInSeconds = 5;

  constructor(private alertService: AlertService) { }


  ngOnInit(): void {
    this.aSub = this.alertService.alert$.subscribe((alert: Alert) => {
      this.text = alert.text
      this.type = alert.type

      const timeoutId = setTimeout(() => {
        this.text = ''
        clearTimeout(timeoutId)
      }, this.delay);
    })
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }
}
