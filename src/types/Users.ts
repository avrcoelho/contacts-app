import { type User } from '@/models/User';

import { type ApiResponse } from './ApiResponse';

export type Users = ApiResponse<{ users: User[] }>;
