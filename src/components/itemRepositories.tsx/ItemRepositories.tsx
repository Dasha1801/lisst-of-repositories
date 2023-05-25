import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import iconLink from '../../assets/images/link-github.svg';
import star from '../../assets/images/star.svg';
import './ItemRepositories.scss';
import { useAppDispatch } from '../../core/store/store';
import { addDetailInfo } from '../../core/store/infoRepository/infoRepositorySlice';
import { IInfoRepository } from '../../core/store/infoRepository/infoRepositoryState';

export interface IItemRepo {
  name: string;
  stargazerCount: number;
  pushedAt: Date;
  url: string;
  id: string;
  owner: {
    avatarUrl: string | null;
    login: string;
  };
  languages: {
    nodes: { name: string }[];
  };
  description: string;
}

interface IItemRepoProps {
  info: IItemRepo;
}

function ItemRepositories({
  info: {
    name,
    stargazerCount,
    pushedAt,
    url,
    id,
    owner,
    languages: { nodes },
    description,
  },
}: IItemRepoProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onClickHandler = () => {
    const detailInfo: IInfoRepository = {
      description,
      name,
      stargazerCount,
      pushedAt,
      url,
      avatarUrl: owner.avatarUrl,
      login: owner.login,
      languages: nodes.map((el) => el.name),
    };
    dispatch(addDetailInfo(detailInfo));
    navigate(`${id}`);
  };
  return (
    <div className="wrapper-item-list">
      <div className="name clip" onClick={onClickHandler}>
        {name}
      </div>
      <div className="block-info">
        <div className="item-block-info">
          <div className="title">Дата последнего коммита</div>
          <div className="info">{moment(pushedAt).format('DD.MM.Y')}</div>
        </div>
        <div className="item-block-info">
          <div className="title">Рейтинг</div>
          <div className="info">
            {stargazerCount}
            <img alt="" src={star} className="rating" />
          </div>
        </div>
      </div>
      <Link to={url} className="link" target="_blank" title="Переход на репо">
        <img src={iconLink} alt="" />
      </Link>
    </div>
  );
}

export default ItemRepositories;
