import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { GameService } from '../services/game.service';
import { Game } from '../models/game';

@Component({
    selector: 'game-detail-dialog',
    templateUrl: 'game-detail-dialog.html',
})
export class GameDetailDialog implements OnInit {
    public gameDetail: Game;

    constructor(
        private http: HttpClient,
        private gameService:  GameService,
        private dialogRef: MatDialogRef<GameDetailDialog>,
        @Inject(MAT_DIALOG_DATA) public data
    ) {}

    ngOnInit() {
        this.gameService.getGameById(this.data.gameId).subscribe((response: Game) => {
            this.gameDetail = response;
        });
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
