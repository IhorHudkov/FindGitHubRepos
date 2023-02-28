import React, { useEffect, useRef } from 'react';
import styles from './SearchBar.module.css';
import { useDispatch } from 'react-redux';
import {
  getRepos,
  setCurrentPage,
  setKeyWord,
} from '../../features/repos/reposSlice';
import { fromEvent } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';

function SearchBar() {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setKeyWord('react'));
    dispatch(getRepos('react'));
  });
  useEffect(() => {
    const stream$ = fromEvent(inputRef.current, 'input')
      .pipe(
        map((e) => e.target.value),
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe((value) => {
        if (value === '') {
          dispatch(setKeyWord('react'));
          dispatch(setCurrentPage(1));
          dispatch(getRepos('react'));
        } else {
          dispatch(setKeyWord(value));
          dispatch(setCurrentPage(1));
          dispatch(getRepos({ keyWord: value }));
        }
      });
    return () => stream$.unsubscribe();
  });

  return (
    <div className={styles.container}>
      <input
        ref={inputRef}
        type="text"
        className={styles.search_input}
        placeholder="Search"
      />
    </div>
  );
}
export default SearchBar;
