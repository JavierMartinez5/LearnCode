import { Component, Input, OnInit } from '@angular/core';
import { TaskData } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-practice-section',
  templateUrl: './practice-section.component.html',
  styleUrls: ['./practice-section.component.scss']
})
export class PracticeSectionComponent implements OnInit {
  @Input() public practiceData!: TaskData[]

  editorOptions = {theme: 'vs-dark', language: 'javascript'};
  isTrueAnswer: boolean = false
  currentTaskId: string = ''

  constructor() { }

  ngOnInit(): void {
  }

  checkCode(code: string | undefined, id: string) {
    if (!code?.trim()) return
    this.currentTaskId = id
    // check on server side
    this.isTrueAnswer = !!Math.round(Math.random())
  }

}
