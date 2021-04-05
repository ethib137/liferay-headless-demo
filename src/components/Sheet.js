import React from 'react';

function Sheet(props) {
	const {
		children,
		description,
		title,
	} = props;

	return (
		<div className="sheet">
			<div className="sheet-header">
				<h2 className="sheet-title">{title}</h2>

				{description &&
					<div className="sheet-text">{description}</div>
				}
			</div>
			<div className="sheet-section">
				{children}
			</div>
		</div>
	);
}

export default Sheet;