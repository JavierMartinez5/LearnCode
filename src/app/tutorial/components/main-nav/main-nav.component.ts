import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subject, Subscription } from 'rxjs';
import { map, shareReplay, take, takeUntil } from 'rxjs/operators';
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
  
  private isComponentInited = false
  private lastTutorialName = ''
  private lastChapterId = ''
  private unsubscribeTutorial$ = new Subject<any>()
  public isDownloading = false
  
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
      this.unsubscribeTutorial$.next()

      if (this.lastTutorialName !== this.currentTutorialName) {
        this.isComponentInited = false
      }
      
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
    
          if (!this.isComponentInited) {
            this.theoryData = []
            this.testsData = []
            this.practiceData = []
            this.isComponentInited = true
            this.lastTutorialName = this.currentTutorialName
          }

          this.navigate(
            this.currentTutorialName,
            this.chapterId,
            this.sectionTitle
          );
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

  public onChapterClick(chapterId: string) {
    this.chapterId = chapterId
    this.theoryData = []
    this.testsData = []
    this.practiceData = []

    if (this.sectionTitle) {
      this.onClickSectionLinkHandler(this.sectionTitle)
    } else {
      this.onClickSectionLinkHandler(this.links[0].sectionRouteTitle)
    } 
  }

  public onClickSectionLinkHandler(sectionRouteTitle: string) {
    this.sectionTitle = sectionRouteTitle;
    this.unsubscribeTutorial$.next()

    if (this.sectionTitle === 'theory') {
      if (this.theoryData.length && (this.lastChapterId === this.chapterId)) return
      this.isDownloading = true
      this.theoryData = []
      this.tutorialService
        .getTheorySectionData(this.currentTutorialName, this.chapterId)
        .pipe(takeUntil(this.unsubscribeTutorial$))
        .subscribe((data: Array<TheoryData[]>) => {
          this.theoryData = data;
          this.lastChapterId = this.chapterId
          this.isDownloading = false
        }, () => {this.isDownloading = false})
    }

    if (this.sectionTitle === 'tests') {
      if (this.testsData.length && (this.lastChapterId === this.chapterId)) return
      this.isDownloading = true
      this.testsData = []
      this.tutorialService
        .getTestsSectionData(this.currentTutorialName, this.chapterId)
        .pipe(takeUntil(this.unsubscribeTutorial$))
        .subscribe((data: TestData[]) => {
          this.testsData = data;
          this.lastChapterId = this.chapterId
          this.isDownloading = false
        }, () => {this.isDownloading = false})
    }

    if (this.sectionTitle === 'practice') {
      if (this.practiceData.length && (this.lastChapterId === this.chapterId)) return
      this.isDownloading = true
      this.practiceData = []
      this.tutorialService
        .getPracticeSectionData(this.currentTutorialName, this.chapterId)
        .pipe(takeUntil(this.unsubscribeTutorial$))
        .subscribe((data: TaskData[]) => {
          this.practiceData = data;
          this.lastChapterId = this.chapterId
          this.isDownloading = false
        }, () => {this.isDownloading = false})
    }
  }
}
