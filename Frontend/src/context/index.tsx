import React, {createContext, useState, ReactNode, FC} from 'react';
import {NeighborhoodType} from "../types";

type GlobalState = {
    isFilterModalOpen: boolean;
    setIsFilterModalOpen: (isOpen: boolean) => void;
    filterParams: any;
    setFilterParams: (params: any) => void;
    selectedNeighborhood: string;
    setSelectedNeighborhood: (neighborhood: string) => void;
}

const GlobalContext = createContext<GlobalState | undefined>(undefined);

const GlobalProvider: FC<{ children: ReactNode }> = ({children}) => {
    const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);
    const [filterParams, setFilterParams] = useState<any>({});
    const [neighborhoodList, setNeighborhoodList] = useState<NeighborhoodType[] | null>(null);
    const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>('');

    const contextObject = {
        isFilterModalOpen,
        filterParams,
        neighborhoodList,
        selectedNeighborhood,
        setSelectedNeighborhood,
        setIsFilterModalOpen,
        setFilterParams,
        setNeighborhoodList
    };

    return (
        <GlobalContext.Provider value={contextObject}>
            {children}
        </GlobalContext.Provider>
    )
};

const useGlobalContext = (): GlobalState => {
    const context = React.useContext(GlobalContext);
    if (!context) {
        throw new Error('useGlobalContext must be used within a GlobalProvider');
    }
    return context;
};

export {GlobalProvider, useGlobalContext};
