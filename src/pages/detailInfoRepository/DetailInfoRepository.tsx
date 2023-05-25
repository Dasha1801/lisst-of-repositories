import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { useAppSelector } from '../../core/store/store';
import user from '../../assets/images/user.svg';
import iconLink from '../../assets/images/link-github.svg';
import arrow from '../../assets/images/arrow.svg';
import star from '../../assets/images/star.svg';
import './DetailInfoRepository.scss';

function DetailInfoRepository() {
  const navigate = useNavigate();

  const {
    info: {
      name,
      stargazerCount,
      pushedAt,
      avatarUrl,
      login,
      description,
      languages,
      url,
    },
  } = useAppSelector((state) => state.infoRepository);
  return (
    <div className="wrapper-info-detail">
      <div className="nav-link" onClick={() => navigate(-1)}>
        <img className="arrow" alt="" src={arrow} />
      </div>
      <img alt="" className="photo" src={avatarUrl || user} />
      <div className="name">{login}</div>
      <div className="info-block">
        <div className="repository-name">
          <span className="title">Name repository:</span> <span>{name}</span>
        </div>
        <div className="languages">
          <span className="title">Languages:</span>{' '}
          <div className="wrapper-lang">
            {languages.map((el, idx) => (
              <span key={`lang-${el}`}>
                {el}
                {idx !== languages.length - 1 ? ',' : ''}
              </span>
            ))}
          </div>{' '}
        </div>
      </div>
      {!!description && (
        <div className="description">
          <span>{description}</span>
        </div>
      )}
      <footer>
        <div className="item-footer">
          <div className="title">Дата последнего коммита:</div>
          <div className="info">{moment(pushedAt).format('DD.MM.Y')}</div>
        </div>
        <div className="item-footer">
          <div className="title">Рейтинг:</div>
          <div className="info">
            {stargazerCount}
            <img alt="" src={star} className="rating" />
          </div>
        </div>
        <Link to={url} className="link" target="_blank" title="Переход на репо">
          <img src={iconLink} alt="" />
        </Link>
      </footer>
    </div>
  );
}

export default DetailInfoRepository;
