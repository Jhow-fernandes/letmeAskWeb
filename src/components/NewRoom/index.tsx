import  { FormEvent, useState } from 'react';
import {Link, useHistory} from 'react-router-dom';

import illustrationImg from '../../assets/images/illustration.svg';

import logoImg from '../../assets/images/logo.svg';

import { Button } from '../Button';
import { database } from '../../service/firebase';
import { useAuth } from '../../hooks/useAuth';

import './styles.scss';

export function NewRoom() {
  const { user } = useAuth();
  const history = useHistory();
  const [newRoom, setNewRoom] = useState('');

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === ''){
      return;
    }
    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id
    });

    history.push(`/rooms/${firebaseRoom.key}`);


  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="ilustração Simbolizando Perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as duvidas da sua audiência em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="LetmeAsk" />
          <h2>Criar uma nova Sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input 
              type="text"
              placeholder="Nome da sala"
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">
              Criar sala
            </Button>
          </form>
          <p>
            Quer entra em uma sala existente? <Link to="/">clique aqui</Link>
          </p>

        </div>
      </main>
    </div>
  );
}