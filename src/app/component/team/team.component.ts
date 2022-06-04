import {Component, OnInit} from '@angular/core';
import {Team} from "../../model/team";
import {TeamService} from "../../service/team.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {Player} from "../../model/player";
import {PlayerService} from "../../service/player.service";
import {Trainer} from "../../model/trainer";
import {TrainerService} from "../../service/trainer.service";

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  public teams: Team[];
  public editTeam: Team;
  public toDeleteTeam: Team;
  public setInfoTeam: Team;
  public listMemberTeam: Team;

  public players: Player[];
  public trainers: Trainer[];


  constructor(private teamService: TeamService,
              private playerService: PlayerService,
              private trainerService: TrainerService) {
  }

  ngOnInit(): void {
    this.getTeams();
    this.getTrainers();
    this.getPlayers()
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

  public getTrainers(): void {
    this.trainerService.getTrainers().subscribe(
      (response: Trainer[]) => {
        this.trainers = response;
        console.log(this.trainers);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
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

  public addTeam(addFormTeam: NgForm): void {
    document.getElementById('add-team-form').click();
    this.teamService.addTeam(addFormTeam.value).subscribe(
      (response: Team) => {
        console.log(response);
        this.getTeams();
        addFormTeam.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.error.message);
        addFormTeam.reset();
      }
    );
  }

  public updateTeam(team: Team): void {
    this.teamService.updateTeam(team).subscribe(
      (response: Team) => {
        console.log(response);
        this.getTeams();
      },
      (error: HttpErrorResponse) => {
        alert(error.error.message);
      }
    );
  }

  public deleteTeam(id: number): void {
    this.teamService.deleteTeam(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getTeams();
      },
      (error: HttpErrorResponse) => {
        alert(error.error.message);
      }
    );
  }

  public searchTeam(key: string): void {
    console.log(key);
    const results: Team[] = [];
    for (const team of this.teams) {
      if (team.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || team.code.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(team);
      }
    }
    this.teams = results;
    if (results.length === 0 || !key) {
      this.getTeams();
    }
  }

  public onOpenModal(team: Team, mode: string): void {
    const container = document.getElementById('main-container')
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'addTeam') {
      button.setAttribute('data-target', '#addTeamModal');
    }

    if (mode === 'updateTeam') {
      this.editTeam = team;
      button.setAttribute('data-target', '#updateTeamModal');
    }
    if (mode === 'deleteTeam') {
      this.toDeleteTeam = team;
      button.setAttribute('data-target', '#deleteTeamModal');
    }

    if (mode === 'infoTeam') {
      this.setInfoTeam = team;
      button.setAttribute('data-target', '#infoTeam');
    }
    if (mode === 'listMemberTeam') {
      this.listMemberTeam = team;
      button.setAttribute('data-target', '#listMemberTeam');
    }


    container.appendChild(button);
    button.click();
  }

  public printReportInfoPdf(): void {
    window.print();
  }



}
