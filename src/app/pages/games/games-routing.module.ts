import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UnityPlatformerComponent } from './unity-platformer/unity-platformer.component';
import { PenguinTwitchBattleComponent } from './penguin-twitch-battle/penguin-twitch-battle.component';

const routes: Routes = [
  { path: 'unity-platformer', component: UnityPlatformerComponent },
  { path: 'penguin-twitch-battle', component: PenguinTwitchBattleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamesRoutingModule { }

