import { GraphQLObjectType, GraphQLSchema, GraphQLNonNull, GraphQLString } from 'graphql';
import getNewUrl from '../utils';
import urlType from '../type/url-type';


const query = new GraphQLObjectType({
    name: 'shortenURL',
    description: 'returns a shortened url',
    fields: () => ({
        shortenURL: {
            type: urlType,
            args: {
                url: {
                    type: new GraphQLNonNull(GraphQLString),
                    description: 'can only be a valid url'
                }
            },
            resolve(_, { url }) {
                return getNewUrl(url);
            }
        }
    })
})

const schema = new GraphQLSchema({
    query
})

export default schema;