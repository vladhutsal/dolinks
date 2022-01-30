import { DirectiveBinding } from 'vue/types/options';

const defaultTarget = '_blank';
const defaultUrlRegExp = new RegExp(['^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.',
                                     '[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.',
                                     '[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.',
                                     '[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$'].join(''));


export type Ttarget = '_self' | '_blank' | '_parent' | '_top';
export interface IOptions {
  urlRegEx: RegExp;
  target: Ttarget;
};


function defineOptions(options: IOptions) {
  const validUrlRegExp = options.urlRegEx ? options.urlRegEx : defaultUrlRegExp;
  const aTarget = options.target ? options.target : defaultTarget;
  return { validUrlRegExp, aTarget };
};


function updateLinkedPhrase(nEnd: number, linkedPhrase: string, newText: string) {
  if (nEnd) {
    return linkedPhrase + newText + '\n';
  }
  return linkedPhrase + newText;
}


export default function updateHTMLWithLinks(el: HTMLElement, bind: DirectiveBinding, options: IOptions) {
  const { validUrlRegExp, aTarget } = defineOptions(options);

  const text = bind.value;
  const spaceSplitedText = text.split(' ');

  const linkedTextArr = spaceSplitedText.map((word: string) => {
    const nSplitedPhrase = word.split(/\n/);
    let nEnd = nSplitedPhrase.length > 1 ? nSplitedPhrase.length : 0;
    
    let nSplitedPhraseLinked = '';
    for (const nSplitedTerm of nSplitedPhrase) {
      nEnd -= 1;
      const isTermALink = nSplitedTerm.match(validUrlRegExp);
      if (isTermALink) {
        const linkEl = `<a href="${nSplitedTerm}" target="${aTarget}">${nSplitedTerm}</a>`;
        nSplitedPhraseLinked = updateLinkedPhrase(nEnd, nSplitedPhraseLinked, linkEl);
        continue;
      }
      nSplitedPhraseLinked = updateLinkedPhrase(nEnd, nSplitedPhraseLinked, nSplitedTerm);
    }
    return nSplitedPhraseLinked;
    
  });
  el.innerHTML = linkedTextArr.join(' ');
}
