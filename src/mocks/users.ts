import { type User } from '@/models/User';
import { type ApiResponse } from '@/types/ApiResponse';

export const usersMock: ApiResponse<{ users: User[] }> = {
  users: [
    {
      id: 1,
      firstName: 'Terry',
      lastName: 'Medhurst',
      email: 'atuny0@sohu.com',
      phone: '+63 791 675 8914',
      image: 'https://robohash.org/hicveldicta.png',
      address: {
        address: '1745 T Street Southeast',
        city: 'Washington',
        postalCode: '20020',
        state: 'DC',
      },
    },
  ],
  total: 1,
  skip: 0,
  limit: 1,
};
