import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TheoryData, TheoryDataOnCreate } from 'src/app/shared/interfaces';
import { TutorialService } from 'src/app/shared/services/tutorial.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {transition, trigger, useAnimation } from '@angular/animations';
import { fadeIn, fadeOut } from 'ng-animate';
import { CreateContentDataOut } from '../../shared/create-content/create-content.component';



@Component({
  selector: 'app-theory-section',
  templateUrl: './theory-section.component.html',
  styleUrls: ['./theory-section.component.scss'],
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
export class TheorySectionComponent implements OnInit, OnDestroy {
  public codeLang = 'javascript'
  public editorOptions = {theme: 'vs-dark', language: this.codeLang};

  public isDragAndDrop = false
  public isCreateContentOpen = false
  public isChanges = false
  public isSaveChangesBlockOpen = false
  public currentEditSectionIdx: string = ''
  public currentEditSubSectionIdx: string = ''
  public currentEddetingContent = ''
  private lastOpenedSection = ''

  @Input() theoryData!: Array<TheoryData[]>
  public dataWithChanges: Array<TheoryData[]> = []

  constructor(public tutorialService: TutorialService) { }

  ngOnInit(): void {
    this.dataWithChanges = JSON.parse(JSON.stringify(this.theoryData))
  }

  drop(event: CdkDragDrop<Array<TheoryData[]>>) {
    moveItemInArray(this.dataWithChanges, event.previousIndex, event.currentIndex);
    if (JSON.stringify(this.dataWithChanges) !== JSON.stringify(this.theoryData)) {
      this.isChanges = true
    } else {
      this.isChanges = false
    }
  }

  public addContent() {
    this.isCreateContentOpen = !this.isCreateContentOpen
  }

  ngOnDestroy() {

  }

  public onCreateContent(data: CreateContentDataOut | null) {
    if (!data) {
      this.isCreateContentOpen = false
      return
    }

    const {createdContent, position} = data

    console.log('data', createdContent, position)
    this.isChanges = true
    this.isCreateContentOpen = false
  }

  public openSaveChanges() {
    this.isSaveChangesBlockOpen = true
  }

  public saveChanges() {
    this.isSaveChangesBlockOpen = false
    this.isChanges = false
    //request
  }

  public removeChanges() {
    this.isSaveChangesBlockOpen = false
    this.isChanges = false
    this.dataWithChanges = JSON.parse(JSON.stringify(this.theoryData))
  }

  public deleteAllContent() {

  }

  public addContentInSection(sectionIndex: number) {
    
  }

  public editSection(sectionIndex: number) {
    const sectionIndexStr = sectionIndex.toString()

    if (this.currentEditSectionIdx === sectionIndexStr) {
      this.lastOpenedSection = this.currentEditSectionIdx
      this.currentEditSectionIdx = ''
      return
    } 

    if (this.lastOpenedSection !== sectionIndexStr) {
      this.currentEditSubSectionIdx = ''
    }
 
    this.currentEditSectionIdx = sectionIndexStr
  }

  public deleteSection(sectionIndex: number) {
    this.dataWithChanges = this.dataWithChanges.filter(( _, i) => {
      return i !== sectionIndex
    })
  }

  public editSubSection(subSectionIdx: number) {
    const subSectionIndexStr = subSectionIdx.toString()

    // if (!this.currentEditSectionIdx) return 

    if (this.currentEditSubSectionIdx === subSectionIndexStr) {
      this.currentEditSubSectionIdx = ''
      return
    }
    this.currentEditSubSectionIdx = subSectionIndexStr

    this.currentEddetingContent = JSON.parse(JSON.stringify(this.dataWithChanges[Number(this.currentEditSectionIdx)][subSectionIdx].content))

  }

  public deleteSubSection(subSectionIdx: number) {
    if (!this.currentEditSectionIdx) return 
    this.dataWithChanges[Number(this.currentEditSectionIdx)] = this.dataWithChanges[Number(this.currentEditSectionIdx)].filter(( _, i) => {
      return i !== subSectionIdx
    })
  }

  public finishEdittingSubSection() {
    if (!this.currentEditSectionIdx || !this.currentEditSubSectionIdx) return

    this.dataWithChanges[Number(this.currentEditSectionIdx)][Number(this.currentEditSubSectionIdx)].content = this.currentEddetingContent
    this.currentEditSubSectionIdx = ''
  }

  public cancelEdittingSubSection() {
    this.currentEddetingContent = ''
    this.currentEditSubSectionIdx = ''
  }

  public numbToStr(value: number): string {
    return value.toString()
  }
}
