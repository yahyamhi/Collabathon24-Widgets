const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Generalized fetchData function to support different methods (GET, POST, etc.)
export const fetchData = (endpoint, options = {}) => {
  // Ensure options is an object even if null is passed
  options = options || {};

  return fetch(`${API_BASE_URL}${endpoint}`, {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    body: options.body ? JSON.stringify(options.body) : null,
  }).then((res) => {
    if (!res.ok) {
      throw new Error('');
    }
    return res.json();
  });
};

// Existing function to fetch widget data (no changes needed here)
export const fetchWidgetData = () => {
  return fetchData('/widget-data');
};
