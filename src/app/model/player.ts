import {Status} from "../enum/status.enum";
import {Role} from "../enum/role.enum";

export interface  Player{

  id: number;
  name: string;
  surname: string;
  login: string;
  password: string;
  imageUrl: string;
  startWork: string;
  status: Status;
  role: Role;


}
