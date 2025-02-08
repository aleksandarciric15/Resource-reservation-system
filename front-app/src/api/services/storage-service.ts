const authStr = "AURH";

const setIsAuth = (value: boolean) => {
  localStorage.setItem(authStr, JSON.stringify(value));
};

const getIsAuth = () => {
  const value = localStorage.getItem(authStr);

  return Boolean(value);
};

export { setIsAuth, getIsAuth };
