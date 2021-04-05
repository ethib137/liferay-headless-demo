import ClayColorPicker from '@clayui/color-picker';
import ClayForm, { ClayInput } from '@clayui/form';
import { debounce } from 'lodash';
import React, { useCallback } from 'react';
import spritemap from '../util/spritemap';
import { setSearchParam } from '../util/url';

const debouncedSetSearchParam = debounce((id, value) => {
	setSearchParam(id, value);
}, 200);

function URLPersistInput(props) {
	const {
		colorPicker = false,
		customColors,
		id,
		label,
		onChange,
		onColorsChange,
		placeholder,
		value,
	} = props;

	const handleChange = useCallback((value) => {
		onChange(value);

		debouncedSetSearchParam(id, value);
	}, [id, onChange])

	if (colorPicker) {
		return (
			<ClayColorPicker
				colors={customColors}
				label={label}
				name={id}
				onColorsChange={onColorsChange}
				onValueChange={handleChange}
				showHex={true}
				showPredefinedColorsWithCustom={true}
				spritemap={spritemap}
				title={label}
				value={value}
			/>
		)
	} else {
		return (
			<ClayForm.Group>
				<label htmlFor={id}>{label}</label>
				<ClayInput
					id={id}
					onChange={e => handleChange(e.target.value)}
					placeholder={placeholder}
					type="text"
					value={value}
				/>
			</ClayForm.Group>
		);
	}
}

export default URLPersistInput;