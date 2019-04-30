import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Hero} from '../../../../core/hero';
import {HeroService} from '../../../../core/hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent {
  heroes$: Observable<Hero[]>;

  constructor(private heroSerivce: HeroService, private router: Router) {
    this.heroes$ = this.heroSerivce.heroes$;
    this.heroSerivce.loadHeroes();
  }

  onHeroClicked(hero: Hero) {
    this.router.navigate(['/detail', hero.id]);
  }
}
