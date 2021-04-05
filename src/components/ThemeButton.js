import React, { useContext } from 'react';
import ClayButton from '@clayui/button';
import { ThemeContext } from '../providers/ThemeProvider';

function ThemedButton(props) {
	const {primaryColor, textColor} = useContext(ThemeContext);

	const buttonStyle = {
		backgroundColor: primaryColor,
		borderColor: primaryColor,
		color: textColor,
	};

	return (
		<ClayButton style={buttonStyle} {...props}>{props.children}</ClayButton>
	)
}

export default ThemedButton;