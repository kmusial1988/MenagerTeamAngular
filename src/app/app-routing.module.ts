import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ParentComponent} from "./component/parent/parent.component";
import {PlayerComponent} from "./component/player/player.component";
import {TrainerComponent} from "./component/trainer/trainer.component";
import {TeamComponent} from "./component/team/team.component";
import {OrganizationComponent} from "./component/organization/organization.component";
import {MainComponent} from "./component/main/main.component";

const routes: Routes = [

  {path: 'organization', component: OrganizationComponent },
  {path: 'main', component: MainComponent },
  {path: 'team', component: TeamComponent},
  {path: 'trainer', component: TrainerComponent},
  {path: 'player', component: PlayerComponent},
  {path: 'parent', component: ParentComponent},

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
