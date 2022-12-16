import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@app/environments/environment';
import { Character } from '@shared/interfaces/character.interface';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private http:HttpClient) { }

  searchCharacters(query='',page=1){
    const filter = `${environment.baseUrlAPI}/&lang=es&q=${query}`;
    return this.http.get<Character[]>(filter);
  }
  getDetails(id:number){
    return this.http.get<Character>(`${environment.baseUrlAPI}/&id=${id}`);
  }
}
