import { ReactNode } from 'react';
import cx from 'classnames';

import './styles.scss';

type QuestionProps = {
  content: String;
  author: {
    name: string;
    avatar: string;
  };
  children?:ReactNode;
  isAnswered?: boolean;
  isHighlight?: boolean;
}

export function Question({
  content,
  author,
  children,
  isHighlight = false,
  isAnswered = false,
}:QuestionProps){
  return(
    <div className={
      cx('question',
        {answered: isAnswered},
        {highlight: isHighlight && !isAnswered}
      )}>
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name}/>
          <span>{author.name}</span>
        </div>
        <div>{children}</div>
      </footer>
    </div>
  );
}