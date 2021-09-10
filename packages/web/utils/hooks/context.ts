import React, { useContext } from 'react';

const AppContext = React.createContext<any>({});

export const useAppContext = () => useContext(AppContext);

export default AppContext;