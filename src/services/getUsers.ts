import { type User } from '@/models/User';

import { api } from '../libs/axios';
import { type ApiResponse } from '../models/ApiResponse';

interface GEtUserParams {
  search: string;
  searchBy: 'firstName' | 'email';
  skip?: number;
}

type Users = ApiResponse<{ users: User[] }>;

const LIMIT = 20;
const DEFAULT_PARAMS: GEtUserParams = {
  search: '',
  searchBy: 'firstName',
  skip: 0,
};

export const getUsers = async ({
  search,
  searchBy,
  skip,
} = DEFAULT_PARAMS): Promise<Users> => {
  const filterPath =
    search !== '' ? `filter?key=${searchBy}&value=${search}` : '';
  const { data } = await api.get<Users>(`users/${filterPath}`, {
    params: {
      limit: LIMIT,
      skip,
      select: 'id,firstName,lastName,email,phone,image,address',
    },
  });
  return data;
};
