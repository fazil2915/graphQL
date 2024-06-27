import "graphql-import-node";
import fastify from "fastify";
import { getGraphQLParameters, processRequest, Request, sendResult,renderGraphiQL,shouldRenderGraphiQL } from "graphql-helix";
import { schema } from "./schema";

async function main() {
  const server = fastify();

  // server.get("/", (req, reply) => {
  //   reply.send({ test: true });
  // });

server.route({
  method:["POST","GET"],
  url:"/graphql",
  handler:async(req,reply)=>{
    const request :Request={
      headers:req.headers,
      method:req.method,
      query:req.query,
      body:req.body,
    };
  //render the out for graphIde

  if(shouldRenderGraphiQL(request)){
    reply.header("content-type","text/html");
    reply.send(
      renderGraphiQL({
        endpoint:"/graphql",
      })
    );
    return;
  }

    const {operationName,query,variables}=request.body=getGraphQLParameters(request);

    const result=await processRequest({
      request,
      schema,
      operationName,
      query,
      variables,

    });
    sendResult(result,reply.raw);
  }
});


  server.listen({port:3000,host: "0.0.0.0"}, () => {
    console.log(`Server is running on http://localhost:3000/`);
  });
}

main();