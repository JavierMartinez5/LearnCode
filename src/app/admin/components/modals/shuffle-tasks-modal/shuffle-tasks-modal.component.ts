import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskData } from 'src/app/shared/interfaces';

export interface ShuffleTasksDataIn {
  tasks: TaskData[]
}

@Component({
  selector: 'app-shuffle-tasks-modal',
  templateUrl: './shuffle-tasks-modal.component.html',
  styleUrls: ['./shuffle-tasks-modal.component.scss']
})
export class ShuffleTasksModalComponent implements OnInit {
  public tasks: TaskData[] = []

  constructor(@Inject(MAT_DIALOG_DATA) public data: ShuffleTasksDataIn) { }

  ngOnInit(): void {
    this.tasks = JSON.parse(JSON.stringify(this.data.tasks))
  }

  drop(event: CdkDragDrop<TaskData[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
  }

  public submit() {
    return JSON.parse(JSON.stringify(this.tasks))
  }
}
