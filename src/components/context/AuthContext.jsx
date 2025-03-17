import { fetchAuthSession, fetchUserAttributes, getCurrentUser, signOut } from 'aws-amplify/auth';
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [signedIn, setSignedIn] = useState(null);
  const [userData, setUserData] = useState(null);

  // Mock user details fetch - replace with actual AWS Cognito implementation later
  const getUserDetails = async () => {
    try {
      // This will be replaced with fetchUserAttributes from AWS Cognito
      const userData = await fetchUserAttributes();
      if (userData) {
        setUserData(userData);
        setSignedIn(true);
      }
    } catch (err) {
      console.error("Error fetching user details:", err);
    }
  };

  // Mock session check - replace with actual AWS Cognito implementation later
  const checkSession = async () => {
    try {
      // This will be replaced with getCurrentUser from AWS Cognito
      const userSession = await fetchAuthSession();
      if (userSession) {
        await getUserDetails();
      } else {
        setSignedIn(false);
      }
    } catch (err) {
      setSignedIn(false);
      console.error("Error checking session:", err);
    }
  };

  const logout = () => {
    signOut();
    setSignedIn(false);
    setUserData(null);
  };

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <AuthContext.Provider value={{
      signedIn,
      setSignedIn,
      userData,
      setUserData,
      logout,
      getUserDetails
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};