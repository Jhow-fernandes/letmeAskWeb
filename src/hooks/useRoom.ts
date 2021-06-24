import {useState, useEffect} from 'react';

import {database} from '../service/firebase';
import { useAuth } from './useAuth';

type FibreBaseQuestions = Record<string, {
  author: {
    name:string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighlight: boolean;
  likes: Record<string, {
    authorId: string;
  }>
}>

type QuestionType = {
  id: string,
  author: {
    name:string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighlight: boolean;
  likeCount: number;
  likeId:string | undefined;
}


export function useRoom(roomId: string) {
  const {user} = useAuth();
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [title, setTitle] = useState('');
  
  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on('value', room => {
      const databaseRoom = room.val();
      const firebaseQuestions: FibreBaseQuestions = databaseRoom.questions ?? {}; 
      
      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlight: value.isHighlight,
          isAnswered: value.isAnswered,
          likeCount: Object.values(value.likes ?? {}).length,
          likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0],
        }
      });
      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
    });
    return () => {
      roomRef.off('value');
    }
  }, [roomId, user?.id]);

  return{ questions, title }
}