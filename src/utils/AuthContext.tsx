import { createContext, useState, useMemo, useEffect } from "react";
import { getCurrentUser } from './api';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const fileName = "AuthContext.tsx";

export interface AuthContextType {
	currentUser?: any;
	loading?: boolean;
	setCurrentUser: any;
	error?: any;
	login: (email: string, password: string) => void;
	logout: () => void;
	signUp?: (email: string, username: string, password: string) => void;
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

export const AuthContextProvider = ({ children, userData }: any) => {
	const [currentUser, setCurrentUser] = useState(userData);
	const [error, setError] = useState<any>();
	const [loading, setLoading] = useState<boolean>(false);
	const [loadingInitial, setLoadingInitial] = useState<boolean>(true);
	//const location = useLocation();
	//useEffect(() => {if (error) setError(null);}, [location.pathname]);
	//const navigate = useNavigate();
	const login = async (data: any) => {
		setCurrentUser(data);
		//navigate("/trades");
	};

	const logout = () => {
		setCurrentUser(null);
		//navigate("/", { replace: true });
	};
	const value = useMemo(() => ({
		currentUser,
		login,
		logout,
		setCurrentUser
	}), [currentUser]);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext;
