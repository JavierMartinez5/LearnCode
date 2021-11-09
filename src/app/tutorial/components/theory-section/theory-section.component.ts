import { Component, Input, OnInit } from '@angular/core';
import { TheoryData } from 'src/app/shared/interfaces';
import { TutorialService } from 'src/app/shared/services/tutorial.service';

@Component({
  selector: 'app-theory-section',
  templateUrl: './theory-section.component.html',
  styleUrls: ['./theory-section.component.scss']
})
export class TheorySectionComponent implements OnInit {
  // public theoryData: Array<TheoryData[]> = []
  @Input() theoryData!: Array<TheoryData[]>

  constructor(public tutorialService: TutorialService) { }

  ngOnInit(): void {
    
  }

}
