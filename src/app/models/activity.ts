import {User} from "./user";
import {Invitation} from "./invitation";

export class Activity {
  id: number;
  title: string;
  description: string;
  start: string;
  status: string;
  end: string;
  type: string;
  link: string;
  meta: any;

  created_at: string;
  updated_at: string;
}

export function getOwner(activity: Activity): User {
  return activity['owner']['data'];
}

export function getMembers(activity: Activity): User[] {
  return activity['members']['data'];
}

export function getInvitations(activity: Activity): Invitation[] {
  return activity['invitations']['data'];
}
