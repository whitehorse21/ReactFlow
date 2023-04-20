import { createContext } from 'react';
import useFlows from '../hooks/useFlows';
// ----------------------------------------------------------------------

const FlowsContext = createContext();

function FlowsProvider({ children }) {
  const { data, error, status, changeCurrentFlow, addNewFlow, deleteFlow, saveToFlash, loadFlow } = useFlows();

  return (
    <FlowsContext.Provider
      value={{
        data,
        error,
        status,
        changeCurrentFlow,
        addNewFlow,
        deleteFlow,
        saveToFlash,
        loadFlow
      }}
    >
      {children}
    </FlowsContext.Provider>
  );
}

export { FlowsContext, FlowsProvider };
