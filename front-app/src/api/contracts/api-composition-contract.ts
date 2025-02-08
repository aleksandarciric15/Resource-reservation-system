export type ReservationDTO = {
  id: number;
  createdAt: Date;
  employee: EmployeeDTO;
  reason: string;
  date: string;
  startTime: string;
  endTime: string;
  denied: boolean;
  resources: ResourceDTO[];
};

export type EmployeeDTO = {
  id: number;
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
};

export type ResourceDTO = {
  id: number;
  name: string;
  description: string;
  resourceTypeId: number;
  resourceTypeName: string;
};
