import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { ParamSchema } from "./inputs";
import { UserSchema } from "./outputs";
import { swaggerUI } from "@hono/swagger-ui";
import { DefaultService } from "../generated";

const response = await DefaultService.getUser("1223");
// console.log("hellow ",response)

const app = new OpenAPIHono();

// routes...
const route = createRoute({
  method: "get",
  path: "/user/{id}",
  request: {
    params: ParamSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: UserSchema,
        },
      },
      description: "Get the Users details",
    },
  },
});
const postUserRoute = createRoute({
  method: "post",
  path: "/user/{id}",
  request: {
    params: ParamSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: UserSchema,
        },
      },
      description: "Get the Users details",
    },
  },
});

// endpoints.
app.openapi(route, (c) => {
  const { id } = c.req.valid("param");
  return c.json({
    id,
    age: 20,
    name: "Tony Stark",
  });
});

app.openapi(postUserRoute, (c) => {
  const { id } = c.req.valid("param");
  return c.json({
    id,
    age: 20,
    name: "Tony Stark",
  });
});

// openapi docs...
app.doc("/doc", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "MY APP",
  },
});

app.use("/ui", swaggerUI({ url: "/doc" }));

export default app;
