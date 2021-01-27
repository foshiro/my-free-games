import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from "@angular/common/http";

@Component({
    selector: 'game-detail-dialog',
    templateUrl: 'game-detail-dialog.html',
})
export class GameDetailDialog implements OnInit {
    private GAME_URL = 'https://api.rawg.io/api/games/';

    public gameDetail: any;

    constructor(
        private http: HttpClient,
        public dialogRef: MatDialogRef<GameDetailDialog>,
        @Inject(MAT_DIALOG_DATA) public data: string
    ) {}

    ngOnInit() {
        this.http.get(this.GAME_URL + this.data).subscribe(response => {
            console.log('response: ', response)
            this.gameDetail = response;
        })
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
