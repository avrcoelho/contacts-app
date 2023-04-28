import { DEFAULT_PARAMS, LIMIT } from '@/constants/getUser';
import { api } from '@/libs/axios';
import { type Users } from '@/types/Users';

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
