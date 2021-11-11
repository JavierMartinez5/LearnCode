import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Chapter, ChapterOnCreate, MainNavData, MainNavDataOnCreate, TestData, TheoryData, TheoryDataOnCreate } from 'src/app/shared/interfaces';

export interface NewChaptersData {
  position: string
  blockId: string
  chapters: Chapter[]
}

export interface NewBlockData {
  position: string
  block: MainNavData
}

@Injectable()
export class ContentBuilderService {
  public tutorialName: string = ''

  constructor(private http: HttpClient) { }

  postNewBlock(tutorialName: string, position: string, block: MainNavDataOnCreate): Observable<NewBlockData | null> {
    // this.http.post('/tutorialName/', data)

    const newChapters: Chapter[] = block.chapters.map((item: ChapterOnCreate) => {
      return { ...item, id: `chapterId-${Math.random()}` };
    })

    const newBlock: MainNavData = {
      ...block,
      id: `id-${Math.random()}`,
      chapters: newChapters
    }
    const data: NewBlockData = {position, block: newBlock}

    return of(data)
  }

  postNewChapters(tutorialName: string, position: string, blockId: string, chapters: ChapterOnCreate[]): Observable<NewChaptersData> {
    
    // this.http.post('/tutorialName/', data)

    const newChapters: Chapter[] = chapters.map((item) => {
      return { ...item, id: `chapter-id-${Math.random()}` };
    });

    const data: NewChaptersData = {position, blockId, chapters: newChapters}

    return of(data)
  }

  renewBlock(tutorialName: string, block: MainNavData): Observable<MainNavData> {
    // this.http.post('/tutorialName/', data)

    return of(block)
  }

  deleteBlock(tutorialName: string, blockId: string): Observable<string> {
    // this.http.delete('/tutorialName/', data)

    return of(blockId)
  }

  shuffleBlocks(tutorialName: string, blocks: MainNavData[]): Observable<MainNavData[]> {
    //http request
    return of(blocks)
  }

  public renewTheoryData(theoryData: Array<TheoryData[]>): Observable<Array<TheoryData[]>> {
    //http request

    //temporary
    return of(theoryData).pipe(delay(3000))
  }

  public renewTestsData(testsData: TestData[]): Observable<TestData[]> {
    return of(testsData).pipe(delay(3000))
  }


}
