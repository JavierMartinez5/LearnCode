import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TestData, TestDataOnCreate } from 'src/app/shared/interfaces';

export interface CreateTestsDataOut {
  createdTest: TestDataOnCreate
  position: string
}

export interface AnswersOnCreate {
  text: string
}

type currentTool = '' | 'taskTitle' | 'answers' | 'rightAnswer' | 'taskCode'

@Component({
  selector: 'app-create-tests',
  templateUrl: './create-tests.component.html',
  styleUrls: ['./create-tests.component.scss']
})
export class CreateTestsComponent implements OnInit {

  @Input('test') public testForEdit!: TestData 
  @Output('onCreateTests') onCreateTests: EventEmitter<CreateTestsDataOut | null> = new EventEmitter()

  public codeLang = 'javascript'
  public editorOptions = {theme: 'vs-dark', language: this.codeLang};

  public createdTest: TestDataOnCreate = {
    taskTitle: '',
    answers: [''],
    rightAnswer: '',
    taskCode: '',
  }
  public currentTool: currentTool = ''
  public position = 'bottom'

  public taskTitle = ''
  public answers: AnswersOnCreate[] = [{text: ''}]
  public rightAnswer = ''
  public taskCode? = ''

  // taskTitle: string;
  // answers: string[];
  // rightAnswer: string;
  // taskCode?: string;

  constructor() { }

  ngOnInit(): void {
    if (this.testForEdit) {
      this.prepareTestData()
    }
  }

  private prepareTestData() {
    const test: TestDataOnCreate = JSON.parse(JSON.stringify(this.testForEdit))
      this.createdTest = {
        ...test
      }
      this.taskTitle = test.taskTitle
      this.answers = test.answers.map(item => ({text: item}))
      this.rightAnswer = test.rightAnswer
      this.taskCode = test.taskCode || ''
  }

  private clearFields() {
    this.currentTool = ''
    this.rightAnswer = ''
    this.answers = [{text: ''}]
    this.taskCode = ''
    this.taskTitle = ''
  }

  public createBlock() {

    if (this.currentTool === 'taskTitle' && this.taskTitle) {
      this.createdTest = {
        ...this.createdTest,
        taskTitle: this.taskTitle
      }
    }

    if (this.currentTool === 'taskCode' && this.taskCode) {
      this.createdTest = {
        ...this.createdTest,
        taskCode: this.taskCode
      }
    }

    if (this.currentTool === 'answers' && this.answers[0].text) {
      const transformedAnswers: string[] = this.answers.filter(answer => answer.text).map(answer => answer.text)

      this.createdTest = {
        ...this.createdTest,
        answers: transformedAnswers
      }
    }

    if (this.currentTool === 'rightAnswer' && this.rightAnswer) {
      this.createdTest = {
        ...this.createdTest,
        rightAnswer: this.rightAnswer
      }
    }
    this.clearFields()
  }

  public addAnswers() {
    this.currentTool = 'answers'
    this.answers = this.createdTest.answers.map(answer => ({text: answer}))
  }

  public createAnswer() {
    this.answers = [...this.answers, {text: ''}]
  }

  public cancelCreateBlock() {
    this.clearFields()
  }

  public finishCreation(cancel?: boolean) {
    if (cancel) {
    this.onCreateTests.emit(null)
      return
    }
    this.onCreateTests.emit({createdTest: this.createdTest, position: this.position})
  }

  public isCreatedTestValid() {
    if (this.createdTest.taskTitle && this.createdTest.answers.length && this.createdTest.rightAnswer){
      return true
    }
    return false
  }
}
