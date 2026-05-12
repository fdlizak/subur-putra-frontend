export const getAdminPin = () => {

  const savedPin = localStorage.getItem("adminPin");

  // default pertama
  return savedPin || "123456";

};

export const setAdminPin = (newPin) => {

  localStorage.setItem(
    "adminPin",
    newPin
  );

};