import ClayAlert from '@clayui/alert';
import React from 'react';
import spritemap from '../util/spritemap';

function Alert(props) {
	const {
		message,
		...otherProps
	} = props;

	if (message) {
		return (
			<ClayAlert spritemap={spritemap} {...otherProps}>
				{message.map((line, i) => (
					<span key={i}>
						{line}

						{(i + 1 < message.length) &&
							<><br/><br/></>
						}
					</span>
				))}
			</ClayAlert>
		)
	}
	else {
		return null;
	}
}

export default Alert;