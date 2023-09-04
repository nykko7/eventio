import { rpcHandler } from "@blitzjs/rpc"
import { api } from "@/blitz-server.page"

export default api(rpcHandler({ onError: console.log }))
