import { DEFAULT_PARAMS, LIMIT } from '@/constants/getUser';
import { api } from '@/libs/axios';
import { type Users } from '@/types/Users';

export const getUsers = async ({
  search,
  skip,
} = DEFAULT_PARAMS): Promise<Users> => {
  const searchPath = search === '' ? '' : 'search';
  const { data } = await api.get<Users>(`users/${searchPath}`, {
    params: {
      q: search,
      limit: LIMIT,
      skip,
      select: 'id,firstName,lastName,email,phone,image,address',
    },
  });
  return data;
};
