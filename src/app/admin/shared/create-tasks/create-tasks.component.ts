import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TaskData } from 'src/app/shared/interfaces';

export interface CreateTaskDataOut {
  createdContent: TaskData
  position: string
}

@Component({
  selector: 'app-create-tasks',
  templateUrl: './create-tasks.component.html',
  styleUrls: ['./create-tasks.component.scss']
})
export class CreateTasksComponent implements OnInit {

  @Output('onCreateTask') onCreateTask: EventEmitter<CreateTaskDataOut | null> = new EventEmitter()

  public task: TaskData = {
    id: `temporaryId-${Math.random()}`,
    taskText: '',
    taskCode: '',
    answerCode: ''
  }
  public position = 'bottom'

  constructor() { }

  ngOnInit(): void {
  }

  public finishCreation(cancel?: boolean) {
    if (cancel) {
    this.onCreateTask.emit(null)
      return
    }
    console.log('task-create', this.task)
    this.onCreateTask.emit({createdContent: this.task, position: this.position})
  }

}
