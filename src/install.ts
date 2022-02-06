import _Vue from 'vue';
import updateHTMLWithLinks from './dolinks';
import { IOptions } from './helpers';

const dolinks = {
  install(Vue: typeof _Vue, options: IOptions) {
    Vue.directive("dolinks", {
      inserted: (el, bind, vnode) => updateHTMLWithLinks(el, bind, vnode, options),
      componentUpdated: (el, bind, vnode) => updateHTMLWithLinks(el, bind, vnode, options),
    });
  }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(dolinks);
}

export default dolinks;
