import { Component, OnInit } from '@angular/core';
import {Organization} from "../../model/organization";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  public onOpenModal(organization: Organization,   mode: string): void{
    const container = document.getElementById('main-container')
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if(mode === 'team') {
      button.setAttribute('data-target', '#parentModal');
    }
    if(mode === 'trainer') {
      button.setAttribute('data-target', '#parentModal');
    }
    if(mode === 'player') {
      button.setAttribute('data-target', '#/parent');
    }
    if(mode === 'parent') {
      button.setAttribute('data-target', '#/parent');
     }
    container.appendChild(button);
    button.click();
  }

}
