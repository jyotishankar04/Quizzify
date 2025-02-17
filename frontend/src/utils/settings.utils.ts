const getUsernameFromUrl = (url: string) => {
  const urlParts = url.split("/");
  return urlParts[urlParts.length - 1];
};

export { getUsernameFromUrl };
