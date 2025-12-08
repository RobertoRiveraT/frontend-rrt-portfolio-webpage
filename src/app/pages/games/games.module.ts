import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular Material
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

// Routing
import { GamesRoutingModule } from './games-routing.module';

// Components
import { UnityPlatformerComponent } from './unity-platformer/unity-platformer.component';
import { PenguinTwitchBattleComponent } from './penguin-twitch-battle/penguin-twitch-battle.component';

@NgModule({
  declarations: [
    UnityPlatformerComponent,
    PenguinTwitchBattleComponent
  ],
  imports: [
    CommonModule,
    GamesRoutingModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class GamesModule { }

