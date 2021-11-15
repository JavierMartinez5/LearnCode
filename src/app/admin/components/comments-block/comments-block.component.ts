import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { fadeIn, fadeOut } from 'ng-animate';
import { take } from 'rxjs/operators';
import { Comment, NewComment } from 'src/app/shared/interfaces';
import { TutorialService } from 'src/app/shared/services/tutorial.service';
import { ContentBuilderService } from '../../services/content-builder.service';

type InputMode = '' | 'search' | 'comment' | 'save'

@Component({
  selector: 'app-comments-block',
  templateUrl: './comments-block.component.html',
  styleUrls: ['./comments-block.component.scss'],
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
export class CommentsBlockComponent implements OnInit {
  public toolTipDelay = 1000

  @Input() public taskId!: string
  public downloadedComments: Comment[] = []
  public commentsWithChanges: Comment[] = []
  public form!: FormGroup
  public searchValue: string = ''
  public isChanges = false

  public inputMode: InputMode = ''
  public isSearchCommentBlock = false
  public isCreateCommentBlock = false
  public isLoading = false

  constructor(private tutorialService: TutorialService, private contentBuilderService: ContentBuilderService) { }

  ngOnInit(): void {
    this.downloadComments()

    this.form = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(5)]),
      content: new FormControl('', [Validators.required])
    })
  }

  private downloadComments() {
    this.isLoading = true
    this.tutorialService.getCommentsBlockData(this.taskId).pipe(take(1)).subscribe((data: Comment[]) => {
      this.downloadedComments = data
      this.commentsWithChanges = data
      this.isLoading = false
    }, () => {this.isLoading = false})
  }

  private clearData() {
    this.isChanges = false
    this.inputMode = ''
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
    this.searchValue = ''

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

  public deleteComment(commentId: string) {
    this.commentsWithChanges = this.commentsWithChanges.filter(comment => comment.id !== commentId)
    this.isChanges = true
  }

  public saveChanges() {
    this.isLoading = true
    this.clearData()
    this.contentBuilderService.renewComments(this.commentsWithChanges).pipe(take(1)).subscribe(comments => {
      this.commentsWithChanges = JSON.parse(JSON.stringify(comments))
      this.downloadedComments = JSON.parse(JSON.stringify(comments))
      this.isLoading = false
    }, () => {this.isLoading = false})
  }

  public removeChanges() {
    this.commentsWithChanges = JSON.parse(JSON.stringify(this.downloadedComments))
    this.clearData()
  }

}
