import React, {ReactNode} from 'react';
import {getCurrentUser} from 'src/rest-api/user/hooks';

type TUser = 'user' | 'admin';

export const RolesContext = React.createContext<TUser>('user');

export function RolesProvider({children}:{children?: ReactNode}) {
  const id = localStorage.getItem('id');
  let roleUser:TUser = 'user';
  if (id) {
    const {data} = getCurrentUser(id);
    if (data?.name_role) roleUser = data?.name_role as TUser;
  }

  return (
    <RolesContext.Provider value={roleUser}>
      {children}
    </RolesContext.Provider>
  );
}
