import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Parent} from "../model/parent";

@Injectable({
  providedIn: 'root'
})
export class ParentService {

  constructor(private http: HttpClient) { }


  private apiUrl = environment.apiBaseUrl+"/parent";


  public getParent(): Observable<Parent[]>{
    return this.http.get<Parent[]>(`${this.apiUrl}`);
  }

  public addParent(parent: Parent): Observable<Parent>{
    return this.http.post<Parent>(`${this.apiUrl}`, parent);
  }

  public updateParent(parent: Parent): Observable<Parent>{
    return this.http.put<Parent>(`${this.apiUrl}`, parent);
  }

  public deleteParent(organizationId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${organizationId}`);
  }
}
