import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TheoryDataOnCreate } from 'src/app/shared/interfaces';

export interface CreateContentDataOut {
  createdContent: TheoryDataOnCreate[]
  position: string
}

@Component({
  selector: 'app-create-content',
  templateUrl: './create-content.component.html',
  styleUrls: ['./create-content.component.scss']
})
export class CreateContentComponent implements OnInit {

  @Output('onCreateContent') onCreateContent: EventEmitter<CreateContentDataOut | null> = new EventEmitter()

  public codeLang = 'javascript'
  public editorOptions = {theme: 'vs-dark', language: this.codeLang};

  public createdContent: TheoryDataOnCreate[] = []
  public currentTool = ''
  public currentContent = ''
  public position = 'bottom'

  constructor() { }

  ngOnInit(): void {
  }

  public createBlock() {
    if (!this.currentContent) {
      this.currentTool = ''
      return
    }

    if (this.currentTool === 'code') {
      this.createdContent = [...this.createdContent, {type: this.currentTool, content: this.currentContent, codeLang: this.codeLang}]
    }

    if (this.currentTool === 'text') {
      this.createdContent = [...this.createdContent, {type: this.currentTool, content: this.currentContent}]
    }

    this.currentTool = ''
    this.currentContent = ''
  }

  public cancelCreateBlock() {
    this.currentTool = ''
    this.currentContent = ''
  }

  public finishCreation(cancel?: boolean) {
    if (cancel) {
    this.onCreateContent.emit(null)
      return
    }
    this.onCreateContent.emit({createdContent: this.createdContent, position: this.position})
  }
}
