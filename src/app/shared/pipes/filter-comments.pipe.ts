import { Pipe, PipeTransform } from '@angular/core';
import { Comment } from '../interfaces';
// import { Comment } from '../components/comments-section/comments-section.component';

@Pipe({
  name: 'filterComments'
})
export class FilterCommentsPipe implements PipeTransform {

  transform(comments: Comment[], searchValue: string = ''): any {
    if (searchValue === '') return comments

    return comments.filter(comment => {
      return comment.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) || comment.content.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
    })
  }
}
