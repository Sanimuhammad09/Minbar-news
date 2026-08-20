import { createAPIFileRoute } from '@tanstack/react-start/api'

const openApiSpec = {
  openapi: "3.0.0",
  info: {
    title: "Minbar News API",
    version: "1.0.0",
    description: "API for Minbar News backend powered by TanStack Start and Supabase."
  },
  paths: {
    "/api/articles": {
      get: {
        summary: "Get all articles",
        responses: {
          "200": { description: "List of articles" }
        }
      },
      post: {
        summary: "Create a new article",
        requestBody: {
          required: true,
          content: { "application/json": { schema: { type: "object" } } }
        },
        responses: {
          "201": { description: "Created article" }
        }
      }
    },
    "/api/articles/{id}": {
      get: {
        summary: "Get article by ID",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: {
          "200": { description: "Article found" },
          "404": { description: "Article not found" }
        }
      },
      put: {
        summary: "Update article by ID",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        requestBody: {
          required: true,
          content: { "application/json": { schema: { type: "object" } } }
        },
        responses: {
          "200": { description: "Updated article" }
        }
      },
      delete: {
        summary: "Delete article by ID",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: {
          "204": { description: "Deleted article" }
        }
      }
    },
    "/api/categories": {
      get: {
        summary: "Get all categories",
        responses: {
          "200": { description: "List of categories" }
        }
      },
      post: {
        summary: "Create a new category",
        requestBody: {
          required: true,
          content: { "application/json": { schema: { type: "object" } } }
        },
        responses: {
          "201": { description: "Created category" }
        }
      }
    },
    "/api/users": {
      get: {
        summary: "Get all users",
        responses: {
          "200": { description: "List of users" }
        }
      },
      post: {
        summary: "Create a new user",
        requestBody: {
          required: true,
          content: { "application/json": { schema: { type: "object" } } }
        },
        responses: {
          "201": { description: "Created user" }
        }
      }
    }
  }
}

export const APIRoute = createAPIFileRoute('/api/openapi.json')({
  GET: async () => {
    return Response.json(openApiSpec)
  }
})
