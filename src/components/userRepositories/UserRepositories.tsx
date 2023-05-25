import { useQuery } from '@apollo/client';
import { useMemo } from 'react';
import { GET_MY_REPOSITORIES } from '../../core/api/Api';
import Pagination, { LIMIT_BASE } from '../pagination/Pagination';
import '../listRepositories/ListRepositories.scss';
import useFilterQuery from '../../utils/useFilterQuery';
import ItemRepositories, {
  IItemRepo,
} from '../itemRepositories.tsx/ItemRepositories';

function UserRepositories() {
  const { getCurrentSearchParamValue } = useFilterQuery();
  const { data } = useQuery(GET_MY_REPOSITORIES, {
    variables: {
      username: 'Dasha1801',
      first: 100,
    },
  });

  const getRenderData = useMemo(() => {
    const list = data?.user?.repositories?.nodes;
    const offset = getCurrentSearchParamValue('offset');

    if (list) {
      if (!offset || +offset < LIMIT_BASE) {
        return list.slice(0, LIMIT_BASE);
      }
      return list.slice(+offset, +offset + 10);
    }

    return [];
  }, [data, getCurrentSearchParamValue]);

  return (
    <>
      <div className="list-repo">
        {!!getRenderData.length &&
          getRenderData.map((el: IItemRepo) => (
            <ItemRepositories info={el} key={`item-repo-${el.id}`} />
          ))}
      </div>
      {!!(data?.user?.repositories.totalCount > LIMIT_BASE) && (
        <Pagination totalCount={data?.user?.repositories.totalCount} />
      )}
    </>
  );
}

export default UserRepositories;
