import NodeGeocoder, { BaseOptions, GenericOptions } from 'node-geocoder';
import dotenv from 'dotenv';

dotenv.config({ path: '../../config/config.env' });

const options: GenericOptions & BaseOptions = {
    provider: 'openmapquest',
    apiKey: 'MXi91JxevNJ7bDNtKpfuYLdqs9sF51Qs',
    httpAdapter: 'https',
    formatter: null
}

export const geocoder = NodeGeocoder(options);