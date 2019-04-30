import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { SearchAllHeroEntities } from './../../../../state/hero/hero.actions';
import { topHeroes } from '../../../../state/hero';
import { AppState } from '../../../../state/app.interfaces';
import { Hero } from '../../../../core/hero';
import {HeroService} from '../../../../core/hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  heroes$: Observable<Hero[]>;

  constructor(private heroSerivce: HeroService, private router: Router) {
    this.heroes$ = this.heroSerivce.topHeroes$;
    this.heroSerivce.loadHeroes();
  }

  onHeroClicked(hero: Hero) {
    this.router.navigate(['/detail', hero.id]);
  }
}
