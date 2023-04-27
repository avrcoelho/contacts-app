import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { Urls } from '@/constants/Urls';
import { usersMOck } from '@/mocks/users';

import { getUsers } from '../getUsers';

const server = setupServer(
  rest.get(`${Urls.API_URL}/users`, async (_, res, ctx) => {
    return await res(ctx.json(usersMOck));
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

  it('should be able to get users without filters', async () => {
    const { users } = await getUsers();

    expect(users).toEqual(expect.arrayContaining(usersMOck.users));
  });

  it('should be able to get users without filters', async () => {
    server.use(
      rest.get(`${Urls.API_URL}/users/filter`, async (_, res, ctx) => {
        return await res(ctx.json(usersMOck));
      }),
    );
    const { users } = await getUsers({
      search: 'John',
      searchBy: 'firstName',
      skip: 0,
    });

    expect(users).toEqual(expect.arrayContaining(usersMOck.users));
  });
});
