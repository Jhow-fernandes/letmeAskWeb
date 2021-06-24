import { useHistory, useParams } from 'react-router-dom';

import logoImg from '../../assets/images/logo.svg';
import deleteImg from '../../assets/images/delete.svg';

import {database} from '../../service/firebase';

import { Button } from '../Button';    
import { Question } from '../../components/Question';
import { RoomCode } from '../RoomCode';
import {useRoom} from '../../hooks/useRoom';
//import { useAuth } from '../hooks/useAuth';

import './styles.scss';

type RoomParams = {
  id: string;
}

export function AdminRoom() {
  //const {user} = useAuth();
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  
  const { title, questions } = useRoom(roomId);
  async function handleEndRoom() {
    database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    })

    history.push('/');
  }
  async function handleDeleteQuestion(questionId: string) {
    if(window.confirm('tem certeza que desejá excluir essa pergunta?')) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }



  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="LetmeAsk" />
          <div>
            <RoomCode code={roomId}/>
            <Button isOutlined onClick={handleEndRoom}>Encerra Sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span> }
        </div>

       <div className="question-list">
       {questions.map(question => {
          return (
            <Question
              key={question.id}
              content={question.content}
              author={question.author}
            >
              <button
                type="button"
                onClick={() => handleDeleteQuestion(question.id)}
              >
                <img src={deleteImg} alt="" />
              </button>
            </Question>
          )
        })}
       </div>
      </main>
    </div>
  );
}