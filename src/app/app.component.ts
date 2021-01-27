import { Component, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { GameDetailDialog } from './dialog/game-detail-dialog';
import { GameService } from './services/game.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  private searchSubject: Subject<string> = new Subject();
  public gameList = [];

  constructor(
      private http: HttpClient,
      private gameService:  GameService,
      private dialog: MatDialog) {
    this._setSearchSubscription();
  }

  search(searchString) {
    this.searchSubject.next(searchString);
  }

  openDetail(gameId) {
    this.dialog.open(GameDetailDialog, {
      data: {
        gameId: gameId
      }
    });
  }

  private _setSearchSubscription() {
    this.searchSubject.pipe(
      debounceTime(environment.DEBOUNCE_TIME)
    ).subscribe(async (searchValue: string) => {
      const response: any = await this.gameService.getGameList(environment.ITEM_LIMIT, searchValue).toPromise();
      this.gameList = response.results;
    });
  }

  ngOnDestroy() {
    this.searchSubject.unsubscribe();
  }
}
