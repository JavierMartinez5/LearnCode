import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AdminTutorialPageComponent } from './admin-tutorial-page/admin-tutorial-page.component';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { SharedModule } from '../shared/shared.module';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { CommentsBlockComponent } from './components/comments-block/comments-block.component';
import { PracticeSectionComponent } from './components/practice-section/practice-section.component';
import { TestsSectionComponent } from './components/tests-section/tests-section.component';
import { TheorySectionComponent } from './components/theory-section/theory-section.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { AuthGuard } from './services/auth.guard';
import { AlertComponent } from './shared/alert/alert.component';
import { AlertService } from './services/alert.service';
import { AddSectionModalComponent } from './shared/add-section-modal/add-section-modal.component';
import { AddChapterModalComponent } from './shared/add-chapter-modal/add-chapter-modal.component';
import { ContentBuilderService } from './services/content-builder.service';
import { EditSectionModalComponent } from './shared/edit-section-modal/edit-section-modal.component';
import { DeleteModalComponent } from './shared/delete-modal/delete-modal.component';
import { ShuffleSectionModalComponent } from './shared/shuffle-section-modal/shuffle-section-modal.component';
import { ModalsService } from './services/modals.service';
import { CreateContentComponent } from './shared/create-content/create-content.component';
import { ShuffleTestsModalComponent } from './components/modals/shuffle-tests-modal/shuffle-tests-modal.component';
import { CreateTestsComponent } from './shared/create-tests/create-tests.component';
import { CreateTasksComponent } from './shared/create-tasks/create-tasks.component';
import { PracticeTaskComponent } from './components/practice-task/practice-task.component';
import { PracticeAnswerComponent } from './components/practice-answer/practice-answer.component';
import { ShuffleTasksModalComponent } from './components/modals/shuffle-tasks-modal/shuffle-tasks-modal.component';
import { SaveConfirmationComponent } from './shared/save-confirmation/save-confirmation.component';

const routes: Routes = [
  { path: '', component: AdminLayoutComponent, children: [
    { path: '', redirectTo: '/admin/login', pathMatch: 'full'},
    { path: 'login', component: LoginPageComponent},
    { path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard]},
    { path: 'tutorial/:language', component: AdminTutorialPageComponent, canActivate: [AuthGuard]},
    ] 
  },

];

@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    AdminTutorialPageComponent,
    TopNavComponent,
    MainNavComponent,
    TheorySectionComponent,
    TestsSectionComponent,
    PracticeSectionComponent,
    CommentsBlockComponent,
    DashboardPageComponent,
    AlertComponent,
    AddSectionModalComponent,
    AddChapterModalComponent,
    EditSectionModalComponent,
    DeleteModalComponent,
    ShuffleSectionModalComponent,
    CreateContentComponent,
    ShuffleTestsModalComponent,
    CreateTestsComponent,
    CreateTasksComponent,
    PracticeTaskComponent,
    PracticeAnswerComponent,
    ShuffleTasksModalComponent,
    SaveConfirmationComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  providers: [AlertService, AuthGuard, ContentBuilderService, ModalsService]
})
export class AdminModule { }
