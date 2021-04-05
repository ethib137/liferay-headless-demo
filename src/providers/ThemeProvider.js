import React from 'react';

export const ThemeContext = React.createContext();

function ThemeProvider({children, theme}) {
	return (
		<ThemeContext.Provider value={theme}>
			{children}
		</ThemeContext.Provider>
	);
}

export default ThemeProvider;