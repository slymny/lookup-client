import React, {useContext} from 'react';
import ErrorAndLoadingContext from '../store/ErrorAndLoadingContext';
import MainForecast from '../components/MainForecast';
import LoadingHandling from '../components/LoadingHandling';
import ErrorHandling from '../components/ErrorHandling';

function MainPage() {
  const {error, isLoading} = useContext(ErrorAndLoadingContext);

  if (error.includes('404')) return <ErrorHandling msg="City is not found!" />;
  else if (error) return <ErrorHandling msg="Oops! Something went wrong..." />;

  return (
    <div>
      {isLoading ? <LoadingHandling /> 
      : <MainForecast />}
    </div>
  )
}

export default MainPage;
