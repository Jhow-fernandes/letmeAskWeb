import { createContext, ReactNode, useEffect, useState } from 'react';
import { auth, firebase } from '../service/fibrebase';

type User = {
  id: string,
  name: string,
  avatar: string
}
type AuthContextType = {
  user: User | undefined;
  signWithGoogle: () => Promise<void>;
}
type AuthContextProvieder ={
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvieder(props: AuthContextProvieder) {

  const [ user, setUser] = useState<User>();

//Recuperando o estado do usuário quando ele recarrega a página
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user) {
        const {displayName, photoURL, uid} = user;

        if(!displayName || !photoURL) {
          throw new Error('Missing information from google Acoount.');
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    })
    return () => {
      unsubscribe();
    }
  }, [])

  async function signWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider);

        if(result.user) {
          const {displayName, photoURL, uid} = result.user;

          if(!displayName || !photoURL) {
            throw new Error('Missing information from google Acoount.');
          }

          setUser({
            id: uid,
            name: displayName,
            avatar: photoURL
          })
        }
      }
  return (
    <AuthContext.Provider value={{ user, signWithGoogle }}>
      {props.children}
    </AuthContext.Provider>

  );
}