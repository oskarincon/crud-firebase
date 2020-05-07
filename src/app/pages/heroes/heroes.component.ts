import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from 'src/app/models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[] = [];
  loanding = false;
  constructor(private heroeService: HeroesService) { }

  ngOnInit() {
    this.getHeroe();
  }

  getHeroe() {
    this.loanding = true;
    this.heroeService.getHeroes()
    .subscribe(resp => {
      this.heroes = resp;
      this.loanding = false;
    });
  }

  deleteHeroe(heroe: HeroeModel, i: number) {
    Swal.fire({
      title: 'Delete customer',
      text: `Are you sure to delete to ${heroe.name}?`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(
      resp => {
        if (resp.value) {
          this.heroeService.deleteHeroe(heroe.id)
          .subscribe(() => {
            this.heroes.splice(i);
          });
        }
      }
    );
  }
}
