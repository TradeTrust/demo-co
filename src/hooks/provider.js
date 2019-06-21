import { useState } from "react";
import { setNewWeb3, getWeb3 } from "services/web3";

export const useWeb3Provider  = () => {
    const [provider, setProvider] = useState(getWeb3());
    useEffect(async () => {
        if(!provider) {
            await setNewWeb3();
            setProvider(getWeb3());
        }
    });
    return provider;
}