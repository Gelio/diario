import { ComponentType } from 'react';

export const getComponentName = (Component: ComponentType<any>) =>
  Component.displayName || Component.name || 'Component';
