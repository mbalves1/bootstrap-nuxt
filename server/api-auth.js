import { URL_BASE } from './url';

export async function postResgister(payload) {
  const response = await fetch(`${URL_BASE}register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  return data;
}

export async function postLogin(payload) {
  const response = await fetch(`${URL_BASE}login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  return data;
}