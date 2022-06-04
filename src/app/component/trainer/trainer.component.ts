import {Component, OnInit} from '@angular/core';
import {TrainerService} from "../../service/trainer.service";
import {Trainer} from "../../model/trainer";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {Team} from "../../model/team";
import {TeamService} from "../../service/team.service";

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.css']
})
export class TrainerComponent implements OnInit {

  public trainers: Trainer[];
  public toEditTrainer: Trainer;
  public toDeleteTrainer: Trainer;
  public setInfoTrainer: Trainer;

  public teams: Team[];

  constructor(private trainerService: TrainerService,
              private teamService: TeamService) { }

  ngOnInit(): void {
    this.getTrainers();
    this.getTeams();
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

  public addTrainer(addFormTrainer: NgForm): void {
    document.getElementById('add-trainer-form').click();
    this.trainerService.addTrainer(addFormTrainer.value).subscribe(
      (response: Trainer) => {
        console.log(response);
        this.getTrainers();
        addFormTrainer.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addFormTrainer.reset();
      }
    );
  }

  public deleteTrainerModal(trainer: Trainer): void {
    this.trainerService.updateTrainer(trainer).subscribe(
      (response: Trainer) => {
        console.log(response);
        this.getTrainers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public deleteTrainer(id: number): void {
    this.trainerService.deleteTrainer(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getTrainers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchTrainers(key: string): void {
    console.log(key);
    const results: Trainer[] = [];
    for (const trainer of this.trainers) {
      if (trainer.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || trainer.surname.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || trainer.login.toLowerCase().indexOf(key.toLowerCase()) !== -1
      )
      {
        results.push(trainer);
      }
    }
    this.trainers = results;
    if (results.length === 0 || !key) {
      this.getTrainers();
    }
  }



  public onOpenModal(trainer: Trainer,   mode: string): void {
    const container = document.getElementById('main-container')
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'addTrainer') {
      button.setAttribute('data-target', '#addTrainerModal');
    }
    if (mode === 'updateTrainer') {
      this.toEditTrainer = trainer;
      button.setAttribute('data-target', '#editTrainerModal');
    }
    if (mode === 'deleteTrainer') {
      this.toDeleteTrainer = trainer;
      console.log(this.toDeleteTrainer)
      button.setAttribute('data-target', '#deleteTrainerModal');
    }

    if (mode === 'infoTrainer') {
      this.setInfoTrainer = trainer;
      button.setAttribute('data-target', '#infoTrainer');
  }

    container.appendChild(button);
    button.click();
  }

  public printReportInfoPdf(): void{
    window.print();
  }

}
