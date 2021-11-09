import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChapterOnCreate } from 'src/app/shared/interfaces';

export interface AddChapter {
  blockName: string
}

export interface AddChapterModal {
  chapters: ChapterOnCreate[]
  position: string
}

@Component({
  selector: 'app-add-chapter-modal',
  templateUrl: './add-chapter-modal.component.html',
  styleUrls: ['./add-chapter-modal.component.scss'],
})
export class AddChapterModalComponent implements OnInit {

  public chapters: ChapterOnCreate[] = [{chapterTitle: ''}]
  public position = 'top'

  constructor(@Inject(MAT_DIALOG_DATA) public data: AddChapter) {}

  ngOnInit(): void {}

  public addChapterInputField() {
    this.chapters.push({chapterTitle: ''})
  }

  submit() {
    if (!this.chapters[0].chapterTitle) return null

    const returnModalData : AddChapterModal = {
      chapters: this.chapters, 
      position: this.position
    }

    return returnModalData
  }
}
