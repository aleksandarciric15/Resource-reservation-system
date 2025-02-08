export type Company = {
  id: number;
  name: string;
  description: string;
  workTimeStart: string;
  workTimeEnd: string;
};

export const defaultCompanyTime = {
  startTime: "07:00",
  endTime: "16:00",
};

export type Department = {
  id: number;
  name: string;
};
