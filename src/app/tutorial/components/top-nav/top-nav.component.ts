import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TutorialService } from 'src/app/shared/services/tutorial.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
  public tutorialNameList!: string[]

  constructor(private route: ActivatedRoute, private tutorialService: TutorialService, private router: Router) { }

  ngOnInit(): void {
    this.tutorialService.getTutorialNameList().subscribe((list: string[]) => {
      this.tutorialNameList = list
    })
  }

  public navigate(tutorialName: string) {
    this.router.navigate(['tutorial', tutorialName])
  }
}
