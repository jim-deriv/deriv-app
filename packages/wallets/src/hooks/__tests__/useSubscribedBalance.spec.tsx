import { act, renderHook } from '@testing-library/react-hooks';
import useSubscribedBalance from '../useSubscribedBalance';

const mockData: Parameters<ReturnType<typeof useSubscribedBalance>['setBalanceData']>[0] = {
    accounts: {
        CR1: {
            balance: 10,
            converted_amount: 10,
            currency: 'USD',
            demo_account: 0,
            status: 1,
            type: 'deriv',
        },
    },
};

describe('useSubscribedBalance', () => {
    it('sets the balance data when the set method is called', () => {
        const { result } = renderHook(() => useSubscribedBalance());
        const { setBalanceData } = result.current;

        expect(result.current.data).toBeUndefined();
        act(() => setBalanceData(mockData));
        expect(result.current.data).toEqual(mockData);
    });
    it('does not set the data if the received data is the same as the existing data', () => {
        const { result } = renderHook(() => useSubscribedBalance());
        const { setBalanceData } = result.current;

        act(() => setBalanceData(mockData));
        expect(result.current.data).toEqual(mockData);
        act(() => setBalanceData(mockData));
        expect(result.current.data).toEqual(mockData);
    });
});
