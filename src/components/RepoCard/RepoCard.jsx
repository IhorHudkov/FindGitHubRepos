import React from 'react';
import styles from './RepoCard.module.css';
import { StarIcon, PersonIcon } from '../../icons';

function RepoCard({
  avatar,
  title,
  author,
  language,
  description,
  stargazers_count,
  watchers_count,
}) {
  return (
    <article>
      <div className={styles.container}>
        <img src={avatar} alt={title} className={styles.avatar} />
        <div className={styles.textblock}>
          <span className={styles.title}>{title}</span>
          <span className={styles.text_lightgray}>{author}</span>
          <span className={styles.text_lightgray}>{language}</span>
          <span className={`${styles.text_gray} ${styles.description}`}>
            {description}
          </span>
        </div>
        <div className={styles.metrics}>
          <span className={styles.metric}>
            <StarIcon />
            <span className={styles.metric_name}>{stargazers_count} stars</span>
          </span>
          <span className={styles.metric}>
            <PersonIcon />
            <span className={styles.metric_name}>
              {watchers_count} watchers
            </span>
          </span>
        </div>
      </div>
    </article>
  );
}
export default RepoCard;
