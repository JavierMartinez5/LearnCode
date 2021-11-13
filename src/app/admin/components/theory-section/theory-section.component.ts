import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TheoryData, TheoryDataOnCreate } from 'src/app/shared/interfaces';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {transition, trigger, useAnimation } from '@angular/animations';
import { fadeIn, fadeOut } from 'ng-animate';
import { CreateContentDataOut } from '../../shared/create-content/create-content.component';
import { ContentBuilderService } from '../../services/content-builder.service';
import { take } from 'rxjs/operators';



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

  public isLoading = false
  public isDragAndDrop = false
  public isCreateContentOpen = false
  public isCreateContentInSectionOpen = false
  public isChanges = false
  public isSaveChangesBlockOpen = false
  public currentEditSectionIdx: string = ''
  public currentEditSubSectionIdx: string = ''
  public currentEddetingContent = ''
  private lastOpenedSection = ''

  @Input() theoryData!: Array<TheoryData[]>
  public dataWithChanges: Array<TheoryData[]> = []

  constructor(private contentBuilderService: ContentBuilderService) { }

  ngOnInit(): void {
    this.dataWithChanges = JSON.parse(JSON.stringify(this.theoryData))
  }

  ngOnDestroy() {

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

  

  public onCreateContent(data: CreateContentDataOut | null) {
    if (!data) {
      this.isCreateContentOpen = false
      return
    }

    const newSection: TheoryData[] = data.createdContent.map((section: TheoryDataOnCreate) => {
      return {
        id: `temporaryId-${Math.random()}`,
        ...section
      }
    })

    if (data.position === 'top') {
      this.dataWithChanges = [newSection, ...this.dataWithChanges]
    } else if (data.position === 'bottom') {
      this.dataWithChanges = [...this.dataWithChanges, newSection]
    }

    this.isChanges = true
    this.isCreateContentOpen = false
  }

  public onAddContentInSection(data: CreateContentDataOut | null) {
    if (!data) {
      this.isCreateContentInSectionOpen = false
      this.currentEditSectionIdx = ''
      return
    }

    const newSection: TheoryData[] = data.createdContent.map((section: TheoryDataOnCreate) => {
      return {
        id: `temporaryId-${Math.random()}`,
        ...section
      }
    })

    if (data.position === 'top') {
      this.dataWithChanges[Number(this.currentEditSectionIdx)] = [...newSection, ...this.dataWithChanges[Number(this.currentEditSectionIdx)]]
    } else if (data.position === 'bottom') {
      this.dataWithChanges[Number(this.currentEditSectionIdx)] = [...this.dataWithChanges[Number(this.currentEditSectionIdx)], ...newSection]
    }

    this.isChanges = true
  }

  public saveChanges() {
    this.isLoading = true
    this.isSaveChangesBlockOpen = false
    this.isChanges = false
    this.isDragAndDrop = false
    //request
    this.contentBuilderService.renewTheoryData(this.dataWithChanges).pipe(take(1)).subscribe(theoryData => {
      console.log('changes applied')
      this.dataWithChanges = JSON.parse(JSON.stringify(theoryData))
      this.theoryData = JSON.parse(JSON.stringify(theoryData))
      this.isLoading = false
    }, () => {this.isLoading = false})
  }

  public openSaveChanges() {
    this.isSaveChangesBlockOpen = true
  }

  public removeChanges() {
    this.isSaveChangesBlockOpen = false
    this.isChanges = false
    this.dataWithChanges = JSON.parse(JSON.stringify(this.theoryData))
  }

  public deleteAllContent() {
    this.dataWithChanges = []
    this.isChanges = true
  }

  public addContentInSection(sectionIndex: number) {
    const sectionIndexStr = sectionIndex.toString()

    if (this.isCreateContentInSectionOpen && (this.currentEditSectionIdx !== sectionIndexStr)) {
      this.currentEditSectionIdx = ''
      this.currentEditSubSectionIdx = ''
    }

    if (this.isCreateContentInSectionOpen && (this.currentEditSectionIdx === sectionIndexStr)) {
      this.isCreateContentInSectionOpen = false
      this.currentEditSectionIdx = ''
      this.currentEditSubSectionIdx = ''
      return
    }

    if (!this.isCreateContentInSectionOpen) {
      this.isCreateContentInSectionOpen = true
      this.currentEditSectionIdx = ''
      this.currentEditSubSectionIdx = ''
    }

    this.isCreateContentInSectionOpen = true
    this.currentEditSectionIdx = sectionIndexStr

  }

  public editSection(sectionIndex: number) {
    const sectionIndexStr = sectionIndex.toString()

    if (this.isCreateContentInSectionOpen) {
      this.isCreateContentInSectionOpen = false
      this.currentEditSectionIdx = ''
    }

    if (this.currentEditSectionIdx === sectionIndexStr) {
      this.lastOpenedSection = this.currentEditSectionIdx
      this.currentEditSectionIdx = ''
      return
    } 

    if (this.lastOpenedSection !== sectionIndexStr) {
      this.currentEditSubSectionIdx = ''
    }

    if ((this.lastOpenedSection === sectionIndexStr) && (this.currentEditSectionIdx)) {
      this.currentEditSubSectionIdx = ''
      //!!!!!!!!!!! genius!
    }
    
    this.currentEditSectionIdx = sectionIndexStr
  }

  public deleteSection(sectionIndex: number) {

    this.dataWithChanges = this.dataWithChanges.filter(( _, i) => {
      return i !== sectionIndex
    })
    this.lastOpenedSection = ''
    this.isCreateContentInSectionOpen = false
    this.currentEditSectionIdx = ''
    this.currentEditSubSectionIdx = ''

    this.isChanges = true
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
