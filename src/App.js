import './App.css';
import {ClayIconSpriteContext} from '@clayui/icon';

import "@clayui/css/lib/css/atlas.css";

import Collections from './components/Collections';
import spritemap from './util/spritemap';

function App() {
	return (
		<ClayIconSpriteContext.Provider value={spritemap}>
			<Collections />
		</ClayIconSpriteContext.Provider>
	);
}

export default App;
