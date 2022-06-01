import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { TrainerComponent } from './component/trainer/trainer.component';
import { OrganizationComponent } from './component/organization/organization.component';
import { ParentComponent } from './component/parent/parent.component';
import { PlayerComponent } from './component/player/player.component';
import { TeamComponent } from './component/team/team.component';
import { MainComponent } from './component/main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    TrainerComponent,
    OrganizationComponent,
    ParentComponent,
    PlayerComponent,
    TeamComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
