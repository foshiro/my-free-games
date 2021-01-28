import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { searchGame } from '../../actions/game.actions';
import { GameState } from '../../reducers/game.reducer';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnDestroy {
  private searchSubject: Subject<string> = new Subject();

  constructor(private store: Store<GameState>) {
    this.setSearchSubscription();
  }

  search(searchString: string): void {
    this.searchSubject.next(searchString);
  }

  private setSearchSubscription(): void {
    this.searchSubject.pipe(
        debounceTime(environment.DEBOUNCE_TIME)
    ).subscribe(async (searchString: string) => {
      this.store.dispatch(searchGame({ limit: environment.ITEM_LIMIT, searchString }));
    });
  }

  ngOnDestroy(): void {
    this.searchSubject.unsubscribe();
  }
}
