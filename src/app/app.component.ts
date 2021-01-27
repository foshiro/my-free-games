import { Component, OnDestroy } from '@angular/core';

import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { MatDialog } from '@angular/material/dialog';
import { GameDetailDialog } from "./dialog/game-detail-dialog";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  private _DEBOUNCE_TIME = 500;
  private GAME_URL = 'https://api.rawg.io/api/games?page_size=12&search='
  private _searchSubject: Subject<string> = new Subject();

  public gameList = [];

  constructor(private http: HttpClient, public dialog: MatDialog) {
    this._setSearchSubscription();
  }

  search(searchString) {
    this._searchSubject.next(searchString);
  }

  openDetail(gameId) {
    this.dialog.open(GameDetailDialog, {
      data: gameId
    });

  }

  private _setSearchSubscription() {
    this._searchSubject.pipe(
      debounceTime(this._DEBOUNCE_TIME)
    ).subscribe(async (searchValue: string) => {
      const response: any = await this.http.get(this.GAME_URL + searchValue).toPromise();
      this.gameList = response.results;
    });
  }

  ngOnDestroy() {
    this._searchSubject.unsubscribe();
  }
}
