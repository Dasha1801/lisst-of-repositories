import { useCallback, useState } from 'react';
import useFilterQuery from '../../utils/useFilterQuery';
import './Pagination.scss';

export const LIMIT_BASE = 10;

interface IAppPagination {
  totalCount: number;
  limit?: number;
}

function Pagination({ totalCount, limit = LIMIT_BASE }: IAppPagination) {
  const { setNewSearchParams, getCurrentSearchParamValue } = useFilterQuery();
  const [currentPage, setCurrentPages] = useState(
    !getCurrentSearchParamValue('offset')
      ? 1
      : (+getCurrentSearchParamValue('offset')! + limit) / limit
  );
  const pageCount = Math.ceil(totalCount / limit);
  const pages: number[] = Array.from({
    length: pageCount > 10 ? 10 : pageCount,
  }).map((_, idx) => idx + 1);

  const setCurrentPageHandler = useCallback(
    (page: number) => {
      setCurrentPages(page);
      setNewSearchParams({
        searchParamName: 'offset',
        value: `${(page > 0 ? page - 1 : page) * limit}`,
      });
    },
    [setNewSearchParams, limit]
  );

  return (
    <div className="pagination-wrapper">
      {pages.map((item, idx) => {
        return (
          <div
            className={`number-page ${currentPage === item ? 'active' : ''}`}
            onClick={() => setCurrentPageHandler(item)}
            key={`number-page-${item}-${idx + LIMIT_BASE}`}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
}

export default Pagination;
