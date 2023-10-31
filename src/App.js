import React, { useState, useRef, useCallback, createContext } from 'react';
import axios from 'axios';
import {
  ChakraProvider,
  Box,
  VStack,
  theme,
  Container,
  Grid,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { TodayMemoized } from './components/Today';
import { ForecsatListMemoized } from './components/ForecastList';
import { TimeTableList } from './components/TimeTableList';
import { Search } from './components/Search';
import { LocationMemoized } from './components/Location';

const ForecastContext = createContext(undefined);

function App() {
  const localDateRef = useRef();
  const [searchedPlace, setSearchedPlace] = useState('');
  const [fetchedData, setFetchedData] = useState(undefined);
  const [perHourList, setPerHourList] = useState(undefined);
  const [active, setActive] = useState(undefined);

  const submitHandler = useCallback(
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

  const inputChange = e => {
    setSearchedPlace(e.target.value);
  };

  const clearSearchInput = () => {
    setSearchedPlace('');
  };

  return (
    <ChakraProvider theme={theme}>
      <Box minH="100vh" p={3}>
        <Box textAlign="right">
          <ColorModeSwitcher />
        </Box>
        <VStack pt="3rem" spacing={8}>
          <Container maxW="container.xl">
            <Search
              searchedPlace={searchedPlace}
              inputChange={inputChange}
              clearSearchInput={clearSearchInput}
              submitHandler={submitHandler}
            />
            {fetchedData && (
              <>
                <Grid templateColumns={{ md: '1fr 2fr' }} mt="1rem">
                  <LocationMemoized
                    current={localDateRef.current}
                    location={fetchedData.location}
                  />
                  <TodayMemoized
                    current={fetchedData.current}
                    forecast={fetchedData.forecast}
                  />
                </Grid>
                <ForecastContext.Provider
                  value={{
                    setPerHourList: setPerHourList,
                    setActive: setActive,
                    active: active,
                  }}
                >
                  <ForecsatListMemoized
                    list={fetchedData.forecast.forecastday}
                  />
                </ForecastContext.Provider>
                <TimeTableList
                  list={perHourList}
                  localDateNow={localDateRef.current}
                />
              </>
            )}
          </Container>
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default App;
export { ForecastContext };
