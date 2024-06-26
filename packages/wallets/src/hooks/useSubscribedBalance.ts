import { useEffect, useState } from 'react';
import { useBalanceSubscription } from '@deriv/api-v2';

type TBalance = ReturnType<typeof useBalanceSubscription>['data'];

type Subscriber<T> = (value: T) => void;

class Observable<T> {
    private subscribers = new Set<Subscriber<T>>();

    constructor(private value: T) {
        this.value = value;
    }

    get(): T {
        return this.value;
    }

    set(newValue: T): void {
        if (JSON.stringify(this.value) === JSON.stringify(newValue)) return; // prevent unnecessary updates, causing infinite re-renders
        this.value = newValue;

        this.subscribers.forEach(listener => listener(this.value)); // notify all subscribers
    }

    /**
     * @description Subscribes to the observable
     * @param subscriber the observer function
     * @returns cleanup function to unsubscribe the subscriber when the component unmounts.
     */
    subscribe(subscriber: Subscriber<T>): () => void {
        this.subscribers.add(subscriber);

        return () => this.unsubscribe(subscriber); // cleanup function to unsubscribe the subscriber when the component unmounts
    }

    unsubscribe(subscriber: Subscriber<T>): void {
        this.subscribers.delete(subscriber);
    }
}

const balanceStore = new Observable<TBalance | undefined>(undefined);

/**
 * Custom hook that manages subscription to balance changes from `balanceStore`.
 * Retrieves initial balance and subscribes to future updates.
 * @returns An object containing the current balance and a function to update it.
 * @example const { data: balanceData, setBalanceData } = useSubscribedBalance();
 */
const useSubscribedBalance = () => {
    const [balance, setBalance] = useState(balanceStore.get());
    useEffect(() => {
        return balanceStore.subscribe(setBalance); // subscribe setBalance to the balance store and return the cleanup function
    }, []);

    return {
        data: balance,
        setBalanceData: (data: TBalance) => {
            balanceStore.set(data);
        },
    };
};

export default useSubscribedBalance;
