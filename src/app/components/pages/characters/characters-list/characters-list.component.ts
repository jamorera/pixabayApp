import { Component } from '@angular/core';
import { Character } from '@app/shared/interfaces/character.interface';
import { CharacterService } from '@app/shared/services/character.service';
import { take } from 'rxjs';


@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss']
})
export class CharactersListComponent {
  characters: Character[] = [];

  // info: RequestInfo = {
  //   next: null,
  // };

  showGoUpButton = false;

  private pageNum =1;
  private query: string | undefined;
  private hideScrollHeight = 200;
  private showScrollHeight = 500;
  constructor( private characterSvc: CharacterService){}

  ngOnInit(): void {
    this.getDataFromService();
  }

  private getDataFromService(): void {
    this.characterSvc
      .searchCharacters(this.query)
      .pipe(take(1))
      .subscribe((res: any) => {
        console.log('Response->', res);
        const { hits }= res;
        this.characters = [...this.characters, ...hits];
      });
  }

}
