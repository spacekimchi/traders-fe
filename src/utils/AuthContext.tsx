import { createContext, useState, useEffect } from "react";

export type AuthContextType = {
	currentUser: any;
	setCurrentUser: any;
};

type AuthContextProviderType = {
	children: React.ReactNode
}

type AuthUser = {
	email: string;
	username: string;
	id: string;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthContextProvider = ({ children }: AuthContextProviderType) => {
	const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);

	return <AuthContext.Provider value={{ currentUser, setCurrentUser }}>{children}</AuthContext.Provider>
}

export default AuthContext;
