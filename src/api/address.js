import { API_URL } from "../utils/constans";

export async function getAddressesApi(auth) {
  try {
    //const url = `${API_URL}/api/addresses?user=${auth.idUser}`; /como esta en el curso

    const url = `${API_URL}/api/addresses?filters[user]=${auth.idUser}`;
    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function addAddressApi(auth, formData) {
  try {
    const url = `${API_URL}/api/addresses`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify({
        data: { user: auth.idUser, ...formData },
      }),
    };

    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function deleteAddressApi(auth, idAddress) {
  try {
    const url = `${API_URL}/api/addresses/${idAddress}`;
    const params = {
      method: "DELETE",
      headers: {
        "Content-Type": "apllication/json",
        Authorization: `Bearer ${auth.token}`,
      },
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getAddressApi(auth, idAddress) {
  try {
    const url = `${API_URL}/api/addresses/${idAddress}`;
    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateAddressApi(auth, address) {
  console.log("auth", auth);
  console.log("address", address);
  try {
    const url = `${API_URL}/api/addresses/${address.id}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Beaver ${auth.token}`,
      },
      body: JSON.stringify({
        data: { ...address },
      }),
    };

    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
