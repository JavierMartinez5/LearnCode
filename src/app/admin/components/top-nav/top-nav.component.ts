import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TutorialService } from 'src/app/shared/services/tutorial.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
  public tutorialNameList!: string[]

  constructor(private tutorialService: TutorialService, private router: Router, public auth: AuthService) { }

  ngOnInit(): void {
    this.tutorialService.getTutorialNameList().subscribe((list: string[]) => {
      this.tutorialNameList = list
    }).unsubscribe()
  }

  public navigate(tutorialName: string) {
    this.router.navigate(['/admin', 'tutorial', tutorialName])
  }

  logout() {
    this.auth.logout()
    this.router.navigate(['/admin', 'login'])
  }
}
