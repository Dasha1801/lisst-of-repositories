import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

interface IObjSearch {
  searchParamName: string;
  value: string;
}

const useFilterQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchString = searchParams.toString();

  const setNewSearchParams = useCallback(
    (value: IObjSearch) => {
      const isParameterEntry = !!searchParams.get(value.searchParamName);
      if (!isParameterEntry && value.value.length > 0) {
        searchParams.append(value.searchParamName, value.value);
      } else if (value.value.length > 0) {
        searchParams.set(value.searchParamName, value.value);
      } else {
        searchParams.delete(value.searchParamName);
      }
      setSearchParams(searchParams.toString());
    },
    [searchParams, setSearchParams]
  );

  const getCurrentSearchParamValue = useCallback(
    (searchParam: string) => {
      return searchParams.get(searchParam);
    },
    [searchParams]
  );

  return {
    searchString,
    getCurrentSearchParamValue,
    setNewSearchParams,
  };
};

export default useFilterQuery;
