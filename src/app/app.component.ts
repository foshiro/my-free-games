import { Component, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { GameDetailDialog } from './dialog/game-detail-dialog';
import { GameService } from './services/game.service';
import { environment } from '../environments/environment';
import { Game } from './models/game';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  private searchSubject: Subject<string> = new Subject();
  public gameList: Game[];

  constructor(
      private http: HttpClient,
      private gameService:  GameService,
      private dialog: MatDialog) {
    this.setSearchSubscription();
  }

  search(searchString: string): void {
    this.searchSubject.next(searchString);
  }

  openDetail(gameId: string) {
    this.dialog.open(GameDetailDialog, {
      data: {
        gameId: gameId
      }
    });
  }

  private setSearchSubscription(): void {
    this.searchSubject.pipe(
      debounceTime(environment.DEBOUNCE_TIME)
    ).subscribe(async (searchValue: string) => {
      const response: Game[] = await this.gameService.getGameList(environment.ITEM_LIMIT, searchValue).toPromise();
      this.gameList = response;
    });
  }

  ngOnDestroy(): void {
    this.searchSubject.unsubscribe();
  }
}
