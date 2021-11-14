import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectTutorialService } from 'src/app/shared/services/select-tutorial.service';
import { TutorialService } from 'src/app/shared/services/tutorial.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  public tutorialNameList!: string[]

  constructor(private tutorialService: TutorialService, private router: Router,  private selectTutorial: SelectTutorialService) { }

  ngOnInit(): void {
    this.tutorialService.getTutorialNameList().subscribe((list: string[]) => {
      this.tutorialNameList = list
    }).unsubscribe()
  }

  public navigate(tutorialName: string) {
    this.selectTutorial.selectTutorial(tutorialName).subscribe();
  }
}
