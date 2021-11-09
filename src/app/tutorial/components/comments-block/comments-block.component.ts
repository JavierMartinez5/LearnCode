import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Comment, NewComment } from 'src/app/shared/interfaces';
import { TutorialService } from 'src/app/shared/services/tutorial.service';

@Component({
  selector: 'app-comments-block',
  templateUrl: './comments-block.component.html',
  styleUrls: ['./comments-block.component.scss']
})
export class CommentsBlockComponent implements OnInit {
  @Input() public taskId!: string
  public comments!: Comment[]
  public form!: FormGroup
  public searchValue: string = ''

  public inputMode: string = ''
  public isSearchCommentBlock: boolean = false
  public isCreateCommentBlock: boolean = false

  constructor(private tutorialService: TutorialService) { }

  ngOnInit(): void {
    this.tutorialService.getCommentsBlockData(this.taskId).subscribe((data: Comment[]) => {
      this.comments = data
    }).unsubscribe()

    this.form = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(5)]),
      content: new FormControl('', [Validators.required])
    })
  }

  public submit() {
    if (this.form.invalid) {
      return
    }

    const newComment: NewComment = {
      title: this.form.value.title,
      content: this.form.value.content,
      token: 'some token'
      // date: new Date()
    }
    // do post request
    console.log(newComment)
    this.form.reset()
  }

  hideInput(inputMode: string) {
    if (inputMode === 'search') {
      this.isSearchCommentBlock = !this.isSearchCommentBlock
      this.isCreateCommentBlock = false
      if (!this.isSearchCommentBlock) {
        this.inputMode = ''
      }
    }

    if (inputMode === 'comment') {
      this.isCreateCommentBlock = !this.isCreateCommentBlock
      this.isSearchCommentBlock = false
      if (!this.isCreateCommentBlock) {
        this.inputMode = ''
      }
    }
  }

  // ngOnChanges() {
  //   if (this.taskId) {
  //     this.tutorialService.getCommentsBlockData(this.taskId).subscribe((data: Comment[]) => {
  //       this.comments = data
  //     }).unsubscribe()
  //   }
  // }
}
