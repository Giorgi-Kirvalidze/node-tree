export interface Tree {
  id: string;
  name: string;
  position: string;
  children?: Tree[];
  parent: string | '';
}
