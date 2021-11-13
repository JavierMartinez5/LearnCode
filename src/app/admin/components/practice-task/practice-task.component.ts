import { Component, Input, OnInit } from '@angular/core';
import { TaskData } from 'src/app/shared/interfaces';

type currentTool = '' | 'taskText' | 'taskCode'

@Component({
  selector: 'app-practice-task',
  templateUrl: './practice-task.component.html',
  styleUrls: ['./practice-task.component.scss']
})
export class PracticeTaskComponent implements OnInit {
  editorOptions = {theme: 'vs-dark', language: 'javascript'};
  public toolTipDelay = 1000

  @Input('task') public task!: TaskData

  public currentHandlingData = ''
  public currentTool: currentTool = ''

  constructor() { }

  ngOnInit(): void {
  }

  public createBlock() {
    if (!this.currentHandlingData || !this.currentTool) return

    this.task[this.currentTool] = JSON.parse(JSON.stringify(this.currentHandlingData))

    this.clearData()
  }

  public cancelCreateBlock() {
    this.clearData()
  }

  public editTaskInfo(tool: currentTool) {
    if (tool === this.currentTool) {
      this.currentTool = ''
      return
    }

    this.currentTool = tool

    if (tool === "taskText") {
      this.currentHandlingData = JSON.parse(JSON.stringify(this.task.taskText))
    } else if (tool === "taskCode") {
      this.currentHandlingData = JSON.parse(JSON.stringify(this.task.taskCode))
    }
  }

  public deleteTaskInfo(tool: currentTool) {
    if (tool === 'taskText') {
      this.task.taskText = ''
    } else if (tool === 'taskCode') {
      this.task.taskCode = ''
    }
  }

  private clearData() {
    this.currentTool = ''
    this.currentHandlingData = ''
  }
}
