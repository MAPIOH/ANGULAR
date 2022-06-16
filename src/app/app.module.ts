import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/models/header/header.component';
import { ButtonHeaderComponent } from './components/models/button/header/button-header/button-header.component';
import { LeafletComponent } from './components/pages/leaflet/leaflet.component';
import { MainPageComponent } from './components/pages/main-page/main-page.component';
import { NotfoundComponent } from './components/pages/notfound/notfound.component';
import { MapCardComponent } from './components/models/card/map-card/map-card.component';
import { HttpClientModule } from '@angular/common/http';
import { IconCardComponent } from './components/models/card/icon-card/icon-card.component';
import { FormComponent } from './components/pages/form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from './components/models/loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ButtonHeaderComponent,
    LeafletComponent,
    MainPageComponent,
    NotfoundComponent,
    MapCardComponent,
    IconCardComponent,
    FormComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
