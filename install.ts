import _Vue from 'vue';
import updateHTMLWithLinks, { IOptions } from './dolinks';

const dolinks = {
  install(Vue: typeof _Vue, options: IOptions) {
    Vue.directive("dolinks", {
      inserted: (el, bind) => updateHTMLWithLinks(el, bind, options),
      componentUpdated: (el, bind) => updateHTMLWithLinks(el, bind, options),
    });
  }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(dolinks);
}

export default dolinks;
