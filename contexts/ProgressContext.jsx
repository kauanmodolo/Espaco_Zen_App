// contexts/ProgressContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { firebase } from '../firebaseConfig';

const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState(0);
  const [sessions, setSessions] = useState([]);
  const [completedSessions, setCompletedSessions] = useState([]);
  const userId = firebase.auth().currentUser?.uid;

  useEffect(() => {
    if (!userId) return;

    // Listener para progresso em tempo real
    const unsubscribeProgress = firebase.firestore()
      .collection('progress')
      .doc(userId)
      .onSnapshot(doc => {
        setProgress(doc.data()?.minutes || 0);
      });

    // Listener para sessões personalizadas do usuário em tempo real
    const unsubscribeSessions = firebase.firestore()
      .collection('sessions')
      .where('createdBy', '==', userId)
      .onSnapshot(snapshot => {
        const userSessions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setSessions(userSessions);
      });

    // Listener para buscar sessões concluídas
    const fetchCompletedSessions = async () => {
      const snapshot = await firebase.firestore()
        .collection('completedSessions')
        .where('userId', '==', userId)
        .get();

      const completed = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCompletedSessions(completed);
    };

    fetchCompletedSessions();

    return () => {
      unsubscribeProgress();
      unsubscribeSessions();
    };
  }, [userId]);

  // Função para adicionar uma sessão concluída ao Firebase e ao estado local
  const addCompletedSession = async (session) => {
    try {
      const sessionData = {
        ...session,
        userId: userId,
        completedAt: new Date(), // Armazena a data e hora da conclusão
      };
      const docRef = await firebase.firestore().collection('completedSessions').add(sessionData);
      setCompletedSessions(prev => [...prev, { id: docRef.id, ...sessionData }]);
    } catch (error) {
      console.error('Erro ao adicionar sessão ao histórico:', error);
    }
  };

  const incrementProgress = async (duration) => {
    const newProgress = progress + duration;
    setProgress(newProgress);

    await firebase.firestore().collection('progress').doc(userId).set(
      { minutes: newProgress },
      { merge: true }
    );
  };

  return (
    <ProgressContext.Provider value={{ progress, sessions, completedSessions, incrementProgress, addCompletedSession }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => useContext(ProgressContext);
