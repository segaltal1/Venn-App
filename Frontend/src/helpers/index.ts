export const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timeoutId;
    return (...args: any[]) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
};