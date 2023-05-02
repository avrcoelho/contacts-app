import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { Urls } from '@/constants/Urls';
import { usersMock } from '@/mocks/users';

import { getUsers } from '../getUsers';

const server = setupServer(
  rest.get(`${Urls.API_URL}/users`, async (_, res, ctx) => {
    return await res(ctx.json(usersMock));
  }),
);

describe('Get users service', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it('should be able to get users without search', async () => {
    const { users } = await getUsers();

    expect(users).toEqual(expect.arrayContaining(usersMock.users));
  });

  it('should be able to get users by search', async () => {
    server.use(
      rest.get(`${Urls.API_URL}/users/search`, async (_, res, ctx) => {
        return await res(ctx.json(usersMock));
      }),
    );
    const { users } = await getUsers({
      search: 'John',
      skip: 0,
    });

    expect(users).toEqual(expect.arrayContaining(usersMock.users));
  });
});
