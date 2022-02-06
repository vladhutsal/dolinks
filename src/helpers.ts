// TYPES
export type Ttarget = '_self' | '_blank' | '_parent' | '_top';

export interface IOptions {
  urlRegEx?: RegExp;
  target?: Ttarget;
};


// DEFAULTS
export const validHTMLtagRegExp = /<(“[^”]*”|'[^’]*’|[^'”>])*>/

const defaultTarget = '_blank';
const defaultUrlRegExp = new RegExp(['^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.',
                                     '[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.',
                                     '[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.',
                                     '[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$'].join(''));


// HELPERS
export function defineOptions(options: IOptions) {
  const validUrlRegExp = options.urlRegEx ? options.urlRegEx : defaultUrlRegExp;
  const aTarget = options.target ? options.target : defaultTarget;
  return { validUrlRegExp, aTarget };
};


export function updateLinkedPhrase(nEnd: number, linkedPhrase: string, newText: string) {
  if (nEnd) {
    return linkedPhrase + newText + '\n';
  }
  return linkedPhrase + newText;
}

export function sanitizeHTMLTags(text: string) {
  const letterArr = Array.from(text);
  const replaced = letterArr.map((letter) => {
    if (letter === '<') {
      letter = '&lt;';
    }
    return letter;
  });
  return replaced.join('');
}
