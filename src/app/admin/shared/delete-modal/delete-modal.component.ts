import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DeleteSectionDataIn {
  blockName: string
}

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit {

  public inputedBlockName: string = ''

  constructor(@Inject(MAT_DIALOG_DATA) public data: DeleteSectionDataIn) { }

  ngOnInit(): void {
  }
  

  public submit() {
    if (this.inputedBlockName !== this.data.blockName) return false

    return true
  }
}
