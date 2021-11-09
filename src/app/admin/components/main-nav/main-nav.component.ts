import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TutorialService } from 'src/app/shared/services/tutorial.service';
import {
  MainNavData,
  TabsLink,
  TaskData,
  TestData,
  TheoryData,
} from 'src/app/shared/interfaces';

import {
  NewBlockData,
  NewChaptersData,
} from '../../services/content-builder.service';

import { ModalsService } from '../../services/modals.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
})
export class MainNavComponent implements OnInit, OnDestroy {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  public navData: MainNavData[] = [];
  public currentTutorialName!: string;
  public chapterId!: string;
  public sectionTitle!: string;

  public theoryData: Array<TheoryData[]> = [];
  public testsData: TestData[] = [];
  public practiceData: TaskData[] = [];

  public links: TabsLink[] = [
    { linkTitle: 'ТЕОРІЯ', sectionRouteTitle: 'theory' },
    { linkTitle: 'ТЕСТИ', sectionRouteTitle: 'tests' },
    { linkTitle: 'ЗАВДАННЯ', sectionRouteTitle: 'practice' },
  ];

  private getTutorialNavDataSub!: Subscription;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private route: ActivatedRoute,
    private tutorialService: TutorialService,
    private router: Router,
    private modalsService: ModalsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.currentTutorialName = params.language;
      console.log(this.currentTutorialName);
      this.getTutorialNavDataSub = this.tutorialService
        .getTutorialMainNavData(params.language)
        .subscribe((navData: MainNavData[]) => {
          this.navData = navData;

          this.route.queryParams.subscribe((params: Params) => {
            if (!this.navData[0].chapters) return;

            if (params.chapterId) {
              this.chapterId = params.chapterId;
            } else {
              this.chapterId = this.navData[0].chapters[0].id;
            }

            if (params.sectionTitle) {
              this.sectionTitle = params.sectionTitle;
            } else {
              this.sectionTitle = 'theory';
            }

            this.navigate(
              this.currentTutorialName,
              this.chapterId,
              this.sectionTitle
            );
          });
        });
    });
  }

  ngOnDestroy() {
    if (this.getTutorialNavDataSub) {
      this.getTutorialNavDataSub.unsubscribe();
    }
  }

  public addNewBlock() {
    this.modalsService
      .openAddBlockModal(this.currentTutorialName)
      .subscribe((data: NewBlockData | null) => {
        if (!data) return;

        if (data.position === 'top') {
          this.navData = [data.block, ...this.navData];
        } else if (data.position === 'bottom') {
          this.navData = [...this.navData, data.block];
        }
      })
  }

  public addChapters(blockId: string, blockName: string) {
    this.modalsService
      .openAddChapterModal(this.currentTutorialName, blockId, blockName)
      .subscribe((data: NewChaptersData | null) => {
        if (!data) return;

        const currentBlock = this.navData.find((block: MainNavData) => {
          return block.id === blockId;
        });

        if (!currentBlock) return;

        if (data.position === 'top') {
          currentBlock.chapters = [...data.chapters, ...currentBlock.chapters];
        } else if (data.position === 'bottom') {
          currentBlock.chapters = [...currentBlock.chapters, ...data.chapters];
        }
      })
  }

  public editBlock(block: MainNavData, index: number) {
    this.modalsService
      .openEditBlockModal(this.currentTutorialName, block)
      .subscribe((newBlock: MainNavData | null) => {
        if (!newBlock) return;
        this.navData[index] = newBlock;
      })
  }

  public deleteBlock(block: MainNavData) {
    this.modalsService
      .openDeleteBlockModal(this.currentTutorialName, block)
      .subscribe((blockId) => {
        if (!blockId) return;
        this.navData = this.navData.filter((currentBlock) => {
          return blockId !== currentBlock.id;
        });
      })
  }

  public shuffleBlocks() {
    this.modalsService
      .openShuffleBlocksModal(this.currentTutorialName, this.navData)
      .subscribe((data) => {
        if (!data) return;
        this.navData = data;
      })
  }

  public navigate(
    tutorialName: string = this.currentTutorialName,
    chapterId: string,
    sectionTitle: string = 'theory'
  ) {
    this.router.navigate(['/admin', 'tutorial', tutorialName], {
      queryParams: {
        chapterId: chapterId,
        sectionTitle: sectionTitle,
      },
    });
    this.onClickSectionLinkHandler(this.sectionTitle);
  }


  public onClickSectionLinkHandler(sectionRouteTitle: string) {
    this.sectionTitle = sectionRouteTitle;

    if (this.sectionTitle === 'theory') {
      this.tutorialService
        .getTheorySectionData(this.currentTutorialName, this.chapterId)
        .subscribe((data: Array<TheoryData[]>) => {
          this.theoryData = data;
        })
        .unsubscribe();
    }

    if (this.sectionTitle === 'tests') {
      this.tutorialService
        .getTestsSectionData(this.currentTutorialName, this.chapterId)
        .subscribe((data: TestData[]) => {
          this.testsData = data;
        })
        .unsubscribe();
    }

    if (this.sectionTitle === 'practice') {
      this.tutorialService
        .getPracticeSectionData(this.currentTutorialName, this.chapterId)
        .subscribe((data: TaskData[]) => {
          this.practiceData = data;
        })
        .unsubscribe();
    }
  }
}
