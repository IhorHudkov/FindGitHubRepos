import styles from './App.module.css';
import { SearchBar, ReposList, Pagination } from './components';

function App() {
  return (
    <div className={styles.App}>
      <SearchBar />
      <ReposList />
      <Pagination />
    </div>
  );
}

export default App;
