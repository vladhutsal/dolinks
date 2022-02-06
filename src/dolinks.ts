import { VNode } from 'vue';
import { DirectiveBinding } from 'vue/types/options';

import { IOptions } from './helpers';
import { validHTMLtagRegExp } from './helpers';
import { sanitizeHTMLTags, updateLinkedPhrase, defineOptions, handleConsoleWarnings} from './helpers';


function updateHTMLWithLinks(el: HTMLElement, bind: DirectiveBinding, vnode: VNode, options: IOptions = {}) {
  const { urlRegEx, target, disableWarnings } = defineOptions(options);
  const attrText = bind.value ? bind.value : undefined;

  const error = handleConsoleWarnings(vnode, attrText, disableWarnings);
  if (error) {
    return;
  }

  const spaceSplitedText = attrText!.split(' ');
  const linkedTextArr = spaceSplitedText.map((word: string) => {
    const nSplitedPhrase = word.split(/\n/);
    let nEnd = nSplitedPhrase.length > 1 ? nSplitedPhrase.length : 0;
    
    let nSplitedPhraseLinked = '';
    for (let nSplitedTerm of nSplitedPhrase) {
      nEnd -= 1;

      const isTermLink = nSplitedTerm.match(urlRegEx);
      const isTermHTMLTag = nSplitedTerm.match(validHTMLtagRegExp);
      
      if (isTermHTMLTag) {
        nSplitedTerm = sanitizeHTMLTags(nSplitedTerm);
      }

      if (isTermLink) {
        const linkEl = `<a href="${nSplitedTerm}" target="${target}">${nSplitedTerm}</a>`;
        nSplitedPhraseLinked = updateLinkedPhrase(nEnd, nSplitedPhraseLinked, linkEl);
        continue;
      }
      nSplitedPhraseLinked = updateLinkedPhrase(nEnd, nSplitedPhraseLinked, nSplitedTerm);
    }
    return nSplitedPhraseLinked;
    
  });
  el.innerHTML = linkedTextArr.join(' ');
}

export default updateHTMLWithLinks;
