export type Reservation = {
  id: number;
  createdAt: Date;
  employee: Employee;
  reason: string;
  date: string;
  startTime: string;
  endTime: string;
  denied: boolean;
  resources: Resource[];
};

export type Employee = {
  id: number;
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
};

export type Resource = {
  id: number;
  name: string;
  description: string;
  resourceTypeId: number;
  resourceTypeName: string;
};
