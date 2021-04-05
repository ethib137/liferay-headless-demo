import React from 'react';

export const InstanceContext = React.createContext();

function InstanceProvider({children, instance}) {
	return (
		<InstanceContext.Provider value={instance}>
			{children}
		</InstanceContext.Provider>
	);
}

export default InstanceProvider;