import {User} from "./user";

export class Invitation {
  id: number;
  activity_id: number;
  sender_id: number;
  receiver_id: number;

  created_at: string;
  updated_at: string
}

export function getSender(invitation: Invitation): User {
  return invitation['sender']['data'];
}

export function getReceiver(invitation: Invitation): User {
  return invitation['receiver']['data'];
}
