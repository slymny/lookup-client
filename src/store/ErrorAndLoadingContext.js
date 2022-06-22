import React, {createContext, useState} from 'react';

const ErrorAndLoadingContext = createContext({
  isLoading: true,
  changeIsLoading: () => {},
  error: '',
  setError: msg => {},
});

export function ErrorAndLoadingContextProvider(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  function isLoadingHandler(boolean) {
    setIsLoading(false);
  }

  function errorMessageHandler(msg) {
    setError(msg);
  }

  const context = {
    isLoading,
    changeIsLoading: isLoadingHandler,
    error,
    setError: errorMessageHandler,
  };

  return (
    <ErrorAndLoadingContext.Provider value={context}>
      {props.children}
    </ErrorAndLoadingContext.Provider>
  );
}

export default ErrorAndLoadingContext;
