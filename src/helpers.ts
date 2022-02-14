import { VNode } from 'vue';
import { IOptions, ITextExists, IUserOptions } from './intrefaces';
import { defaultWarnings, defaultTarget, defaultUrlRegExp } from './env';


export function defineOptions(options: IUserOptions): IOptions {
  const urlRegEx = options.urlRegEx ? options.urlRegEx : defaultUrlRegExp;
  const target = options.target ? options.target : defaultTarget;
  const disableWarnings = options.disableWarnings ? options.disableWarnings : defaultWarnings;
  return { urlRegEx, target, disableWarnings };
};


export function compileLinkTag(link: string, target: string): string {
  return `<a href="${link}" target="${target}">${link}</a>`
}


export function sanitizeHTMLTags(text: string): string {
  return text.replace(/</g, '&lt;');
}


export function handleWarningsAndErrors(
  vnode: VNode,
  options: IOptions,
  textExists: ITextExists,
) {
  // ignoring disableWarnings feature, due to deprecated mode v-dolinks="'text'"
  if (textExists.arg) {
    console.error(
      `v-dolinks [DEPRECATED use case: v-dolinks="'your text'"] (in <${vnode.tag}> tag):`,
      'move text from v-dolinks arg to inner tag text:',
      '<p v-dolinks>"{{ yourTextAsValue }}"</p>',
    );
  }

  if (options.disableWarnings) return;

  if (!textExists.inner) {
    console.warn(
      `v-dolinks (in <${vnode.tag}> tag):`,
      'element uses dolinks directive but has no text;',
    );
  }
}


export function getInnerText(
  textExists: ITextExists,
  inner: string,
  arg: string
): string | string {
  if (textExists.arg) return arg;
  return inner;
}


export function getTextExistence(inner: string, arg: string): ITextExists {
  const isInnerText = (inner.length > 0);
  const isArgText = (arg.length > 0);
  return {
    'inner': isInnerText,
    'arg': isArgText,
  }
}
