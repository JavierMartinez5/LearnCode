import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TestData } from 'src/app/shared/interfaces';

export interface ShuffleSectionDataIn {
  tests: TestData[]
}

@Component({
  selector: 'app-shuffle-tests-modal',
  templateUrl: './shuffle-tests-modal.component.html',
  styleUrls: ['./shuffle-tests-modal.component.scss']
})
export class ShuffleTestsModalComponent implements OnInit {

  public tests: TestData[] = []

  constructor(@Inject(MAT_DIALOG_DATA) public data: ShuffleSectionDataIn) { }

  ngOnInit(): void {
    this.tests = JSON.parse(JSON.stringify(this.data.tests))
  }

  drop(event: CdkDragDrop<TestData[]>) {
    moveItemInArray(this.tests, event.previousIndex, event.currentIndex);
  }

  public submit() {
    return JSON.parse(JSON.stringify(this.tests))
  }

}
