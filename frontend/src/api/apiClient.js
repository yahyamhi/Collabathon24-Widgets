const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchData = (endpoint) => {
  return fetch(`${API_BASE_URL}${endpoint}`).then((res) => {
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    return res.json();
  });
};

export const fetchWidgetData = () => {
  return fetchData('/widget-data');
};
