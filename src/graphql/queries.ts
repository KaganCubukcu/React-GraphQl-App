import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://countries.trevorblades.com/",
  cache: new InMemoryCache(),
});

client
  .query({
    query: gql`
      query ($filter: String) {
        countries(filter: { name: { regex: $filter } }) {
          name
          capital
          currency
        }
      }
    `,
    variables: {
      filter: "tt",
    },
  })
  .then((result) => console.log(result));
