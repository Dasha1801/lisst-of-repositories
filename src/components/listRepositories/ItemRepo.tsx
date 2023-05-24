import { Link } from 'react-router-dom';
import iconLink from '../../assets/images/link-github.svg';
import star from '../../assets/images/star.svg';

export interface IItemRepo {
  name: string;
  stargazerCount: number;
  pushedAt: string;
  url: string;
  id: number;
}

interface IItemRepoProps {
  info: IItemRepo;
}

function ItemRepo({
  info: { name, stargazerCount, pushedAt, url },
}: IItemRepoProps) {
  return (
    <div className="wrapper-item-list">
      <div className="name clip">{name}</div>
      <div className="block-info">
        <div className="item-block-info">
          <div className="title">Дата последнего коммита</div>
          <div className="info">{pushedAt}</div>
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
        {' '}
        <img src={iconLink} alt="" />
      </Link>
    </div>
  );
}

export default ItemRepo;
