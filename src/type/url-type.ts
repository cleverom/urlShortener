import { GraphQLObjectType, GraphQLString }from 'graphql';

const urlType = new GraphQLObjectType({
    name: 'url',
    description: 'An object showing the shortened url',
    fields: () => ({
        newUrl: {
            type: GraphQLString
        }
    })
})

export default urlType