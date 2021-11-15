import { Component, Input, OnInit } from '@angular/core';
import { TaskData } from 'src/app/shared/interfaces';

type currentTool = '' | 'answerCode'

@Component({
  selector: 'app-practice-answer',
  templateUrl: './practice-answer.component.html',
  styleUrls: ['./practice-answer.component.scss']
})
export class PracticeAnswerComponent implements OnInit {
  editorOptions = {theme: 'vs-dark', language: 'javascript'};
  public toolTipDelay = 1000

  @Input('task') public task!: TaskData
  public currentHandlingData = ''
  public currentTool: currentTool = ''

  constructor() { }

  ngOnInit(): void {
  }

  public editTaskAnswer() {
    this.currentTool ? this.currentTool = '' : this.currentTool = 'answerCode'
    this.currentHandlingData = this.task.answerCode
  }

  public deleteTaskAnswer() {
    this.task.answerCode = ''
  }

  public createTaskAnswer() {
    if (!this.currentHandlingData) return

   this.task.answerCode = this.currentHandlingData
   this.currentTool = ''
   this.currentHandlingData = ''
  }

  public cancelCreateTaskAnswer() {
    this.currentTool = ''
    this.currentHandlingData = ''
  }
}
