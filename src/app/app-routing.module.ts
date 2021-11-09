import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './tutorial/main-layout/main-layout.component';
import { TutorialPageComponent } from './tutorial/tutorial-page/tutorial-page.component';

const routes: Routes = [
  { path: '', component: MainLayoutComponent, children: [
    { path: '', redirectTo: 'tutorial/javaScript', pathMatch: 'full'},
    { path: 'tutorial/:language', component: TutorialPageComponent },
    ] 
  },
  {
    path: 'admin',  loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
