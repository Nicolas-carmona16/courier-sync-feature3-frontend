const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/graphql"

interface GraphQLResponse<T = any> {
  data?: T
  errors?: Array<{ message: string }>
}

export async function graphqlRequest<T = any>(query: string, variables?: Record<string, any>): Promise<T> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const json: GraphQLResponse<T> = await response.json()

  if (json.errors) {
    throw new Error(json.errors[0]?.message || "GraphQL error")
  }

  if (!json.data) {
    throw new Error("No data returned from GraphQL")
  }

  return json.data
}
