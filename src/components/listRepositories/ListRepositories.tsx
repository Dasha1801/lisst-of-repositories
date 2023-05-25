import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES, GET_REPOSITORIES_COUNT } from '../../core/api/Api';
import useFilterQuery from '../../utils/useFilterQuery';
import './ListRepositories.scss';
import ItemRepositories, {
  IItemRepo,
} from '../itemRepositories.tsx/ItemRepositories';
import Pagination, { LIMIT_BASE } from '../pagination/Pagination';
import Spinner from '../spinner/Spinner';

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
    setNewSearchParams({ value: '', searchParamName: 'offset' });
    // eslint-disable-next-line
  }, []); 

  return (
    <>
      <div className="list-repo">
        {!!data &&
          data.search.edges.map((el: { node: IItemRepo }) => (
            <ItemRepositories info={el.node} key={`item-repo-${el.node.id}`} />
          ))}
      </div>
      {!!(
        count?.search.repositoryCount &&
        !loading &&
        count.search.repositoryCount > LIMIT_BASE
      ) && <Pagination totalCount={count.search.repositoryCount} />}
      {!!loading && <Spinner />}
    </>
  );
}

export default ListRepositories;
