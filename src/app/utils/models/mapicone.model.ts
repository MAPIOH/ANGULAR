import { Tag } from "./tag.model";

export interface MapIcone{
  id?: number;
  coordX: number;
  coordY: number;
  icone_id: number;
  listTags: Tag[];
}
