import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Player} from "../model/player";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private http: HttpClient) { }


  private apiUrl = environment.apiBaseUrl+"/player";


  public getPlayer(): Observable<Player[]>{
    return this.http.get<Player[]>(`${this.apiUrl}`);
  }

  public addPlayer(player: Player): Observable<Player>{
    return this.http.post<Player>(`${this.apiUrl}`, player);
  }

  public updatePlayer(player: Player): Observable<Player>{
    return this.http.put<Player>(`${this.apiUrl}`, player);
  }

  public deletePlayer(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
