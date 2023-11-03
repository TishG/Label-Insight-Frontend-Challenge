// Fetches data from an API
// Paramaters: url - the resource to access and request data from
// Returns: the requested data object
// Note: Handle or catch errors when calling this function
type Image = {
  title: string;
  thumbnailUrl: string;
  url: string;
};
export const fetchData = async (
  url: string,
): Promise<Array<Image>> => {
  const response = await fetch(url);
  const data = await response.json();
  const images = await data.splice(0, 25);
  return images;
};

// Gets saved data from local storage and converts the string to an object
// Paramaters: name - the title of the data
// Returns: data object
export const getSaved = (
  name: string,
): { [name: string]: string } | null => {
  const savedData = localStorage.getItem(name);

  return savedData ? JSON.parse(savedData) : null;
};

// Converts the data to a string and saves it in locanStorage
// Paramaters:
// // name - the title of the data
// // data - the value to save
// Returns: undefined
export const setSaved = (
  name: string,
  data: { [data: string]: string },
): null => {
  localStorage.setItem(name, JSON.stringify(data));
  return null;
};
