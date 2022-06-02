import { Component, OnInit } from '@angular/core';
import {Parent} from "../../model/parent";
import {ParentService} from "../../service/parent.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {Trainer} from "../../model/trainer";

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {

  public parents: Parent[];
  public editParent: Parent;
  public toDeleteParent: Parent;
  public setInfoParent: Parent;

  constructor(
    private parentService: ParentService
  )  { }


  ngOnInit() {
    this.getParents();
  }


  public getParents(): void{
    this.parentService.getParent().subscribe(
      (response: Parent[]) => {
        this.parents = response;
        console.log(this.parents);
      },
      (error: HttpErrorResponse) => {
        alert(error.error.message);
      }
    );
  }

  public addParent(addFormParent: NgForm): void {
    document.getElementById('add-parent-form').click();
    this.parentService.addParent(addFormParent.value).subscribe(
      (response: Parent) => {
        console.log(response);
        this.getParents();
        addFormParent.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.error.message);
        addFormParent.reset();
      }
    );
  }
  public updateParent(parent: Parent): void {
    this.parentService.updateParent(parent).subscribe(
      (response: Parent) => {
        console.log(response);
        this.getParents();
      },
      (error: HttpErrorResponse) => {
        alert(error.error.message);
      }
    );
  }

  public deleteParent(id: number): void {
    this.parentService.deleteParent(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getParents();
      },
      (error: HttpErrorResponse) => {
        alert(error.error.message);
      }
    );
  }

  public searchParent(key: string): void {
    console.log(key);
    const results: Trainer[] = [];
    for (const parent of this.parents) {
      if (parent.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || parent.surname.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || parent.login.toLowerCase().indexOf(key.toLowerCase()) !== -1
      )
      {
        results.push(parent);
      }
    }
    this.parents = results;
    if (results.length === 0 || !key) {
      this.getParents();
    }
  }


  public onOpenModal(parent: Parent, mode: string): void{
    const container = document.getElementById('main-container')
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if(mode === 'addParent') {
      button.setAttribute('data-target', '#addParentModal');
    }

    if(mode === 'updateParent') {
      this.editParent = parent;
      button.setAttribute('data-target', '#updateParentModal');
    }
    if(mode === 'deleteParent') {
      this.toDeleteParent = parent;
      button.setAttribute('data-target', '#deleteParentModal');
    }

    if(mode === 'infoParent') {
      this.setInfoParent = parent;
      button.setAttribute('data-target', '#infoParent');
    }


    container.appendChild(button);
    button.click();
  }

  public printReportParentInfoPdf(): void{
    window.print();
  }

}
