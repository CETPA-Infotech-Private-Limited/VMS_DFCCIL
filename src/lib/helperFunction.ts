export const setCookie = (name: string, value: any) => {
  const valueToStore =
    typeof value === 'object' ? JSON.stringify(value) : value;
  document.cookie = `${name}=${valueToStore}; path=/`;
};

export const getCookie = (name: string): any => {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(nameEQ) === 0) {
      const value = c.substring(nameEQ.length, c.length);
      try {
        return JSON.parse(value);
      } catch (e) {
        return value;
      }
    }
  }
  return null;
};

export const deleteCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
};
