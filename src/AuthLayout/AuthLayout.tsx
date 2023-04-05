import { useLoaderData, useOutlet, Await } from "react-router-dom";
import { Suspense } from "react";
import { AuthContextProvider } from '../utils/AuthContext';

export const AuthLayout = () => {
	const outlet = useOutlet();
	const { userPromise } = useLoaderData() as any;

	return (
		<Await
			resolve={userPromise}
			errorElement={<div>something went wrong</div>}
			children={(user) => (
				<AuthContextProvider userData={user}>{outlet}</AuthContextProvider>
			)}
		/>
	);
};
