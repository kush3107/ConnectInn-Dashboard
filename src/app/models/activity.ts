import {User} from "./user";

export class Activity {
  id: number;
  title: string;
  description: string;
  start: string;
  end: string;
  type: string;
  link: string;
  meta: any;

  created_at: string;
  updated_at: string;
}

export function getOwner(activity: Activity): User {
  return this['owner']['data'];
}

export function getMembers(activity: Activity): User[] {
  return this['members']['data'];
}
