import { Component, OnInit } from '@angular/core';
import { HeroeModel } from '../../models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe: HeroeModel = new HeroeModel();
  constructor(private heroesService: HeroesService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== 'new') {
      this.heroesService.getHeroe(id)
      .subscribe((resp: HeroeModel) => {
        this.heroe = resp;
        this.heroe.id = id;
      });
    }
  }

  sutmit(e: NgForm) {
    if (e.invalid) {
      return;
    }
    Swal.fire({
      title: 'Wait ...',
      text: 'save information',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();
    const request = this.heroe.id ? this.heroesService.updateHeroe( this.heroe ) : this.heroesService.createHeroe( this.heroe );
    request.subscribe(
      resp => {
        Swal.fire({
          title: 'Success',
          text: 'saved information',
          icon: 'success',
        });
        console.log(resp);
      }
    );
  }

}
