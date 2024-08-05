import {useState, useEffect} from 'react';
import {api} from '../services/api'
import {NeighborhoodType} from '../types';

type ResponseType = {
    data: NeighborhoodType[] | null;
    loading: boolean;
    error: Error | null;
}

export const useFetchNeighborhoods = (filterParams): ResponseType => {
    const [data, setData] = useState<NeighborhoodType[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);


            try {
                const response = await api.get('/neighborhoods', {
                    params: {
                        ...filterParams,
                    },
                });
                setData(response.data.neighborhoods);
            } catch (error) {
                setError(error);
                console.error('Error fetching neighborhoods:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();


    }, [filterParams]);

    return {data, loading, error};
};

