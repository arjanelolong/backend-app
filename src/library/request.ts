import axios from 'axios';

export default async (endpoint) => {
  try {
    const { data } = await axios.get<string>(endpoint, {
      headers: {
        Accept: 'application/json',
      },
    });

    return data;
  } catch (error) {
    throw Error(error.message);
  }
};
