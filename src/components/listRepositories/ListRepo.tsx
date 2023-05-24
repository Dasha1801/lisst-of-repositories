import './ListRepo.scss';
import iconLink from '../../assets/images/link-github.svg';
import star from '../../assets/images/star.svg';

interface IItemRepo {
  name: string;
  rating: number;
  lastDate: string;
  link: string;
  id: number;
}

interface IItemRepoProps {
  info: IItemRepo;
}

const mockData: IItemRepo[] = [
  {
    name: 'При клике на название репозитория',
    rating: 2,
    lastDate: '23.05.2023',
    link: 'kkkk/ssss/ss',
    id: 1253,
  },
  {
    name: 'При клике на название репозитория',
    rating: 5,
    lastDate: '23.05.2023',
    link: 'kkkk/ssss/ss',
    id: 12532,
  },
  {
    name: 'При клике на название репозитория',
    rating: 1,
    lastDate: '23.05.2023',
    link: 'kkkk/ssss/ss',
    id: 12544,
  },
  {
    name: 'При клике на название репозитория',
    rating: 3,
    lastDate: '23.05.2023',
    link: 'kkkk/ssss/ss',
    id: 12531234,
  },
];

function ItemRepo({ info: { name, rating, lastDate, id } }: IItemRepoProps) {
  return (
    <div className="wrapper-item-list">
      <div className="name clip-base">{name}</div>
      <div className="block-info">
        <div className="item-block-info">
          <div className="title">Дата последнего коммита</div>
          <div className="info">{lastDate}</div>
        </div>
        <div className="item-block-info">
          <div className="title">Рейтинг</div>
          <div className="info">
            {Array.from({ length: rating }, () => '').map((_, idx) => (
              <img
                alt=""
                src={star}
                className="rating"
                key={`rating-${id}-${rating * idx}`}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="link" title="Переход на профиль пользователя">
        <img src={iconLink} alt="" />
      </div>
    </div>
  );
}

function ListRepo() {
  return (
    <div className="list-repo">
      {mockData.map((el) => (
        <ItemRepo info={el} key={`item-repo-${el.id}`} />
      ))}
    </div>
  );
}

export default ListRepo;
