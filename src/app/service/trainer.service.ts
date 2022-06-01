import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Trainer} from "../model/trainer";

@Injectable({
  providedIn: 'root'
})
export class TrainerService {

  constructor(private http: HttpClient) { }


  private apiUrl = environment.apiBaseUrl+"/trainer";


  public getTrainers(): Observable<Trainer[]>{
    return this.http.get<Trainer[]>(`${this.apiUrl}`);
  }

  public addTrainer(trainer: Trainer): Observable<Trainer>{
    return this.http.post<Trainer>(`${this.apiUrl}`, trainer);
  }

  public updateTrainer(trainer: Trainer): Observable<Trainer>{
    return this.http.put<Trainer>(`${this.apiUrl}`, trainer);
  }

  public deleteTrainer(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
