import {Status} from "../enum/status.enum";
import {Role} from "../enum/role.enum";

export interface  Player{

  id: number;
  name: string;
  surname: string;
  login: string;
  password: string;
  imageUrl: string;
  joined: string;
  status: Status;
  role: Role;


}
