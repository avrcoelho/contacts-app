import { type GetUserParams } from '@/types/GetUser';

export const LIMIT = 20;

export const DEFAULT_PARAMS: GetUserParams = {
  search: '',
  searchBy: 'firstName',
  skip: 0,
};
