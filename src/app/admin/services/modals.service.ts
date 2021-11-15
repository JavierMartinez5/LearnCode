import { Injectable } from '@angular/core';
import { Chapter, ChapterOnCreate, MainNavData, MainNavDataOnCreate, TestData, TaskData } from 'src/app/shared/interfaces';
import { MatDialog } from '@angular/material/dialog';
import { ShuffleSectionModalComponent } from '../shared/shuffle-section-modal/shuffle-section-modal.component';
import { ContentBuilderService, NewBlockData, NewChaptersData } from './content-builder.service';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DeleteModalComponent } from '../shared/delete-modal/delete-modal.component';
import { EditSectionModalComponent } from '../shared/edit-section-modal/edit-section-modal.component';
import { AddChapterModal, AddChapterModalComponent } from '../shared/add-chapter-modal/add-chapter-modal.component';
import { AddSectionModal, AddSectionModalComponent } from '../shared/add-section-modal/add-section-modal.component';
import { ShuffleTestsModalComponent } from '../components/modals/shuffle-tests-modal/shuffle-tests-modal.component';
import { ShuffleTasksModalComponent } from '../components/modals/shuffle-tasks-modal/shuffle-tasks-modal.component';


@Injectable()
export class ModalsService {

  constructor(public dialog: MatDialog, private contentBuilderService: ContentBuilderService) { }

  public openAddContentModal(tutorialName: string) {

  }

  public openDeleteContentModal(tutorialName: string) {

  }

  public openDeleteAllContentModal(tutorialName: string) {

  }

  public openShuffleBlocksModal(tutorialName: string, blocks: MainNavData[]): Observable<MainNavData[] | null> {
    const dialogRef = this.dialog.open(ShuffleSectionModalComponent, {
      data: {
        blocks,
      },
    });

    return dialogRef.afterClosed().pipe(switchMap((blocks: MainNavData[]) => {
      console.log('uuuu', blocks)
      if (!blocks) return of(null)
      return this.contentBuilderService.shuffleBlocks(tutorialName, blocks)
    }))
  }

  public openDeleteBlockModal(tutorialName: string, block: MainNavData): Observable<string | null> {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      data: {
        blockName: block.sectionTitle,
      },
    });

    return dialogRef.afterClosed().pipe(switchMap((confirmation: boolean) => {
      if (!confirmation) return of(null);
      return this.contentBuilderService.deleteBlock(tutorialName, block.id)
    }))
  }

  public openEditBlockModal(tutorialName: string, block: MainNavData): Observable<MainNavData | null> {
    const dialogRef = this.dialog.open(EditSectionModalComponent, {
      data: {
        block,
      },
    });

    return dialogRef.afterClosed().pipe(switchMap((newBlock: MainNavData | null) => {
      if (!newBlock) return of(null);
      return this.contentBuilderService.renewBlock(tutorialName, newBlock)
    }))
  }

  public openAddChapterModal(tutorialName: string, blockId: string, blockName: string): Observable<NewChaptersData | null> {
    const dialogRef = this.dialog.open(AddChapterModalComponent, {
      data: {
        blockName,
      },
    });

    return dialogRef
      .afterClosed().pipe(switchMap((returnedValue: AddChapterModal | null) => {
        if (!returnedValue) return of(null);
        const result: ChapterOnCreate[] = returnedValue.chapters;

        
        return this.contentBuilderService.postNewChapters(tutorialName, returnedValue.position, blockId, result)
      }))  
  }

  public openAddBlockModal(tutorialName: string): Observable<NewBlockData | null> {
    const dialogRef = this.dialog.open(AddSectionModalComponent, {
      data: {
        tutorialName,
      },
    });

    return dialogRef
      .afterClosed()
      .pipe(switchMap((returnedValue: AddSectionModal | null) => {
        if (!returnedValue) return of(null);
        const result: MainNavDataOnCreate = returnedValue.block;
        return this.contentBuilderService.postNewBlock(tutorialName, returnedValue.position, result)
      }))
      // .subscribe((returnedValue: AddSectionModal | null) => {
      //   if (!returnedValue) return;

      //   const result: MainNavDataOnCreate = returnedValue.block;

      //   this.contentBuilderService
      //     .postNewBlock(this.currentTutorialName, 'start', result)
      //     .subscribe(
      //       () => {
      //         // this.isSubmitted = false;
      //         // this.alertService.success('login has succeeded!')
      //       },
      //       () => {
      //         // this.isSubmitted = false;
      //       }
      //     );
      //   // !!!!! TEMPORARY !!!! NEED BACKEND
      //   function resultHandler(chapters: ChapterOnCreate[]): Chapter[] {
      //     return chapters.map((item: ChapterOnCreate, i) => {
      //       return { ...item, id: `${i}` };
      //     });
      //   }
      //   const newNavData: MainNavData = {
      //     id: `id-${Math.random()}`,
      //     ...result,
      //     chapters: resultHandler(result.chapters),
      //   };

      //   if (returnedValue.position === 'top') {
      //     this.navData = [newNavData, ...this.navData];
      //   } else if (returnedValue.position === 'bottom') {
      //     this.navData = [...this.navData, newNavData];
      //   }
      // });
  }

  public openShuffleTestsModal(tests: TestData[]): Observable<TestData[]> {

    const dialogRef = this.dialog.open(ShuffleTestsModalComponent, {
      data: {
        tests,
      },
    });

    return dialogRef.afterClosed()
  }

  public openShuffleTasksModal(tasks: TaskData[]): Observable<TaskData[]> {

    const dialogRef = this.dialog.open(ShuffleTasksModalComponent, {
      data: {
        tasks,
      },
    });

    return dialogRef.afterClosed()
  }
}
