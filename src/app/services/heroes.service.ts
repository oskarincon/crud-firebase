import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://loginng-dd7ff.firebaseio.com';

  constructor(private http: HttpClient) { }

  createHeroe( heroe: HeroeModel) {
    return this.http.post(`${ this.url }/heroes.json`, heroe)
    .pipe(
      map( (resp: any) => {
        heroe.id = resp.name;
        return heroe;
      })
    );
  }

  updateHeroe( heroe: HeroeModel) {
    const heroeTemp = {
      ...heroe
    };
    delete heroeTemp.id;
    return this.http.put(`${ this.url }/heroes/${ heroe.id }.json`, heroeTemp);
  }

  getHeroe(id: string) {
    return this.http.get(`${ this.url }/heroes/${ id }.json`);
  }

  deleteHeroe(id: string) {
    return this.http.delete(`${ this.url }/heroes/${ id }.json`);
  }

  getHeroes() {
    return this.http.get(`${ this.url }/heroes.json`)
    .pipe(
      map(this.normalizeGet),
      delay(1000)
    );
  }

  normalizeGet(heroeObj: object) {
    if (!heroeObj) {
      return [];
    }
    const heroes: HeroeModel[] = [];
    Object.keys(heroeObj).forEach(keys => {
      const heroe: HeroeModel = heroeObj[keys];
      heroe.id = keys;
      heroes.push(heroe);
    });
    return heroes;
  }
}
