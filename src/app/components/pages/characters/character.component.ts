import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Character } from '@app/shared/interfaces/character.interface';


@Component({
    selector:'app-character',
    template:`
    <div class="card">
      <div class="image">
        <a [routerLink]="['/character-details', character.id]">
          <img
            [src]="character.previewURL"
            class="card-img-top"
          />
        </a>
      </div>
      <div class="card-inner">
        <div class="header">
          <a [routerLink]="['/character-details', character.id]">
          </a>
          <small class="text-muted">{{ character.user  }}</small>
        </div>
      </div>
    </div><br>`,
    changeDetection:ChangeDetectionStrategy.OnPush
})

export class CharacterComponent{
    @Input()
  character!: Character;
}
