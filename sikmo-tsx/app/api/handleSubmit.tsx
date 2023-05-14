import { ApolloClient, InMemoryCache, NormalizedCache, NormalizedCacheObject, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { gql } from '@apollo/client';

export interface Formular {
    name: { name: string };
}
export interface RepoData {
    node: {
        name: string,
        url: string,
        description: string,
        owner: { 
          login: string, url: string
        },
        primaryLanguage: {
            name: string
        }
        stargazerCount: number
    }
  };
   
export default async function handleSubmit({name}: Formular, ){
    // vytvoreni odkazu pro volani fetch
    const httpLink = createHttpLink({
        uri: 'https://api.github.com/graphql',
    });
    // vytvoreni hlavicky odkazu pro overeni
    const authLink = setContext((_, { headers }) => {
        const token = process.env.GITHUB_TOKEN;
        return{
            headers: {
                ...headers,
                authorization: `Bearer ${token}`,
            }
        }
    });

    // Vytvoreni Clienta pro Graphql na github vcetne tokenu
    const client = new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache()
    });

    // vytvoreni promena pro naplneni gql dotazu;
    const variableName = `name: ${name} sort:stars-desc`;

    // GQL dotaz dle zadani

    const GET_MY_REPO = gql`
            query GetRepo($searchName: String!) 
            {
                search(query: $searchName , type: REPOSITORY, first: 10) {
                    edges {
                        node {
                            ... on Repository {
                        name
                        url
                        description
                        owner {
                            login
                            url
                        }
                        stargazerCount
                        primaryLanguage {
                            name
                        }
                    }
                }
            }
        }
    }
    `;

    // volani klientskeho dotazu a ulozeni dat
    const { data } = await client.query({
        query: GET_MY_REPO,
        variables: { searchName: variableName },
    });     
    
    const { search } = data;
    const pinnedItems = search.edges.map((edge: RepoData) => edge.node);
    
    return pinnedItems;

}