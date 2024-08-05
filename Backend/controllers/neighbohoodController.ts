import {Request, Response} from 'express';
import {client, dbName} from '../db';
import {parseQueryParams} from "../helpers";
import {Filter} from 'mongodb';

const MAX_LIMIT = 100;
export const getNeighborhoods = async (req: Request, res: Response) => {

    try {
        const filterParams = parseQueryParams(req.query);
        const database = client.db(dbName);
        const collection = database.collection('neighborhoods');

        if (filterParams.ageRange || filterParams.maxDistance || filterParams.sortBy) {
            const query: Filter<object> = {};
            if (filterParams.ageRange) {
                query['averageAge'] = {
                    $gte: filterParams.ageRange[0],
                    $lte: filterParams.ageRange[1]
                }
            }
            if (filterParams.maxDistance) {
                query['distanceFromCityCenter'] = {
                    $lte: filterParams.maxDistance
                }
            }

            const sortQuery: any = {};
            if (filterParams.sortBy && filterParams.sortBy.length === 2) {
                sortQuery[filterParams.sortBy[0]] = filterParams.sortBy[1] === 'asc' ? 1 : -1;
            }

            const neighborhoods = await collection
                .find(query)
                .sort({...sortQuery})
                .limit(MAX_LIMIT)
                .toArray();

            res.send({neighborhoods});
            return;
        }

        const neighborhoods = await collection.find({}).limit(MAX_LIMIT).toArray();

        res.send({neighborhoods});
    } catch (error) {
        res.status(500).send('Error in the server' + error);
    }
}

