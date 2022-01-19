import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { fadeIn, fadeOut } from 'ng-animate';
import { take } from 'rxjs/operators';
import { TestData } from 'src/app/shared/interfaces';
import { ContentBuilderService } from '../../services/content-builder.service';
import { ModalsService } from '../../services/modals.service';
import { CreateTestsDataOut } from '../../shared/create-tests/create-tests.component';

export interface TestsStatistic {
  totalTests: number
  correctAnswers: number
  wrongAnswers: number
}

@Component({
  selector: 'app-tests-section',
  templateUrl: './tests-section.component.html',
  styleUrls: ['./tests-section.component.scss'],
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
export class TestsSectionComponent implements OnInit {

  @Input() public testsData!: TestData[]
  public dataWithChanges: TestData[] = []

  public taskAnswer = ''
  public currentTest = {}
  public msg = ''
  testsThatWasConfirmed: string[] = []
  public testsStatistic!: TestsStatistic

  public isLoading = false
  public isCreateContentOpen = false
  public isChanges = false
  public isSaveChangesBlockOpen = false
  public currentEditingTestId = ''
  public toolTipDelay = 1000

  constructor(private contentBuilderService: ContentBuilderService, private modalsService: ModalsService) { }

  ngOnInit(): void {
    this.dataWithChanges = JSON.parse(JSON.stringify(this.testsData))

    this.testsStatistic = {
      totalTests: this.dataWithChanges.length,
      correctAnswers: 0,
      wrongAnswers: 0
    }
  }

  public checkboxHandler(test: TestData) {
    const isAlreadeConfirmed = this.testsThatWasConfirmed.find(id => id === test.id)

    this.currentTest = test

    if (test.rightAnswer === this.taskAnswer) {
      this.msg = 'Вірно!'
      if (!isAlreadeConfirmed) {
        this.testsStatistic.correctAnswers++
      }
    } else {
      this.msg = 'Невірно!'
      if (!isAlreadeConfirmed) {
        this.testsStatistic.wrongAnswers++
      }
    }
    this.testsThatWasConfirmed = [...this.testsThatWasConfirmed, test.id]
  }

  public saveChanges() {
    this.isLoading = true
    this.isSaveChangesBlockOpen = false
    this.isChanges = false
    
    this.contentBuilderService.renewTestsData(this.dataWithChanges).pipe(take(1)).subscribe(testsData => {
      console.log('tests changes applied')
      this.dataWithChanges = JSON.parse(JSON.stringify(testsData))
      this.testsData = JSON.parse(JSON.stringify(testsData))
      this.testsThatWasConfirmed = []
      this.clearTestsStatistic()
      this.isLoading = false
    }, () => {this.isLoading = false})
  }

  public addContent() {
    this.isCreateContentOpen = !this.isCreateContentOpen
  }

  public onCreateTests(data: CreateTestsDataOut | null) {
    if (!data) {
      this.isCreateContentOpen = false
      return
    }
    let test: TestData

    if (!data.createdTest.id) {
      test = {
        id: `temporaryId-${Math.random()}`,
        ...data.createdTest 
      }
      if (data.position === 'top') {
        this.dataWithChanges = [test, ...this.dataWithChanges]
      } else if (data.position === 'bottom') {
        this.dataWithChanges = [...this.dataWithChanges, test]
      }
      this.isCreateContentOpen = false

    } else {
      test = {
        id: data.createdTest.id,
        ...data.createdTest
      }
      this.dataWithChanges = this.dataWithChanges.map(item => {
        if (item.id === test.id) {
          return test
        }
        return item
      })
      this.currentEditingTestId = ''
    }

    this.isChanges = true
    this.clearTestsStatistic()
  }

  public removeChanges() {
    this.isSaveChangesBlockOpen = false
    this.isChanges = false
    this.dataWithChanges = JSON.parse(JSON.stringify(this.testsData))

    this.clearTestsStatistic()

    this.testsThatWasConfirmed = []
  }

  private clearTestsStatistic() {
    this.testsStatistic = {
      totalTests: this.dataWithChanges.length,
      correctAnswers: 0,
      wrongAnswers: 0
    }
  }

  public shuffleTests() {
    this.modalsService
      .openShuffleTestsModal(this.dataWithChanges)
      .subscribe((data) => {
        if (!data) return;
        this.dataWithChanges = data;
        this.isChanges = true
      })
  }

  public deleteAllContent() {
    this.dataWithChanges = []
    this.isChanges = true

    this.clearTestsStatistic()
  }

  public deleteTest(testId: string) {
    this.dataWithChanges = this.dataWithChanges.filter(test => test.id !== testId)
    this.clearTestsStatistic()
    this.currentEditingTestId = ''
    this.isChanges = true
  }

  public createTest(testId: string) {
    if (testId !== this.currentEditingTestId) {
      this.currentEditingTestId = testId
      return
    }
    this.currentEditingTestId = ''
  }

  public saveConfirmation(action: string) {
    if (action === 'save') {
      this.isLoading = true
      this.isSaveChangesBlockOpen = false
      this.isChanges = false
    
      this.contentBuilderService.renewTestsData(this.dataWithChanges).pipe(take(1)).subscribe(testsData => {
        this.dataWithChanges = JSON.parse(JSON.stringify(testsData))
        this.testsData = JSON.parse(JSON.stringify(testsData))
        this.testsThatWasConfirmed = []
        this.clearTestsStatistic()
        this.isLoading = false
    }, () => {this.isLoading = false})
    }

    if (action === 'remove') {
      this.dataWithChanges = JSON.parse(JSON.stringify(this.testsData))
      this.isChanges = false
      this.isSaveChangesBlockOpen = false
      this.clearTestsStatistic()
      this.testsThatWasConfirmed = []
    }

    if (action === 'close') {
      this.isSaveChangesBlockOpen = false
    }
  }
}
