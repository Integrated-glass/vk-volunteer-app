import fecha from 'fecha';

export default (start, end) => {
  let left = fecha.format(new Date(start), 'DD.MM.YY');
  let right = fecha.format(new Date(end), 'DD.MM.YY');
  return `${left} – ${right}`;
};
