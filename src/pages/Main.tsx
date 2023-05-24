import githubLogo from '../assets/images/github.svg';
import search from '../assets/images/search.svg';
import InputField from '../components/inputField/InputField';
import ListRepo from '../components/listRepositories/ListRepo';
import Pagination from '../components/pagination/Pagination';
import useFilterQuery from '../utils/useFilterQuery';
import './Main.scss';

function Main() {
  const { setNewSearchParams, getCurrentSearchParamValue } = useFilterQuery();

  // const { data: count } = useQuery(GET_REPOSITORIES_COUNT, {
  //   variables: { repositoryName: 'add' },
  // });

  return (
    <>
      <header>
        <img src={githubLogo} alt="" className="logo" />
        <InputField
          placeholder="Введите название репозитория"
          value={
            getCurrentSearchParamValue('name-repository')
              ? getCurrentSearchParamValue('name-repository')!
              : ''
          }
          onChange={(val) =>
            setNewSearchParams({
              value: val,
              searchParamName: 'name-repository',
            })
          }
          name="search"
          iconName={search}
        />
      </header>
      <main>
        <ListRepo />
        <Pagination totalCount={122} />
      </main>
    </>
  );
}

export default Main;
