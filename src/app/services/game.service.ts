import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class GameService {
    constructor(private http: HttpClient) {}

    getGameList(limit: number, searchString: string): Observable<any> {
        return this.http.get<any>(`${environment.API_URL}?page_size=${limit}&search=${searchString}`)
    }

    getGameById(gameId: string): Observable<any> {
        return this.http.get<any>(`${environment.API_URL}/${gameId}`)
    }
}
