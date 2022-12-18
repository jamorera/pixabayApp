import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CharactersDetailsComponent } from '@characters/characters-details/characters-details.component';
import { CharactersListComponent } from '@characters/characters-list/characters-list.component';
import { CharacterComponent } from './character.component';

const myComponents = [ CharactersDetailsComponent, CharactersListComponent, CharacterComponent ];

@NgModule({
  declarations: [...myComponents],
  imports: [
    CommonModule,RouterModule
  ],
  exports:[...myComponents]
})
export class CharactersModule { }
