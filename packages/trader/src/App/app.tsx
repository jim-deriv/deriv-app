import React from 'react';
import Loadable from 'react-loadable';
import Routes from 'App/Containers/Routes/routes.jsx';
import TradeHeaderExtensions from 'App/Containers/trade-header-extensions';
import TradeFooterExtensions from 'App/Containers/trade-footer-extensions.jsx';
import TradeSettingsExtensions from 'App/Containers/trade-settings-extensions';
import { NetworkStatusToastErrorPopup } from 'Modules/Trading/Containers/toast-popup.jsx';
import initStore from './init-store';
import 'Sass/app.scss';
import { TCoreStores } from '@deriv/stores/types';
import TraderProviders from '../trader-providers';
import { MobxContentProvider } from 'Stores/connect';

type Apptypes = {
    passthrough: {
        root_store: TCoreStores;
        WS: unknown;
    };
};

const TradeModals = Loadable({
    loader: () => import(/* webpackChunkName: "trade-modals", webpackPrefetch: true */ './Containers/Modals'),
    loading: () => null,
});

const App = ({ passthrough }: Apptypes) => {
    const [root_store] = React.useState(initStore(passthrough.root_store, passthrough.WS));
    React.useEffect(() => {
        return () => root_store.ui.setPromptHandler(false);
    }, [root_store]);

    return (
        <MobxContentProvider store={root_store}>
            <TraderProviders store={root_store}>
                <Routes />
                <TradeModals />
                <NetworkStatusToastErrorPopup />
                <TradeHeaderExtensions store={root_store} />
                <TradeFooterExtensions />
                <TradeSettingsExtensions store={root_store} />
            </TraderProviders>
        </MobxContentProvider>
    );
};

export default App;
