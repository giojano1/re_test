export type Card = {
  id: number;
  bg: string;
  tasks: task[];
};
export type task = {
  id: number;
  title: string;
  isComplete: boolean;
};
