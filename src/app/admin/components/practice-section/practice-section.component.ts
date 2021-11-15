import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { fadeIn, fadeOut } from 'ng-animate';
import { take } from 'rxjs/operators';
import { TaskData } from 'src/app/shared/interfaces';
import { ContentBuilderService } from '../../services/content-builder.service';
import { ModalsService } from '../../services/modals.service';
import { CreateTaskDataOut } from '../../shared/create-tasks/create-tasks.component';

@Component({
  selector: 'app-practice-section',
  templateUrl: './practice-section.component.html',
  styleUrls: ['./practice-section.component.scss'],
  animations: [
    trigger('fade', [
      transition('* => void', useAnimation(fadeOut, {
        params: {
          timing: 0.3,
        }
      })),
      transition('void => *', useAnimation(fadeIn, {
        params: {
          timing: 0.6,
        }
      }))
    ]),
  ],
})
export class PracticeSectionComponent implements OnInit {
  public toolTipDelay = 1000

  @Input() public practiceData: TaskData[] = []
  public dataWithChanges: TaskData[] = []

  editorOptions = {theme: 'vs-dark', language: 'javascript'};
  isTrueAnswer: boolean = false
  currentTaskId: string = ''
  public isLoading = false
  public isCreateContentOpen = false
  public isChanges = false
  public isSaveChangesBlockOpen = false

  constructor(private contentBuilderService: ContentBuilderService, private modalsService: ModalsService) { }

  ngOnInit(): void {
    this.dataWithChanges = JSON.parse(JSON.stringify(this.practiceData))
  }

  checkCode(code: string | undefined, id: string) {
    if (!code?.trim()) return
    this.currentTaskId = id
    // check on server side
    this.isTrueAnswer = !!Math.round(Math.random())
  }

  public deleteAllContent() {
    this.dataWithChanges = []
    this.isChanges = true
  }

  public shuffleTests() {
    this.modalsService
      .openShuffleTasksModal(this.dataWithChanges)
      .subscribe((data) => {
        if (!data) return;
        this.dataWithChanges = data;
        this.isChanges = true
      })
  }

  public saveConfirmation(action: string) {
    if (action === 'save') {
      this.isLoading = true

      this.contentBuilderService.renewPracticeData(this.dataWithChanges).pipe(take(1)).subscribe(tasks => {
        this.practiceData = JSON.parse(JSON.stringify(tasks))
        this.dataWithChanges = JSON.parse(JSON.stringify(tasks))
        this.isChanges = false
        this.isLoading = false
        this.isSaveChangesBlockOpen = false
      }, () => {this.isLoading = false})
    }

    if (action === 'remove') {
      this.dataWithChanges = JSON.parse(JSON.stringify(this.practiceData))
      this.isChanges = false
      this.isSaveChangesBlockOpen = false
    }

    if (action === 'close') {
      this.isSaveChangesBlockOpen = false
    }
  }

  public onCreateTask(data: CreateTaskDataOut | null) {
    if (!data) {
      this.isCreateContentOpen = false
      return
    }
    console.log('task2-create', data.createdContent)

    if (data.position === 'top') {
      this.dataWithChanges = [data.createdContent, ...this.dataWithChanges]
    } else if (data.position === 'bottom') {
      this.dataWithChanges = [...this.dataWithChanges, data.createdContent]
    }
    this.isCreateContentOpen = false

    this.isChanges = true
  }

  public deleteTask(taskId: string) {
    this.dataWithChanges = this.dataWithChanges.filter(task => task.id !== taskId)
  }
}
