import { Component, OnInit } from '@angular/core';
import {Organization} from "../../model/organization";
import {Trainer} from "../../model/trainer";
import {Parent} from "../../model/parent";
import {Player} from "../../model/player";
import {Team} from "../../model/team";
import {TrainerService} from "../../service/trainer.service";
import {ParentService} from "../../service/parent.service";
import {PlayerService} from "../../service/player.service";
import {TeamService} from "../../service/team.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public trainers: Trainer[];
  public parents: Parent[];
  public players: Player[];
  public teams: Team[];


  constructor(private trainerService: TrainerService,
              private parentService: ParentService,
              private playerService: PlayerService,
              private teamService: TeamService) { }





  ngOnInit(): void {
    this.getTeams();
    this.getParents();
    this.getPlayers();
    this.getTrainers();

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
  public getTeams(): void{
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
