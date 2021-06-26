import React, {createContext, useState} from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState({
    verifies: [],
    username: '',
    fullName: '',
    id: 0,
    status: false,
  });

  const [allPosts, setAllPosts] = useState([]);
  const [rukoPosts, setRukoPosts] = useState([]);
  const [lapakPosts, setLapakPosts] = useState([]);
  const [pujaseraPosts, setPujaseraPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        likedPosts,
        setLikedPosts,
        allPosts,
        setAllPosts,
        rukoPosts,
        setRukoPosts,
        lapakPosts,
        setLapakPosts,
        pujaseraPosts,
        setPujaseraPosts,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
