type filterParamsType = {
    ageRange?: [number, number];
    maxDistance?: number;
    sortBy?: [string, string];

};
export const parseQueryParams = (query: any): filterParamsType => {
    const {ageRange, maxDistance, sortBy} = query;

    return {
        ageRange: ageRange && ageRange.length === 2 ? [parseInt(ageRange[0]), parseInt(ageRange[1])] : undefined,
        maxDistance: maxDistance?.endsWith('km') ? parseInt(maxDistance.replace('km', '')) : undefined,
        sortBy: sortBy  && sortBy.length === 2 ? [sortBy[0], sortBy[1]] : undefined,
    }
}

