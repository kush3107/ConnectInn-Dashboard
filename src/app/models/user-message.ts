export class UserMessage {
  id: string;
  message: string;
  timestamp: number;
  sender: {
    id: number;
    name: string;
    email: string;
  };
}
