import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PersonalComponent } from './personal/personal.component';
import { NavigComponent } from './navig/navig.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { ChgmymsgComponent } from './chgmymsg/chgmymsg.component';
import { UploadgoodsComponent } from './uploadgoods/uploadgoods.component';
import { GoodspageComponent } from './goodspage/goodspage.component';
import { HttpClientModule }    from '@angular/common/http';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    PersonalComponent,
    NavigComponent,
    FooterComponent,
    ChgmymsgComponent,
    UploadgoodsComponent,
    GoodspageComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
