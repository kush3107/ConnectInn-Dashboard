import {User} from "./user";
import {Invitation} from "./invitation";
import {isNullOrUndefined} from "util";
import {ActivityRequest} from "./activity-request";

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
  if (isNullOrUndefined(activity['members'])) {
    return [];
  }
  return activity['members']['data'];
}

export function getInvitations(activity: Activity): Invitation[] {
  if (isNullOrUndefined(activity['invitations'])) {
    return [];
  }
  return activity['invitations']['data'];
}

export function getRequests(activity: Activity): ActivityRequest[] {
  if (isNullOrUndefined(activity['requests'])) {
    return [];
  }

  return activity['requests']['data'];
}
