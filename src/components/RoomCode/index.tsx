import copyImg from '../../assets/images/copy.svg';

import { useState } from 'react';
import '../Room/styles.scss';

type RoomCodeProps = {
  code: string,
}
export function RoomCode(props: RoomCodeProps) {
  const [isCopied, setIsCopied] = useState(false);

  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code);
    setIsCopied(true);
  }
  return (
    <button className="room-code" onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImg} alt="Copy room code" />
      </div>
      {isCopied ?
        (<span className="">Code copied successfully!</span>) :
        (<span>Sala {props.code}</span>)
      }
    </button>
  )
}