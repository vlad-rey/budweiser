"use client";

import {
	createContext,
	useContext,
	ReactNode,
	FunctionComponent,
	Suspense,
	useCallback,
} from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

interface QueryContextType {
	updatePageQuery: (
		params: { [key: string]: string | number | undefined },
		scroll?: boolean
	) => void;
}

const QueryContext = createContext<QueryContextType | undefined>(undefined);

export const QueryProvider: FunctionComponent<{ children?: ReactNode }> = ({
	children,
}) => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();

	const updatePageQuery = useCallback(
		(
			params: { [key: string]: string | number | undefined },
			scroll?: boolean
		) => {
			const updatedSearchParams = new URLSearchParams(searchParams.toString());

			Object.keys(params).forEach((key) => {
				const value = params[key];
				if (value !== undefined) {
					updatedSearchParams.set(key, value.toString());
				} else {
					updatedSearchParams.delete(key);
				}
			});

			const query = updatedSearchParams.toString()
				? `?${updatedSearchParams.toString()}`
				: "";
			router.replace(`${pathname}${query}`, {
				scroll: scroll === undefined ? true : scroll,
			});
		},
		[searchParams, router, pathname]
	);

	return (
		<Suspense fallback={null}>
			<QueryContext.Provider value={{ updatePageQuery }}>
				{children}
			</QueryContext.Provider>
		</Suspense>
	);
};

export const useQuery = () => {
	const context = useContext(QueryContext);
	if (context === undefined) {
		throw new Error("useQuery must be used within a QueryProvider");
	}
	return context;
};
