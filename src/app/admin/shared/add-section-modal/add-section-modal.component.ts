import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChapterOnCreate, MainNavDataOnCreate } from 'src/app/shared/interfaces';

export interface AddBlockData {
  tutorialName: string;
}

export interface AddSectionModal {
  block: MainNavDataOnCreate
  position: string
}

@Component({
  selector: 'app-add-section-modal',
  templateUrl: './add-section-modal.component.html',
  styleUrls: ['./add-section-modal.component.scss']
})
export class AddSectionModalComponent implements OnInit {
  public blockName = ''
  public chapters: ChapterOnCreate[] = []
  public position = 'top'

  constructor(@Inject(MAT_DIALOG_DATA) public data: AddBlockData) { }

  ngOnInit(): void {
  }

  public addChapterInputField() {
    this.chapters.push({chapterTitle: ''})
  }

  submit() {
    if (!this.blockName) return null
    
    const block: MainNavDataOnCreate = {
      sectionTitle: this.blockName,
      chapters: this.chapters
    }

    const returnModalData : AddSectionModal = {
      block: block,
      position: this.position
    }

    return returnModalData
  }
}
