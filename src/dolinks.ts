import { VNode } from 'vue';
import { DirectiveBinding } from 'vue/types/options';

import { IOptions } from './helpers';
import { validHTMLtagRegExp } from './helpers';
import { sanitizeHTMLTags, updateLinkedPhrase, defineOptions } from './helpers';


function updateHTMLWithLinks(el: HTMLElement, bind: DirectiveBinding, vnode: VNode, options: IOptions) {
  const opts = options ? options : {};
  const { validUrlRegExp, aTarget } = defineOptions(opts);
  const text = bind.value ? bind.value : undefined;
  
  if (!text) {
    console.error(
      `v-dolinks: seems like v-dolinks directive argument is empty (inside of <${vnode.tag}> tag).\n`,
      '          Pass text directly to v-dolniks as argument: v-dolinks="\'Your text here\'"');
  }

  const spaceSplitedText = text!.split(' ');
  const linkedTextArr = spaceSplitedText.map((word: string) => {
    const nSplitedPhrase = word.split(/\n/);
    let nEnd = nSplitedPhrase.length > 1 ? nSplitedPhrase.length : 0;
    
    let nSplitedPhraseLinked = '';
    for (let nSplitedTerm of nSplitedPhrase) {
      nEnd -= 1;

      const isTermLink = nSplitedTerm.match(validUrlRegExp);
      const isTermHTMLTag = nSplitedTerm.match(validHTMLtagRegExp);
      
      if (isTermHTMLTag) {
        nSplitedTerm = sanitizeHTMLTags(nSplitedTerm);
      }

      if (isTermLink) {
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

export default updateHTMLWithLinks;
