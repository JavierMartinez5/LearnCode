import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainLayoutComponent } from './tutorial/main-layout/main-layout.component';
import { TutorialPageComponent } from './tutorial/tutorial-page/tutorial-page.component';
import { SharedModule } from './shared/shared.module';
import { TopNavComponent } from './tutorial/components/top-nav/top-nav.component';
import { MainNavComponent } from './tutorial/components/main-nav/main-nav.component';
import { TheorySectionComponent } from './tutorial/components/theory-section/theory-section.component';
import { TestsSectionComponent } from './tutorial/components/tests-section/tests-section.component';
import { PracticeSectionComponent } from './tutorial/components/practice-section/practice-section.component';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { CommentsBlockComponent } from './tutorial/components/comments-block/comments-block.component';
import { PracticeAnswerComponent } from './tutorial/components/practice-answer/practice-answer.component';
import { PracticeTaskComponent } from './tutorial/components/practice-task/practice-task.component';


@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    TutorialPageComponent,
    TopNavComponent,
    MainNavComponent,
    TheorySectionComponent,
    TestsSectionComponent,
    PracticeSectionComponent,
    CommentsBlockComponent,
    PracticeTaskComponent,
    PracticeAnswerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    MonacoEditorModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
