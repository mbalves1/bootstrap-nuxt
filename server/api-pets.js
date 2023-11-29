import { URL_BASE } from './url';

export async function getListPets(token) {
  const response = await fetch(`${URL_BASE}pets`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });
  return response;
}

export async function getPet(id, token) {
  const response = await fetch(`${URL_BASE}pets/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });
  return response;
}

export async function postPet(payload, token) {
  const formData = new FormData()
  const filteredPayload = payload.image
  formData.appendFile('blob', filteredPayload)
  const dataPayload = {
    ...payload,
    image: formData
  }
  console.log("payload", formData)

  const response = await fetch(`${URL_BASE}pets`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(dataPayload),
  });
  return response;
}

export async function putPet(payload, token) {
  const response = await fetch(`${URL_BASE}pets/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(payload),
  });
  return response;
}

export async function deletePet(id, token) {
  const response = await fetch(`${URL_BASE}pets/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  return response;
}


