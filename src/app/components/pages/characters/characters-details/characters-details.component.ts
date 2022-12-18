import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Character } from '@app/shared/interfaces/character.interface';
import { CharacterService } from '@app/shared/services/character.service';
import { Observable, of} from 'rxjs';
import { take } from 'rxjs/operators';
import {Location} from '@angular/common';

@Component({
  selector: 'app-characters-details',
  templateUrl: './characters-details.component.html',
  styleUrls: ['./characters-details.component.scss']
})
export class CharactersDetailsComponent {
  character$!: Observable<Character[]|any>;

  constructor(private route:ActivatedRoute, private characterSvc:CharacterService, private location:Location) { }

  ngOnInit(): void {
    this.route.params.pipe( take(1)).subscribe((params) => {
      const id = params['id'];
      // this.character$ = this.characterSvc.getDetails(id);
      this.characterSvc.getDetails(id).subscribe((res:any )=>{
        this.character$ = of(res['hits'][0]);
      });
    });
  }

  onGoBack():void{
    this.location.back();
  }
}
