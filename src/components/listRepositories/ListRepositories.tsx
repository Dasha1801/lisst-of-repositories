import { useEffect } from 'react'
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES, GET_REPOSITORIES_COUNT } from '../../core/api/Api';
import useFilterQuery from '../../utils/useFilterQuery';
import Pagination, { LIMIT_BASE } from '../pagination/Pagination';
import './ListRepositories.scss';
import ItemRepositories, { IItemRepo } from '../itemRepositories.tsx/ItemRepositories';

function ListRepositories() {
  const { getCurrentSearchParamValue, setNewSearchParams } = useFilterQuery();
  const { data, loading } = useQuery(GET_REPOSITORIES, {
    variables: {
      repositoryName: getCurrentSearchParamValue('name-repository'),
      first: 10,
      after:
        !!getCurrentSearchParamValue('offset') &&
          +getCurrentSearchParamValue('offset')! > 0
          ? btoa(`cursor:${getCurrentSearchParamValue('offset')}`)
          : null,
    },
    skip: !getCurrentSearchParamValue('name-repository'),
  });

  const { data: count } = useQuery(GET_REPOSITORIES_COUNT, {
    variables: {
      repositoryName: getCurrentSearchParamValue('name-repository'),
    },
    skip: !getCurrentSearchParamValue('name-repository'),
  });

  useEffect(() => {
    if (!data && getCurrentSearchParamValue('offset')) {
      setNewSearchParams({ value: '', searchParamName: 'offset' })
    }
  }, [])

  return (
    <>
      <div className="list-repo">
        {!!data &&
          data.search.nodes.map((el: IItemRepo) => (
            <ItemRepositories info={el} key={`item-repo-${el.id}`} />
          ))}
      </div>
      {!!(
        count?.search.repositoryCount &&
        !loading &&
        count.search.repositoryCount > LIMIT_BASE
      ) && <Pagination totalCount={count.search.repositoryCount} />}
    </>
  );
}

export default ListRepositories;
