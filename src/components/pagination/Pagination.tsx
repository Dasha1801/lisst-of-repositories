import { useCallback, useState, useEffect, useMemo } from 'react';
import useFilterQuery from '../../utils/useFilterQuery';
import './Pagination.scss';

const LIMIT_BASE = 10;

export function createPages(
  pages: (number | string)[],
  pagesCount: number,
  currentPage: number
) {
  if (pagesCount > 4) {
    if (currentPage >= 3) {
      currentPage > 3 && pages.push(1, '...');
      const starting =
        currentPage === pagesCount
          ? currentPage - 2
          : currentPage > 3
          ? currentPage - 1
          : 1;
      for (let i = starting; i <= currentPage + 1; i++) {
        pages.push(i);
        if (i === pagesCount) break;
      }
      if (currentPage + 2 === pagesCount) {
        pages.push(pagesCount);
      }
      if (currentPage + 2 < pagesCount) {
        pages.push('...', pagesCount);
      }
    } else {
      for (let i = 1; i <= 3; i++) {
        pages.push(i);
        if (i === pagesCount) break;
      }
      if (pagesCount > 4) {
        pages.push('...', pagesCount);
      } else {
        pages.push(pagesCount);
      }
    }
  } else {
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }
  }
}

interface IAppPagination {
  totalCount: number;
  limit?: number;
}

export function Pagination({ totalCount, limit = LIMIT_BASE }: IAppPagination) {
  const { setNewSearchParams, getCurrentSearchParamValue } = useFilterQuery();
  const [currentPage, setCurrentPages] = useState(
    !getCurrentSearchParamValue('offset')
      ? 1
      : (+getCurrentSearchParamValue('offset')! + limit) / limit
  );
  const pageCount = Math.ceil(totalCount / limit);
  const pages: (number | string)[] = [];

  const detailData = useMemo(() => {
    const offset = Number(getCurrentSearchParamValue('offset'));
    const limitItems = Number(getCurrentSearchParamValue('limit'));
    if (totalCount) {
      const isShowAll = limitItems
        ? offset + limitItems >= totalCount
        : offset + LIMIT_BASE >= totalCount;
      return {
        isShowAll,
        offset,
        limit,
      };
    }

    return {
      isShowAll: true,
      offset,
      limit,
    };
  }, [getCurrentSearchParamValue, totalCount, limit]);

  createPages(pages, pageCount, currentPage);

  const setCurrentPageHandler = useCallback(
    (page: number) => {
      setCurrentPages(page);
      setNewSearchParams({
        searchParamName: 'offset',
        value: `${(page > 0 ? page - 1 : page) * limit}`,
      });
      setNewSearchParams({ searchParamName: 'limit', value: `` });
    },
    [limit, setNewSearchParams]
  );

  useEffect(() => {
    if (!detailData.offset && !detailData.limit) {
      setCurrentPages(1);
    } else if (detailData.limit) {
      const page = (detailData.offset + detailData.limit) / limit;
      setCurrentPages(page);
    }
  }, [detailData, limit]);

  useEffect(() => {
    if (!detailData.limit) {
      window.scrollTo(0, 0);
    }
  }, [currentPage, detailData.limit]);

  return (
    <div className="pagination-wrapper">
      {pages.map((item) => {
        return (
          <div
            className={`number-page ${currentPage === item ? 'active' : ''}${
              item === '...' ? ' dots' : ''
            }`}
            onClick={
              typeof item === 'number'
                ? () => setCurrentPageHandler(item)
                : undefined
            }
            key={`number-page-${item}`}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
}

export default Pagination;
