import { type SearchBy } from '@/types/SearchBy';

export interface GetUserParams {
  search: string;
  searchBy: SearchBy;
  skip?: number;
}
