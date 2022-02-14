import _Vue from 'vue';
import insertHTMLWithLinks from './dolinks';
import { IUserOptions } from './intrefaces';

const dolinks = {
  install(Vue: typeof _Vue, options: IUserOptions) {
    Vue.directive("dolinks", {
      inserted: (el, bind, vnode) => insertHTMLWithLinks(el, bind, vnode, options),
      // componentUpdated: (el, bind, vnode) => updateHTMLWithLinks(el, bind, vnode, options),
    });
  }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(dolinks);
}

export default dolinks;
