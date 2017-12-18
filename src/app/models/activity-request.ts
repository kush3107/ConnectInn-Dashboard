import {User} from "./user";

export class ActivityRequest {
  id: number;
  activity_id: number;
  sender_id: number;

  created_at: string;
  updated_at: string;
}

export function getSender(request: ActivityRequest): User {
  return request['sender']['data'];
}
