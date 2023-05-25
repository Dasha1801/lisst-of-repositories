import githubLogo from '../assets/images/github.svg';
import search from '../assets/images/search.svg';
import InputField from '../components/inputField/InputField';
import ListRepositories from '../components/listRepositories/ListRepositories';
import UserRepositories from '../components/userRepositories/UserRepositories';
import useFilterQuery from '../utils/useFilterQuery';
import './Main.scss';

function RepositoriesPage() {
  const { setNewSearchParams, getCurrentSearchParamValue } = useFilterQuery();

  const onChangeHandler = (val: string) => {
    if (!val && getCurrentSearchParamValue('offset')) {
      setNewSearchParams({ value: '', searchParamName: 'offset' });
    }

    setNewSearchParams({
      value: val,
      searchParamName: 'name-repository',
    });
  };

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
          onChange={onChangeHandler}
          name="search"
          iconName={search}
        />
      </header>
      <main>
        {getCurrentSearchParamValue('name-repository') ? (
          <ListRepositories />
        ) : (
          <UserRepositories />
        )}
      </main>
    </>
  );
}

export default RepositoriesPage;
