import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, ParamMap, Router } from '@angular/router';
import { Character } from '@app/shared/interfaces/character.interface';
import { CharacterService } from '@app/shared/services/character.service';
import { take,filter } from 'rxjs';


@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss']
})
export class CharactersListComponent {
  characters: Character[] = [];
  showGoUpButton = false;

  private pageNum =1;
  private query: string | undefined;
  private hideScrollHeight = 200;
  private showScrollHeight = 500;

  constructor(
    private characterSvc: CharacterService,
    private route:ActivatedRoute,
    private router:Router
  ){
    this.onUrlChanged();
  }

  ngOnInit(): void {
    this.getCharacterByQuery();
  }

  private onUrlChanged(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.characters = [];
        this.getCharacterByQuery();
        this.getCharacterCategory();
      });
  }

  private getCharacterByQuery(): void{
    this.route.queryParams.pipe(take(1)).subscribe((params: ParamMap | any) => {
      this.query = params['q'];
      this.getDataFromService('search');
    });
  }
  private getCharacterCategory(): void{
    this.route.queryParams.pipe(take(1)).subscribe((params: ParamMap | any) => {
      this.query = params['q'];
      this.getDataFromService('category');
    });
  }

  private getDataFromService(param:string): void {
    switch (param) {
      case 'search':
        this.characterSvc
        .searchCharacters(this.query)
        .pipe(take(1))
        .subscribe((res: any) => {
          if (res?.hits?.length) {
            const { hits }= res;
            this.characters = [...this.characters, ...hits];
          }else{
            this.characters =[];
          }
        });
        break;
        case 'category':
          this.characterSvc
          .categoryCharacters(this.query)
          .pipe(take(1))
          .subscribe((res: any) => {
            if (res?.hits?.length) {
              const { hits }= res;
              this.characters = [...this.characters, ...hits];
            }else{
              this.characters =[];
            }
          });
        break;
      default:
        break;
    }

  }

}
