import data from '../constants/MySat-1_Beacon_data_sample.json';

export const getFirst400 = () => {
    return data.slice(450, 600);
};