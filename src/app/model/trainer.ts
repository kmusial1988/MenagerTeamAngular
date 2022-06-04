import {Role} from "../enum/role.enum";
import {Status} from "../enum/status.enum";

export interface  Trainer{

  id: number;
  name: string;
  surname: string;
  login: string;
  password: string;
  imageUrl: string;
  joined: string;
  status: Status;
  role: Role;
  teamName: string;


}
