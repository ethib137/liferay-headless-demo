import { ClayButtonWithIcon } from '@clayui/button';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import Sheet from './Sheet';
import ClayForm, {ClaySelect} from '@clayui/form';
import request from '../util/request';
import { getText } from '../util/html';
import Alert from './Alert';
import { InstanceContext } from '../providers/InstanceProvider';

function ItemView({item, onBack}) {
	const {baseUrl} = useContext(InstanceContext);

	const {renderedContents} = item.content;

	const [error, setError] = useState();
	const [itemContent, setItemContent] = useState();
	const [renderedContentURL, setRenderedContentURL] = useState(renderedContents[0].renderedContentURL);

	const handleSelect = useCallback((e) => {
		setRenderedContentURL(e.currentTarget.value);
	}, []);

	useEffect(() => {
		request(renderedContentURL, {responseType: 'text'}).then(res => {
			setItemContent(res);

			setError();
		}).catch(err => {
			setError([
				getText(err),
				'From "Control Panel > Service Access Policy" you must add a new policy that includes the method above.',
				<a href={`${baseUrl}/group/control_panel/manage?p_p_id=com_liferay_portal_security_service_access_policy_web_portlet_SAPPortlet`} rel="noreferrer" target="_blank">Add a Service Access Policy</a>,
			])
		})
	}, [baseUrl, renderedContentURL]);

	return (
		<Sheet title={
			<>
				<ClayButtonWithIcon displayType="link" onClick={onBack} symbol="angle-left" />

				<span style={{verticalAlign: 'middle'}}>{item.title}</span>
			</>
		}>
			<ClayForm.Group>
				<label htmlFor="templateSelect">{"Select a Template"}</label>

				<ClaySelect aria-label="Select Label" id="templateSelect" onChange={e => handleSelect(e)}>
					{renderedContents.map(renderedContent => (
						<ClaySelect.Option
							key={renderedContent.contentTemplateId}
							label={renderedContent.contentTemplateName}
							value={renderedContent.renderedContentURL}
						/>
					))}
				</ClaySelect>
			</ClayForm.Group>

			<Alert displayType="info" message={error} title="Info" />

			<div dangerouslySetInnerHTML={{__html: itemContent}} />
		</Sheet>
	);
}

export default ItemView;