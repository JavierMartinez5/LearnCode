import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { tap } from "rxjs/operators";
import { TutorialService } from "./tutorial.service";

@Injectable({
  providedIn: 'root'
})
export class SelectTutorialService {
  constructor(
    private readonly router: Router,
    private readonly tutorialService: TutorialService,
  ) {}

  public selectTutorial(tutorialName: string) {
    return this.tutorialService.pluckFirstChapter(tutorialName).pipe(tap(chapterId => {
      this.router.navigate(
        ['/admin', 'tutorial', tutorialName], 
        { queryParams: { chapterId, sectionTitle: 'theory'}}
      );
    }));
  }
}