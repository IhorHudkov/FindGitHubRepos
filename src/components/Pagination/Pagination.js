import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRepos, setCurrentPage } from '../../features/repos/reposSlice';
import { setPages } from '../../features/pagination/pagesSlice';
import styles from './Pagination.module.css';

function Pagination() {
  const dispatch = useDispatch();
  const { keyWord, currentPage, totalCount } = useSelector(
    (store) => store.repos
  );
  const pages = useSelector((store) => store.pages);
  const [reposPerPage, setReposPerPage] = useState(20);
  const pagesCount = Math.ceil(totalCount / reposPerPage);

  let _pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    _pages.push(i);
  }

  if (_pages.length > 8) {
    _pages.splice(8);
  }

  const onPageClickHandler = (page) => {
    window.scrollTo(0, 0);
    dispatch(setCurrentPage(page));
    dispatch(getRepos({ keyWord, page }));
  };

  const onPreviousClickHandler = () => {
    window.scrollTo(0, 0);
    dispatch(setCurrentPage(currentPage - 1));
    dispatch(getRepos({ keyWord, page: currentPage - 1 }));
    if (pages.length !== 0) {
      if (currentPage === pages[0]) {
        dispatch(setPages(pages.map((i) => i - 1)));
      }
    } else {
      if (currentPage === _pages[0]) {
        dispatch(setPages(_pages.map((i) => i - 1)));
      }
    }
  };

  const onNextClickHandler = () => {
    window.scrollTo(0, 0);
    dispatch(setCurrentPage(currentPage + 1));
    dispatch(getRepos({ keyWord, page: currentPage + 1 }));

    if (pages.length !== 0) {
      if (currentPage === pages[pages.length - 1]) {
        dispatch(setPages(pages.map((i) => i + 1)));
      }
    } else {
      if (currentPage === _pages[_pages.length - 1]) {
        dispatch(setPages(_pages.map((i) => i + 1)));
      }
    }
  };

  if (pages.length !== 0) {
    return (
      <div className={styles.pagination}>
        {currentPage !== 1 && (
          <span
            className={styles.page_btn}
            onClick={() => onPreviousClickHandler()}
          >
            Previous
          </span>
        )}
        {pages.map((page, index) => (
          <span
            key={'page_btn_' + index}
            className={`${styles.page_btn} ${
              page === currentPage ? styles.active_page : ''
            }`}
            onClick={() => onPageClickHandler(page)}
          >
            {page}
          </span>
        ))}
        {pagesCount !== 1 && currentPage !== pagesCount && (
          <span
            className={styles.page_btn}
            onClick={() => onNextClickHandler()}
          >
            Next
          </span>
        )}
      </div>
    );
  }

  return (
    <>
      {_pages.length !== 0 && (
        <div className={styles.pagination}>
          {currentPage !== 1 && (
            <span
              className={styles.page_btn}
              onClick={() => onPreviousClickHandler()}
            >
              Previous
            </span>
          )}
          {_pages.map((page, index) => (
            <span
              key={'page_btn_' + index}
              className={`${styles.page_btn} ${
                page === currentPage ? styles.active_page : ''
              }`}
              onClick={() => onPageClickHandler(page)}
            >
              {page}
            </span>
          ))}
          {pagesCount !== 1 && currentPage !== pagesCount && (
            <span
              className={styles.page_btn}
              onClick={() => onNextClickHandler()}
            >
              Next
            </span>
          )}
        </div>
      )}
    </>
  );
}

export default Pagination;
