// Fetches data from an API
// Paramaters: url - the resource to access and request data from
// Returns: the requested data object
// Note: Handle or catch errors when calling this function
export const fetchData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  const photos = await data.splice(0, 25);
  return photos;
};

// Gets saved data from local storage and converts the string to an object
// Paramaters: name - the title of the data
// Returns: data object
export const getSaved = (name) =>
  JSON.parse(localStorage.getItem(name));

// Converts the data to a string and saves it in locanStorage
// Paramaters:
// // name - the title of the data
// // data - the value to save
// Returns: undefined
export const setSaved = (name, data) => {
  localStorage.setItem(name, JSON.stringify(data));
  return null;
};
