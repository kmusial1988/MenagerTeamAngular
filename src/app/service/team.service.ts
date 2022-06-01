import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Team} from "../model/team";

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient) { }


  private apiUrl = environment.apiBaseUrl+"/team";


  public getTeam(): Observable<Team[]>{
    return this.http.get<Team[]>(`${this.apiUrl}`);
  }

  public addTeam(team: Team): Observable<Team>{
    return this.http.post<Team>(`${this.apiUrl}`, team);
  }

  public updateTeam(team: Team): Observable<Team>{
    return this.http.put<Team>(`${this.apiUrl}`, team);
  }

  public deleteTeam(organizationId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${organizationId}`);
  }
}
