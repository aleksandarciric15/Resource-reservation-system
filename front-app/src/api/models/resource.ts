export type Resource = {
  id: number;
  name: string;
  description: string;
  resourceTypeId: number;
  resourceTypeName: string;
};

export type AvailableResource = {
  id: number;
  name: string;
  resources: Resource[];
};

export type ResourceType = {
  id: number;
  name: string;
};

export type ColorResource = {
  id: number;
  name: string;
  description: string;
  resourceTypeId: number;
  resourceTypeName: string;
  color: string;
};
