import {Component, OnInit} from '@angular/core';
import {Parent} from "../../model/parent";
import {ParentService} from "../../service/parent.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {Player} from "../../model/player";
import {PlayerService} from "../../service/player.service";

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
  public addPlayerToParent: Parent;
  public playerParent: Parent;

  public players: Player[];
  public editPlayer: Player;
  public toDeletePlayer: Player;
  public setInfoPlayer: Player;

  constructor(
    private parentService: ParentService,
    private playerService: PlayerService
  )  { }


  ngOnInit() {
    this.getParents();
    this.getPlayers();
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
  public getPlayers(): void{
    this.playerService.getPlayer().subscribe(
      (response: Player[]) => {
        this.players = response;
        console.log(this.players);
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

  public addPlayer(addFormPlayer: NgForm): void {
    document.getElementById('add-player-form').click();
    this.playerService.addPlayer(addFormPlayer.value).subscribe(
      (response: Player) => {
        console.log(response);
        this.getPlayers();
        addFormPlayer.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.error.message);
        addFormPlayer.reset();
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
    const results: Parent[] = [];
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

    if(mode === 'playerParent') {
      this.playerParent = parent;
      button.setAttribute('data-target', '#playerParent');
    }

    if(mode === 'addPlayerToParent') {
      this.addPlayerToParent = parent;
      button.setAttribute('data-target', '#addPlayerToParent');
    }

    container.appendChild(button);
    button.click();
  }

  public printReportParentInfoPdf(): void{
    window.print();
  }


  public updatePlayer(player: Player): void {
    this.playerService.updatePlayer(player).subscribe(
      (response: Player) => {
        console.log(response);
        this.getPlayers();
      },
      (error: HttpErrorResponse) => {
        alert(error.error.message);
      }
    );
  }

  public deletePlayer(id: number): void {
    this.playerService.deletePlayer(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getPlayers();
      },
      (error: HttpErrorResponse) => {
        alert(error.error.message);
      }
    );
  }

  public searchPlayer(key: string): void {
    console.log(key);
    const results: Player[] = [];
    for (const player of this.players) {
      if (
        player.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || player.surname.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || player.login.toLowerCase().indexOf(key.toLowerCase()) !== -1
      )
      {
        results.push(player);
      }
    }
    this.players = results;
    if (results.length === 0 || !key) {
      this.getPlayers();
    }
  }


  public onOpenModalPlayer(player: Player, mode: string): void{
    const container = document.getElementById('main-container')
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');


    if(mode === 'updatePlayer') {
      this.editPlayer = player;
      button.setAttribute('data-target', '#updatePlayerModal');
    }
    if(mode === 'deletePlayer') {
      this.toDeletePlayer = player;
      button.setAttribute('data-target', '#deletePlayerModal');
    }

    if(mode === 'infoPlayer') {
      this.setInfoPlayer = player;
      button.setAttribute('data-target', '#infoPlayer');
    }


    container.appendChild(button);
    button.click();
  }

  public printReportPlayerInfoPdf(): void{
    window.print();
  }

}
