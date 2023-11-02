import { useCallback } from 'react';
import axios from 'axios';

export const useFetchData = ({
  searchedPlace,
  setFetchedData,
  setActive,
  setPerHourList,
  localDateRef,
}) => {
  const data = useCallback(
    e => {
      e.preventDefault();
      if (searchedPlace.length > 3) {
        axios
          .get('https://api.weatherapi.com/v1/forecast.json', {
            params: {
              key: 'bae68f473c254769b3275439231210',
              q: searchedPlace,
              days: 3,
              aqi: 'no',
              alert: 'no',
            },
          })
          .then(response => {
            response.data.forecast.forecastday[0].isToday = true;
            setFetchedData(response.data);
            setActive(response.data.forecast.forecastday[0].date);
            setPerHourList(response.data.forecast.forecastday[0]);
            localDateRef.current = new Date(response.data.location.localtime);
          })
          .catch(error => console.error(error));
      }
    },
    [searchedPlace]
  );

  return data;
};
