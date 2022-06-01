import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Organization} from "../model/organization";

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private http: HttpClient) { }


  private apiUrl = environment.apiBaseUrl+"/organization";


  public getOrganization(): Observable<Organization[]>{
    return this.http.get<Organization[]>(`${this.apiUrl}`);
  }

  public addOrganization(organization: Organization): Observable<Organization>{
    return this.http.post<Organization>(`${this.apiUrl}`, organization);
  }

  public updateOrganization(organization: Organization): Observable<Organization>{
    return this.http.put<Organization>(`${this.apiUrl}`, organization);
  }

  public deleteOrganization(organizationId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${organizationId}`);
  }


}
