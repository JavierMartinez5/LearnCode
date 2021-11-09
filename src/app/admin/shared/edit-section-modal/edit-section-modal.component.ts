import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Chapter, MainNavData } from 'src/app/shared/interfaces';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';


export interface EditSectionDataIn {
  block: MainNavData
}

@Component({
  selector: 'app-edit-section-modal',
  templateUrl: './edit-section-modal.component.html',
  styleUrls: ['./edit-section-modal.component.scss']
})
export class EditSectionModalComponent implements OnInit {

  public blockName = ''
  public chapters: Chapter[] = []
  public isDragAndDrop = false
  public currentChapterId = ''
  public chapterEditMood = ''

  constructor(@Inject(MAT_DIALOG_DATA) public data: EditSectionDataIn) { }

  ngOnInit(): void {
    this.chapters = JSON.parse(JSON.stringify([...this.data.block.chapters]))
    this.blockName = this.data.block.sectionTitle
  }

  public openEditInput(chapterId: string, chapterEditMood: string) {
    this.chapterEditMood = chapterEditMood
    this.currentChapterId = chapterId
  }

  public deleteChapter(chapter: Chapter) {
    this.chapters = this.chapters.filter(item => {
      return item.id !== chapter.id
    })
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.chapters, event.previousIndex, event.currentIndex);
  }

  public submit() {
    if (!this.blockName) return null
    
    const block: MainNavData = {
      ...this.data.block,
      sectionTitle: this.blockName,
      chapters: this.chapters
    }
    return block
  }
}
