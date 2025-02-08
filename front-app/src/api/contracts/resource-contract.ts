export type TableReservation = {
  employeeId: number;
  reason: string;
  resourceId: number;
  reservationTime: string;
};

export type ResourceDTO = {
  id: number;
  name: string;
  description: string;
  resourceTypeId: number;
  resourceTypeName: string;
};

export type AvailableResourceDTO = {
  id: number;
  name: string;
  resources: ResourceDTO[];
};

export type ResourceTypeDTO = {
  id: number;
  name: string;
};
