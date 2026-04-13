import type { Action } from 'redux';

export const SET_LANG = 'SET_LANG';

export interface SetLangAction extends Action<typeof SET_LANG> {
  type: typeof SET_LANG;
  lang: string;
  [key: string]: unknown;
}

export const setLang = (lang: string): SetLangAction => ({
  type: SET_LANG,
  lang,
});
