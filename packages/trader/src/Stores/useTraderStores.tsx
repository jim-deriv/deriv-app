import React from 'react';
import { useStore } from '@deriv/stores';
import TradeStore from './Modules/Trading/trade-store';

const TraderStoreContext = React.createContext<TradeStore | null>(null);

export const TraderStoreProvider = ({ children }: React.PropsWithChildren<unknown>) => {
    const { modules } = useStore();
    return <TraderStoreContext.Provider value={modules?.trader}>{children}</TraderStoreContext.Provider>;
};

export const useTraderStore = () => {
    const store = React.useContext(TraderStoreContext);

    if (!store) {
        throw new Error('useTraderStore must be used within TraderStoreProvider');
    }

    return store;
};
