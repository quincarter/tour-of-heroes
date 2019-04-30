import { Hero } from '../../core/hero';

import * as heroActions from './hero.actions';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';

export interface HeroState extends EntityState<Hero> {
  // additional hero properties.
  selectedId: number;
  loading: boolean;
  error: string;
}

export const heroAdapter: EntityAdapter<Hero> = createEntityAdapter<Hero>();
export const initialHeroState: HeroState = heroAdapter.getInitialState({
  selectedId: null,
  loading: false,
  error: ''
});

export function heroReducer(
  state = initialHeroState,
  action: heroActions.HeroActions
): HeroState {
  switch (action.type) {
    case heroActions.HeroActionTypes.SearchAllHeroEntities: {
      return {
        ...heroAdapter.removeAll(state),
        loading: true,
        error: ''
      };
    }
    case heroActions.HeroActionTypes.LoadHeroById: {
      return {
        ...heroAdapter.removeAll(state),
        selectedId: action.payload.id,
        loading: true,
        error: ''
      };
    }

    case heroActions.HeroActionTypes.LoadHeroByIdSuccess: {
      return {
        ...heroAdapter.addOne(action.payload.result, state),
        loading: false,
        error: ''
      };
    }

    case heroActions.HeroActionTypes.LoadHeroByIdFail: {
      return {
        ...state,
        loading: false,
        error: 'Hero load failed: ' + action.payload.error
      };
    }

    default: {
      return state;
    }
  }
}
