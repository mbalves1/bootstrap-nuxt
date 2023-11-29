import { URL_BASE } from './url';

export async function getUser(token) {
  const response = await fetch(`${URL_BASE}user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });
  return response;
}

