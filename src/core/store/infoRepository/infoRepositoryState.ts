export interface IInfoRepository {
  name: string;
  stargazerCount: number;
  pushedAt: Date | null;
  avatarUrl: string | null;
  login: string;
  description: string;
  languages: string[];
  url: string;
}

interface IStateRepository {
  info: IInfoRepository;
}

export const initInfoRepositoryState: IStateRepository = {
  info: {
    name: '',
    stargazerCount: 0,
    pushedAt: null,
    avatarUrl: null,
    login: '',
    description: '',
    languages: [],
    url: '',
  },
};
