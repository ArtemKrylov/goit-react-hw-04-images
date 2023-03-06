import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { signOut } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { toast } from 'react-toastify';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from 'utils/firebaseConfig';

//creating context UserContext for auth
export const UserContext = createContext();

//custom hook to use UserContext
export const useUser = () => useContext(UserContext);

export function UserProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('User');
  const [userEmail, setUserEmail] = useState(null);
  const [userId, setUserId] = useState(null);
  const docRef = [db, 'users', userId];

  function logIn(name, email) {
    setIsLoggedIn(true);
    setUserName(name ?? 'User');
    setUserEmail(email);
  }

  async function logOut() {
    setIsLoggedIn(false);
    setUserName(null);
    setUserEmail(null);
    setUserId(null);
    try {
      await signOut(auth);
      toast.success('Signed out!');
    } catch (error) {
      console.error(error);
    }
  }

  async function addImgToFirestore(imgUrl) {
    const userData = await getDoc(doc(db, 'users', userId));
    console.log('userData', userData.data());
    const userImgArr = userData.data().savedImg ?? [];
    console.log('userImgArr', userImgArr);

    if (userImgArr.includes(imgUrl)) {
      toast.warning('This image is already in your favourites!');
      return;
    }
    console.log('updating firestore');
    await updateDoc(doc(db, 'users', userId), {
      savedImg: [...userImgArr, imgUrl],
    });
    toast.success('Successfully added to your favourites!');
  }

  async function getSavedImgFromFirestore() {
    return (await getDoc(doc(...docRef))).data().savedImg ?? [];
  }

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userName,
        userEmail,
        setUserName,
        logIn,
        logOut,
        userId,
        setUserId,
        addImgToFirestore,
        getSavedImgFromFirestore,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node,
};
