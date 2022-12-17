/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
const STORE_NAME = 'user';

const getSessionObject = (storeName) => {
  const retrievedObject = localStorage.getItem(storeName);
  if (!retrievedObject) return;
  return JSON.parse(retrievedObject);
};

const setSessionObject = (storeName, object) => {
  const storageValue = JSON.stringify(object);
  localStorage.setItem(storeName, storageValue);
};

const removeSessionObject = (storeName) => {
  localStorage.removeItem(storeName);
};

export { getSessionObject, setSessionObject, removeSessionObject };
