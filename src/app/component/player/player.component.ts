import {Component, OnInit} from '@angular/core';
import {PlayerService} from "../../service/player.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {Player} from "../../model/player";
import {TeamService} from "../../service/team.service";
import {Team} from "../../model/team";
import {ParentService} from "../../service/parent.service";
import {Parent} from "../../model/parent";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  public players: Player[];
  public editPlayer: Player;
  public toDeletePlayer: Player;
  public setInfoPlayer: Player;

  public teams: Team[];

  public parents: Parent[];

  constructor(
    private parentService: ParentService,
    private playerService: PlayerService,
    private teamService: TeamService
  )  { }


  ngOnInit() {
    this.getParents();
    this.getPlayers();
    this.getTeams();
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

  public getTeams(): void {
    this.teamService.getTeam().subscribe(
      (response: Team[]) => {
        this.teams = response;
        console.log(this.teams);
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


  public onOpenModal(player: Player, mode: string): void{
    const container = document.getElementById('main-container')
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if(mode === 'addPlayer') {
      button.setAttribute('data-target', '#addPlayerModal');
    }

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
