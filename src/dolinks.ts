import { VNode } from 'vue';
import { DirectiveBinding } from 'vue/types/options';

import { IOptions, ITextExists, IUserOptions } from './intrefaces';
import { compileLinkTag, getInnerText, getTextExistence } from './helpers';
import { sanitizeHTMLTags, defineOptions, handleWarningsAndErrors} from './helpers';


function updateHTMLWithLinks(
  el: HTMLElement, bind: DirectiveBinding, vnode: VNode, userOptions: IUserOptions = {}
) {
  const argText = bind.value ? bind.value : '';

  const options: IOptions = defineOptions(userOptions);
  const textExists: ITextExists = getTextExistence(el.innerHTML, argText);

  handleWarningsAndErrors(vnode, options, textExists);
  const innerText = getInnerText(textExists, el.innerHTML, argText);

  const innerSanitizedText = sanitizeHTMLTags(innerText);
  const validLinks = innerSanitizedText.match(options.urlRegEx);

  // First symbol of current textPartWithLink
  let startIdx = 0;

  // Last symbol of the link index
  let endIdx = 0;

  // Walk through text link by link, replacing each matched link
  // with <a href="" target=""> tag and adding all textPartWithLink to resultText
  let resultText = '';
  if (validLinks) {
    for (const validLink of validLinks) {
      const linkTag = compileLinkTag(validLink, options.target);

      endIdx = innerSanitizedText.indexOf(validLink, startIdx) + validLink.length;
      const textPartWithLink = innerSanitizedText.substring(startIdx, endIdx);
      const textWithLinkTag = textPartWithLink.replace(validLink, linkTag);

      resultText += textWithLinkTag;
      startIdx = endIdx;
    }
    // Append text if left after linking:
    const resTextLengthDiff = endIdx < innerSanitizedText.length;
    if (resTextLengthDiff) {
      const ending = innerSanitizedText.slice(endIdx);
      resultText += ending;
    }
  }
  el.innerHTML = resultText.length > 0 ? resultText : innerSanitizedText;
}

export default updateHTMLWithLinks;
