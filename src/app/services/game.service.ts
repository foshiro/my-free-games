import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { Game, SearchResponse } from '../models/game';

@Injectable()
export class GameService {
    constructor(private http: HttpClient) {}

    searchGame(limit: number, searchString: string): Observable<SearchResponse> {
        return this.http.get<SearchResponse>(`${environment.API_URL}?page_size=${limit}&search=${searchString}`);
    }

    getGameById(gameId: string): Observable<Game> {
        return this.http.get<Game>(`${environment.API_URL}/${gameId}`)
    }

    loadNextGameList(nextPageUrl: string): Observable<SearchResponse> {
        return this.http.get<SearchResponse>(nextPageUrl);
    }
}
