import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './components/pages/form/form.component';
import { MainPageComponent } from './components/pages/main-page/main-page.component';
import { NotfoundComponent } from './components/pages/notfound/notfound.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent
  },
  {
    path: 'home',
    component: MainPageComponent
  },
  {
    path: 'maps',
    component: MainPageComponent
  },
  {
    path: 'icons',
    component: MainPageComponent
  },
  {
    path: 'edit/:name',
    component: FormComponent
  },
  {
    path: 'editor/:name',
    component: MainPageComponent
  },
  {
    path: 'create/map',
    component: FormComponent
  },
  {
    path: 'create/icon',
    component: FormComponent
  },
  {
    path: '**',
    component: NotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
