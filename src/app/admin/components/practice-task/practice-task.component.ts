import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { TaskData } from 'src/app/shared/interfaces';
import { TutorialService } from 'src/app/shared/services/tutorial.service';

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
  public isCorrectAnswer = false
  public isShowAnswerMsg = false
  public isLoadingAnswer = false

  constructor(private tutorialService: TutorialService) { }

  ngOnInit(): void {
  }

  public checkAnswer() {
    this.isLoadingAnswer = true
    this.tutorialService.checkTaskAnswer(this.task.id, this.task.taskCode).pipe(take(1)).subscribe((result) => {
      this.isCorrectAnswer = result
      this.isShowAnswerMsg = true
      this.isLoadingAnswer = false
    }, () => {this.isLoadingAnswer = false})
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
