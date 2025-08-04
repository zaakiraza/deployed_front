import React, { createContext, useContext, useState, useMemo } from 'react';


const DashboardContext = createContext(null);

export function DashboardProvider({ children }) {
 const [selectedView, setSelectedView] = useState(0);

    const contextValue = useMemo(() => ({
       selectedView, setSelectedView,
      }), [selectedView, setSelectedView]);

  return (
    <DashboardContext.Provider value={contextValue}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboardContext() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('DashboardContext must be used within a DashboardProvider');
  }
  return context;
}