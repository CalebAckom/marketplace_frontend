import React, { createContext, useState } from "react";

export const SignupContext = createContext();

const SignupAuthContext = ({ children }) => {
  const [signupMail, setSignupMail] = useState({
    email: "blue@Tmail.can",
    allow: false,
  });
  return (
    <SignupContext.Provider value={[signupMail, setSignupMail]}>
      {children}
    </SignupContext.Provider>
  );
};

export default SignupAuthContext;
