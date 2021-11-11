import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { TestData } from 'src/app/shared/interfaces';
import { ContentBuilderService } from '../../services/content-builder.service';
import { ModalsService } from '../../services/modals.service';

export interface TestsStatistic {
  totalTests: number
  correctAnswers: number
  wrongAnswers: number
}

@Component({
  selector: 'app-tests-section',
  templateUrl: './tests-section.component.html',
  styleUrls: ['./tests-section.component.scss']
})
export class TestsSectionComponent implements OnInit, OnChanges {

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

  constructor(private contentBuilderService: ContentBuilderService, private modalsService: ModalsService) { }

  ngOnInit(): void {
    this.dataWithChanges = JSON.parse(JSON.stringify(this.testsData))
  }

  ngOnChanges() {
    if (this.testsData.length) {
      this.testsStatistic = {
        totalTests: this.testsData.length,
        correctAnswers: 0,
        wrongAnswers: 0
      }
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
    this.contentBuilderService.renewTestsData(this.dataWithChanges).pipe(take(1)).subscribe(testsData => {
      console.log('tests changes applied')
      this.dataWithChanges = JSON.parse(JSON.stringify(testsData))
      this.testsData = JSON.parse(JSON.stringify(testsData))
      this.isLoading = false
    }, () => {this.isLoading = false})
  }

  public addContent() {
    
  }

  public removeChanges() {
    this.isSaveChangesBlockOpen = false
    this.isChanges = false
    this.dataWithChanges = JSON.parse(JSON.stringify(this.testsData))
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
  }
}
