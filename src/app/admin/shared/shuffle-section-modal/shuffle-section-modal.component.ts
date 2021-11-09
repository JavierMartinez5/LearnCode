import { Component, Inject, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MainNavData } from 'src/app/shared/interfaces';

export interface ShuffleSectionDataIn {
  blocks: MainNavData[]
}

@Component({
  selector: 'app-shuffle-section-modal',
  templateUrl: './shuffle-section-modal.component.html',
  styleUrls: ['./shuffle-section-modal.component.scss']
})
export class ShuffleSectionModalComponent implements OnInit {

  public blocks: MainNavData[] = []

  constructor(@Inject(MAT_DIALOG_DATA) public data: ShuffleSectionDataIn) { }

  ngOnInit(): void {
    this.blocks = JSON.parse(JSON.stringify(this.data.blocks))
  }

  drop(event: CdkDragDrop<MainNavData[]>) {
    moveItemInArray(this.blocks, event.previousIndex, event.currentIndex);
  }

  public submit() {
    return JSON.parse(JSON.stringify(this.blocks))
  }
}
