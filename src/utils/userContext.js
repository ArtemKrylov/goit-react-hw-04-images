import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { signOut } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { toast } from 'react-toastify';

//creating context UserContext for auth
export const UserContext = createContext();

//custom hook to use UserContext
export const useUser = () => useContext(UserContext);

export function UserProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('User');
  const [userEmail, setUserEmail] = useState(null);
  const [userId, setUserId] = useState(null);

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
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node,
};
