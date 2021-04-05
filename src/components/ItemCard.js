import React, { useContext } from 'react';
import './ItemCard.css';
import ClayCard from '@clayui/card';
import ThemedButton from './ThemeButton';
import { InstanceContext } from '../providers/InstanceProvider';

function ItemCard({item, onClick}) {
	const {baseUrl} = useContext(InstanceContext);

	const image = item.content.contentFields.find(contentField => contentField.dataType === 'image');

	return (
		<ClayCard>
			{image?.contentFieldValue?.image &&
				<ClayCard.AspectRatio className="card-item-first">
					<div className="aspect-ratio-item aspect-ratio-item-fluid">
						<img alt="" className="w-100" src={baseUrl + image.contentFieldValue.image?.contentUrl} />
					</div>
				</ClayCard.AspectRatio>
			}

			<ClayCard.Body>
				<ClayCard.Description displayType="title">
					{item.title}
				</ClayCard.Description>

				<ClayCard.Description truncate={false} displayType="text">
					<span dangerouslySetInnerHTML={{__html: item.content.description}}></span>
				</ClayCard.Description>

				<ThemedButton className="btn-block" onClick={() => onClick(item.id)}>{"View More"}</ThemedButton>
			</ClayCard.Body>
		</ClayCard>
	);
}

export default ItemCard;