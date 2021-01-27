import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { Game } from '../models/game';

@Injectable()
export class GameService {
    constructor(private http: HttpClient) {}

    getGameList(limit: number, searchString: string): Observable<Game[]> {
        return this.http.get<Game[]>(`${environment.API_URL}?page_size=${limit}&search=${searchString}`).pipe(
            map(res => res['results'])
        );
    }

    getGameById(gameId: string): Observable<Game> {
        return this.http.get<Game>(`${environment.API_URL}/${gameId}`)
    }
}
