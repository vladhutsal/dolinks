export const defaultWarnings = false;
export const defaultTarget = '_blank';

export const defaultUrlRegExp = new RegExp([
  'https?:\/\/[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.',
  '[a-zA-Z0-9()]{1,6}\\b[-a-zA-Z0-9@:%._\\+~#=\\/]{0,2048}',
  ].join(''), 'g'
);
