import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../../core/api';
import ItemRepo, { IItemRepo } from './ItemRepo';
import './ListRepo.scss';

function ListRepo() {
  const { data } = useQuery(GET_REPOSITORIES, {
    variables: { repositoryName: 'add' },
  });

  return (
    <div className="list-repo">
      {!!data &&
        data.search.nodes.map((el: IItemRepo) => (
          <ItemRepo info={el} key={`item-repo-${el.id}`} />
        ))}
    </div>
  );
}

export default ListRepo;
