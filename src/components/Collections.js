import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ClayForm, {ClayInput} from '@clayui/form';
import ClayTabs from '@clayui/tabs';
import InstanceProvider from '../providers/InstanceProvider';
import ItemCard from './ItemCard';
import ItemView from './ItemView';
import SideBar from './SideBar';
import ThemeProvider from '../providers/ThemeProvider';
import ThemedButton from './ThemeButton';
import URLPersistInput from './URLPersistInput';
import request from '../util/request';
import { deleteSearchParam, getAllSearchParams, setSearchParam } from '../util/url';
import { getText } from '../util/html';
import Alert from './Alert';

function Collections() {
	const [activeTabKeyValue, setActiveTabKeyValue] = useState(0);
	const [baseUrl, setBaseUrl] = useState('');
	const [cols, setCols] = useState(3);
	const [contentId, setContentId] = useState();
	const [contentSetId, setContentSetId] = useState('');
	const [customColors, setCustomColors] = useState(['1264AB', '6E094E', 'FFF']);
	const [error, setError] = useState();
	const [items, setItems] = useState();
	const [primaryColor, setPrimaryColor] = useState(customColors[0]);
	const [secondaryColor, setSecondaryColor] = useState(customColors[1]);
	const [showConfiguration, setShowConfiguration] = useState(true);
	const [textColor, setTextColor] = useState(customColors[2]);
	const [title, setTitle] = useState('Your Collection');

	const theme = {
		primaryColor: `#${primaryColor}`,
		secondaryColor: `#${secondaryColor}`,
		textColor: `#${textColor}`,
	}

	const bannerStyle = {
		backgroundColor: theme.primaryColor,
		backgroundImage: `linear-gradient(60deg, ${theme.primaryColor} 0%, ${theme.secondaryColor} 100%)`,
		color: theme.textColor,
		minHeight: '300px',
	}

	const item = useMemo(() => {
		return items ? items.find(item => contentId === item.id) : null;
	}, [contentId, items])

	const requestUrl = useCallback(
		(baseUrl, contentSetId) => (
			`${baseUrl}/o/headless-delivery/v1.0/content-sets/${contentSetId}/content-set-elements`
		),
		[]
	);

	const getCollection = useCallback((baseUrl, contentSetId) => {
		request(requestUrl(baseUrl, contentSetId)).then(
			res => {
				setItems(res.items);

				setError();
				setShowConfiguration(false);
			}
		).catch(err => {
			if (err.message === 'Failed to fetch') {
				setError([
					'You must enable cors in Liferay by creating a configuration entry in "System Settings > Security Tools > Web Contexts Cross-Origin Resource Sharing (CORS)".',
					<a href={`${baseUrl}/group/control_panel/manage?p_p_id=com_liferay_configuration_admin_web_portlet_SystemSettingsPortlet&_com_liferay_configuration_admin_web_portlet_SystemSettingsPortlet_mvcRenderCommandName=%2Fconfiguration_admin%2Fview_factory_instances&_com_liferay_configuration_admin_web_portlet_SystemSettingsPortlet_factoryPid=com.liferay.portal.remote.cors.configuration.WebContextCORSConfiguration`} rel="noreferrer" target="_blank">Enable Cors</a>,
				]);
			}
			else {
				setError([
					getText(err.message),
					'From "Control Panel > Service Access Policy" you must add a new policy that includes the method above.',
					<a href={`${baseUrl}/group/control_panel/manage?p_p_id=com_liferay_portal_security_service_access_policy_web_portlet_SAPPortlet`} rel="noreferrer" target="_blank">Add a Service Access Policy</a>,
				])
			}

			setShowConfiguration(true);
			setItems();
		})
	}, [requestUrl]);

	const handleItemClick = useCallback((id) => {
		setContentId(id);

		setSearchParam('contentId', id, true);
	}, [])

	const unsetContentId = () => {
		setContentId();

		deleteSearchParam('contentId', true);
	}

	useEffect(() => {
		const {
			baseUrl,
			cols,
			contentId,
			contentSetId,
			primaryColor,
			secondaryColor,
			textColor,
			title,
		} = getAllSearchParams();

		if (baseUrl) setBaseUrl(baseUrl);
		if (cols) setCols(cols);
		if (contentId) setContentId(parseInt(contentId));
		if (contentSetId) setContentSetId(contentSetId);
		if (primaryColor) setPrimaryColor(primaryColor);
		if (secondaryColor) setSecondaryColor(secondaryColor);
		if (textColor) setTextColor(textColor);
		if (title) setTitle(title);

		if (baseUrl && contentSetId) {
			getCollection(baseUrl, contentSetId);

			setShowConfiguration(false);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return(
		<InstanceProvider instance={{baseUrl}}>
			<ThemeProvider theme={theme}>
				<SideBar show={showConfiguration} title="Configurations">
					<Alert displayType="info" message={error} title="Info" />

					<ClayTabs className="mb-3" modern>
						<ClayTabs.Item
							active={activeTabKeyValue === 0}
							innerProps={{
								"aria-controls": "tabpanel-1"
							}}
							onClick={() => setActiveTabKeyValue(0)}
						>
							{"Configure Liferay Instance"}
						</ClayTabs.Item>
						<ClayTabs.Item
							active={activeTabKeyValue === 1}
							innerProps={{
								"aria-controls": "tabpanel-2"
							}}
							onClick={() => setActiveTabKeyValue(1)}
						>
							{"Look and Feel"}
						</ClayTabs.Item>
					</ClayTabs>
					<ClayTabs.Content activeIndex={activeTabKeyValue} fade>
						<ClayTabs.TabPane aria-labelledby="tab-1">
							<URLPersistInput
								id="baseUrl"
								label="Base URL"
								onChange={value => setBaseUrl(value)}
								placeholder="Insert the URL of your Liferay instance."
								value={baseUrl}
							/>
							<URLPersistInput
								id="contentSetId"
								label="Collection ID"
								onChange={value => setContentSetId(value)}
								placeholder="Insert ID of a Liferay Collection."
								value={contentSetId}
							/>

							<ClayForm.Group>
								<label htmlFor="requestUrl">Request URL</label>
								<ClayInput
									disabled
									id="requestUrl"
									readOnly
									type="text"
									value={requestUrl(baseUrl, contentSetId)}
								/>
							</ClayForm.Group>

							<ThemedButton className="btn-block" displayType="primary" onClick={() => getCollection(baseUrl, contentSetId)}>
								Get Collections
							</ThemedButton>
						</ClayTabs.TabPane>
						<ClayTabs.TabPane aria-labelledby="tab-2">
							<URLPersistInput
								id="title"
								label="Page Title"
								onChange={value => setTitle(value)}
								placeholder="Set the title."
								value={title}
							/>

							<URLPersistInput
								id="cols"
								label="Number of Columns"
								onChange={value => setCols(value)}
								placeholder="Set the number of items per row."
								value={cols}
							/>

							<URLPersistInput
								customColors={customColors}
								onColorsChange={setCustomColors}
								colorPicker={true}
								id="primaryColor"
								label="Primary Color"
								onChange={setPrimaryColor}
								placeholder="Set the primary color that is used in the header and buttons."
								value={primaryColor}
							/>

							<URLPersistInput
								customColors={customColors}
								onColorsChange={setCustomColors}
								colorPicker={true}
								id="secondaryColor"
								label="Secondary Color"
								onChange={setSecondaryColor}
								placeholder="Set the secondary color that is used in the header."
								value={secondaryColor}
							/>

							<URLPersistInput
								customColors={customColors}
								onColorsChange={setCustomColors}
								colorPicker={true}
								id="textColor"
								label="Text Color"
								onChange={setTextColor}
								placeholder="Set the text color that is used in the header."
								value={textColor}
							/>
						</ClayTabs.TabPane>
					</ClayTabs.Content>
				</SideBar>

				{item ? (
					<div className="container">
						<ItemView item={item} onBack={() => unsetContentId()} />
					</div>
				) : (
					<>
						<div className="card container-fluid d-flex align-items-center justify-content-center rounded-0" style={bannerStyle}>
							<div className="container">
								<h1 className="display-2 my-5 text-center">{title}</h1>
							</div>
						</div>

						<div className="container">
							<div className="row mt-5">
								{items && items.map((item, i) => (
									<div className={`col-${12/cols}`} key={item.id}>
										<ItemCard item={item} onClick={handleItemClick} />
									</div>
								))}
							</div>
						</div>
					</>
				)}
			</ThemeProvider>
		</InstanceProvider>
	);
}

export default Collections;