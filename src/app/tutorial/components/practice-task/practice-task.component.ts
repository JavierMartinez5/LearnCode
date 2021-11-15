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
}
