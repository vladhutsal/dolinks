import { VNode } from 'vue';

// TYPES
export type Ttarget = '_self' | '_blank' | '_parent' | '_top';

export interface IOptions {
  urlRegEx?: RegExp;
  target?: Ttarget;
  disableWarnings?: boolean;
};

interface IDefaultOptions {
  urlRegEx: RegExp;
  target: Ttarget;
  disableWarnings: boolean;
}


// DEFAULTS
export const validHTMLtagRegExp = /<(“[^”]*”|'[^’]*’|[^'”>])*>/

const defaultWarnings = false;
const defaultTarget = '_blank';
const defaultUrlRegExp = new RegExp(['^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.',
                                     '[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.',
                                     '[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.',
                                     '[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$'].join(''));


// HELPERS
export function defineOptions(options: IOptions): IDefaultOptions {
  const urlRegEx = options.urlRegEx ? options.urlRegEx : defaultUrlRegExp;
  const target = options.target ? options.target : defaultTarget;
  const disableWarnings = options.disableWarnings ? options.disableWarnings : defaultWarnings;
  return { urlRegEx, target, disableWarnings };
};


export function updateLinkedPhrase(nEnd: number, linkedPhrase: string, newText: string): string {
  if (nEnd > 0) {
    return linkedPhrase + newText + '\n';
  }
  return linkedPhrase + newText;
}


export function sanitizeHTMLTags(text: string): string {
  const letterArr = Array.from(text);
  const replaced = letterArr.map((letter) => {
    return letter === '<' ? '&lt;' : letter;
  });
  return replaced.join('');
}


export function handleConsoleWarnings(vnode: VNode, argText: string | undefined, disableWarnings: boolean): boolean {
  if (disableWarnings) {
    return false;
  }
  let stopExec = false;
  if (!argText) {
    console.error(
      `v-dolinks: seems like v-dolinks directive argument is empty (inside of <${vnode.tag}> tag).`,
      'Pass text directly to v-dolniks as argument: v-dolinks="\'Your text here\'"');
      stopExec = true;
  }
  if (vnode.children && vnode.children[0].text) {
    console.warn(`v-dolinks: text inside of <${vnode.tag}> is ignored`);
  }
  return stopExec;
}
