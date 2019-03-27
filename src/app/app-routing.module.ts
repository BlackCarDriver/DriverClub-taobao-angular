import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from '../app/homepage/homepage.component';
import { PersonalComponent} from '../app/personal/personal.component';
import { ChgmymsgComponent } from '../app/chgmymsg/chgmymsg.component';
import { UploadgoodsComponent } from '../app/uploadgoods/uploadgoods.component';

import { from } from 'rxjs';
const routes: Routes = [ 
  { path: 'homepage', component: HomepageComponent },
  { path: 'personal', component: PersonalComponent},
  { path: 'changemsg' , component: ChgmymsgComponent},
  { path: 'uploadgoods' , component: UploadgoodsComponent},
  { path: '', redirectTo: 'homepage', pathMatch: 'full' }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }


