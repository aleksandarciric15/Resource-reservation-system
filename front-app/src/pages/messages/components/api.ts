import type { Message, User } from "./types";

// Mock data
const users: User[] = [
  { id: "1", username: "johndoe", firstName: "John", lastName: "Doe" },
  { id: "2", username: "janesmith", firstName: "Jane", lastName: "Smith" },
];

const messages: Message[] = [
  {
    id: "1",
    createdAt: "2023-05-15T10:30:00Z",
    isRead: false,
    message: "Is the conference room still available for tomorrow?",
    receiverId: "2",
    sender: users[0],
    reservationDate: "2023-05-16",
    resourceName: "Conference Room A",
  },
  {
    id: "2",
    createdAt: "2023-05-14T14:45:00Z",
    isRead: false,
    message: "Can I extend my reservation for the projector?",
    receiverId: "2",
    sender: users[1],
    reservationDate: "2023-05-17",
    resourceName: "Projector X1000",
  },
];

export async function getMessages(userId: string): Promise<Message[]> {
  // In a real app, this would fetch from an API
  return messages.filter((m) => m.receiverId === userId);
}

export async function markAsRead(messageId: string): Promise<void> {
  // In a real app, this would update the database
  const message = messages.find((m) => m.id === messageId);
  if (message) {
    message.isRead = true;
  }
}

export async function sendReply(
  messageId: string,
  reply: string
): Promise<void> {
  // In a real app, this would send the reply to the API
  console.log(`Sending reply to message ${messageId}: ${reply}`);
}
