// casl/ability.ts
import { Ability, AbilityBuilder } from '@casl/ability';

export type Actions = 'manage' | 'read' | 'create' | 'update' | 'delete';
export type Subjects = 'Article' | 'User' | 'all';

export const defineAbilityFor = (role: 'user' | 'admin') => {
  const { can, cannot, build } = new AbilityBuilder<Ability<[Actions, Subjects]>>(Ability);

  if (role === 'admin') {
    can('manage', 'all');
  } else if (role === 'user') {
    can('read', 'Article');
    cannot('delete', 'Article');
    cannot('create', 'Article');
  }

  return build();
};
