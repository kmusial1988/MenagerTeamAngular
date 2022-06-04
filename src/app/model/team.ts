import {Status} from "../enum/status.enum";

export interface  Team{

  id: number;
  name: string;
  code: string;
  email: string;
  imageUrl: string;
  joined: string;
  status: Status;
  countPlayer: number;
  countTrainer: number;




}
