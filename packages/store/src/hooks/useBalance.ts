import { useBalanceStore } from '../state/useBalanceStore';

export const useBalance = ()=>{
    const balance = useBalanceStore((state)=>state.balance);
    return balance
};