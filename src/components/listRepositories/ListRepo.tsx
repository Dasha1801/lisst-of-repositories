import { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { GET_MY_REPOSITORIES, GET_REPOSITORIES } from '../../core/api';
import useFilterQuery from '../../utils/useFilterQuery';
import ItemRepo, { IItemRepo } from './ItemRepo';
import './ListRepo.scss';

function ListRepo() {
  const { getCurrentSearchParamValue } = useFilterQuery();
  const { data } = useQuery(GET_REPOSITORIES, {
    variables: {
      repositoryName: getCurrentSearchParamValue('name-repository'),
    },
    skip: !getCurrentSearchParamValue('name-repository'),
  });
  const { data: myRepositories } = useQuery(GET_MY_REPOSITORIES, {
    variables: { username: 'Dasha1801' },
  });

  const dataForRender = useMemo(() => {
    if (!getCurrentSearchParamValue('name-repository') && myRepositories) {
      return myRepositories?.user?.repositories.nodes;
    }
    if (data) {
      return data.search.nodes;
    }
    return [];
  }, [myRepositories, data, getCurrentSearchParamValue]);

  return (
    <div className="list-repo">
      {!!dataForRender.length &&
        dataForRender.map((el: IItemRepo) => (
          <ItemRepo info={el} key={`item-repo-${el.id}`} />
        ))}
    </div>
  );
}

export default ListRepo;
