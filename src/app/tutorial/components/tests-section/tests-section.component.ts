import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { TestData } from 'src/app/shared/interfaces';

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
  public taskAnswer = ''
  public currentTest = {}
  public msg = ''
  testsThatWasConfirmed: string[] = []
  public testsStatistic!: TestsStatistic

  constructor() { }

  ngOnInit(): void {
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
}
