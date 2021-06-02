import { useContext, useState, useEffect, createContext } from 'react';
import { auth } from '../config/firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    const signup = (email, password) => {
      let promise = new Promise(function (resolve, reject) {
        auth
          .createUserWithEmailAndPassword(email, password)
          .catch((error) => reject(error));
      });
      return promise;
    };

    const value = {
      currentUser,
      signup
    }

    return (
      <AuthContext.Provider value={value}> 
      {!loading && children}
      </AuthContext.Provider>
    );
  }

  export default AuthContext;