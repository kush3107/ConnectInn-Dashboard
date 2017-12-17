import {Attribute} from "./attribute";

export class User {
  id: number;
  name: string;
  email: string;
  phone: string;
  profile_pic: string;
  about: string;
  rating: number;
  date_of_birth: string;

  created_at: string;
  udpated_at: string;
}

export function getFollowing(user: User): User[] {
  return user['following']['data'];
}

export function  getAttributes(user: User): Attribute[] {
  return user['attributes']['data'];
}
