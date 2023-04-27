import axios from 'axios';

import { Urls } from '@/constants/Urls';

export const api = axios.create({
  baseURL: Urls.API_URL,
});
