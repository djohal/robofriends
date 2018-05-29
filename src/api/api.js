export const getLink = (link) => {
  return fetch(link).then(res => res.json());
}