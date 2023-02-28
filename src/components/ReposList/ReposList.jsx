import React from 'react';
import styles from './ReposList.module.css';
import { RepoCard } from '../';
import { useSelector } from 'react-redux';
import { Spinner } from '../';

function ReposList() {
  const { repos, isLoading } = useSelector((store) => store.repos);

  if (isLoading) {
    return <Spinner />;
  }

  if (repos.length === 0) {
    return (
      <div className={styles.message_container}>
        <h1 className={styles.message}>Nothing found for your request</h1>
      </div>
    );
  }

  return (
    <ul className={styles.card_list}>
      {repos.map((repo) => (
        <RepoCard
          key={repo.id}
          avatar={repo.owner.avatar_url}
          title={repo.name}
          author={repo.owner.login}
          language={repo.language}
          description={repo.description}
          stargazers_count={repo.stargazers_count}
          watchers_count={repo.watchers_count}
        />
      ))}
    </ul>
  );
}
export default ReposList;
