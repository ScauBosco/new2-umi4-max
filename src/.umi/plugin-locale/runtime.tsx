// @ts-nocheck
// This file is generated by Umi automatically
// DO NOT CHANGE IT MANUALLY!
import React from 'react';
// @ts-ignore
import { _LocaleContainer } from './locale';
import { getIntl, getLocale } from './localeExports';
export function i18nProvider(container: Element) {
  return React.createElement(_LocaleContainer, null, container);
}

export function patchRoutes({ routes }) {
  // loop all route for patch title field
  const intl = getIntl(getLocale());
  const traverseRoute = (routes) => {
    Object.keys(routes).forEach((key) => {
      const route = routes[key];
      if (route.title) {
        route.locale = route.title;
        const newTitle = intl.messages[route.title] ? intl.formatMessage({ id: route.title }, {}) : route.title;
        route.name = intl.messages[route.title] ? intl.formatMessage({ id: route.title }, {}) : route.name;
        route.title = newTitle;
      }
      if (route.routes) {
        traverseRoute(route.routes);
      }
      if (route.children) {
        traverseRoute(route.children);
      }
    })
  }
  traverseRoute(routes);
}