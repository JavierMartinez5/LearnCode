import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TutorialService } from 'src/app/shared/services/tutorial.service';
import { MainNavData, TabsLink, TaskData, TestData, TheoryData } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit, OnDestroy {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  
  public navData: MainNavData[] = []
  public currentTutorialName!: string
  public chapterId!: string;
  public sectionTitle!: string;

  public theoryData: Array<TheoryData[]> = []
  public testsData: TestData[] = []
  public practiceData: TaskData[] = []

  public links: TabsLink[] = [{linkTitle: 'ТЕОРІЯ', sectionRouteTitle: 'theory'}, {linkTitle: 'ТЕСТИ', sectionRouteTitle: 'tests'}, {linkTitle: 'ЗАВДАННЯ', sectionRouteTitle: 'practice'}]

  private getTutorialNavDataSub!: Subscription

  constructor(private breakpointObserver: BreakpointObserver, private route: ActivatedRoute, private tutorialService: TutorialService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.currentTutorialName = params.language
      
      this.getTutorialNavDataSub = this.tutorialService.getTutorialMainNavData(params.language).subscribe((navData: MainNavData[]) => {
        this.navData = navData

        this.route.queryParams.subscribe((params: Params) => {
    
          if (params.chapterId) {
            this.chapterId = params.chapterId;
          } else {
            if (!this.navData[0].chapters) return
            this.chapterId = this.navData[0].chapters[0].id;
          }
    
          if (params.sectionTitle) {
            this.sectionTitle = params.sectionTitle;
          } else {
            this.sectionTitle = 'theory';
          }
    
          this.navigate(this.currentTutorialName, this.chapterId, this.sectionTitle)
        })
      })
    })

    
  }

  ngOnDestroy() {
    if (this.getTutorialNavDataSub) {
      this.getTutorialNavDataSub.unsubscribe()
    }
  }

  public navigate(
    tutorialName: string = this.currentTutorialName,
    chapterId: string,
    sectionTitle: string = 'theory'
  ) {
    this.router.navigate(['/tutorial', tutorialName], {
      queryParams: {
        chapterId: chapterId,
        sectionTitle: sectionTitle,
      },
    });
    this.onClickSectionLinkHandler(this.sectionTitle)
  }

  public onClickChupterLinkHandler(chupterId: string) {
    this.chapterId = chupterId
    
  }

  public onClickSectionLinkHandler(sectionRouteTitle: string) {
    this.sectionTitle = sectionRouteTitle

    if (this.sectionTitle === 'theory') {
      this.tutorialService.getTheorySectionData(this.currentTutorialName, this.chapterId).subscribe((data: Array<TheoryData[]>) => {
        this.theoryData = data
      }).unsubscribe()
    }
    
    if (this.sectionTitle === 'tests') {
      this.tutorialService.getTestsSectionData(this.currentTutorialName, this.chapterId).subscribe((data: TestData[]) => {
        this.testsData = data
      }).unsubscribe()
    }

    if (this.sectionTitle === 'practice') {
      this.tutorialService.getPracticeSectionData(this.currentTutorialName, this.chapterId).subscribe((data: TaskData[]) => {
        this.practiceData = data
      }).unsubscribe()
    }
  }
}
