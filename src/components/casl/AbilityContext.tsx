// casl/AbilityContext.tsx
import React, { createContext, ReactNode, useContext, useMemo } from 'react';
import { Ability } from '@casl/ability';

import { defineAbilityFor } from './ability';
import { roleSelector } from '../../appSlice';
import { useAppSelector } from '../common/hook/useAppSelector';

const AbilityContext = createContext<Ability | null>(null);

export const AbilityProvider = ({ children }: { children: ReactNode }) => {
  const role = useAppSelector(roleSelector);

  // Генеруємо ability для поточної ролі
  const ability = useMemo(() => defineAbilityFor(role), [role]);

  // Передаємо ability у контекст
  return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>;
};

export const useAbilityContext = () => {
  const context = useContext(AbilityContext);
  if (!context) {
    throw new Error('useAbilityContext must be used within an AbilityProvider');
  }
  return context;
};
