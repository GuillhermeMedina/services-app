// node/index.ts
import {
  LRUCache,
  Service,
  ServiceContext,
  ParamsContext,
  RecorderState,
  method,
} from '@vtex/api'
import { Clients } from './clients'
import { analytics } from './handlers/analytics'
import { updateLiveUsers } from './event/liveUsersUpdate'


// Create a LRU memory cache for the Status client.
// The @vtex/api HttpClient respects Cache-Control and uses the provided cache.
const memoryCache = new LRUCache<string, any>({ max: 5000 })
metrics.trackCache('status', memoryCache)

declare global {
  type Context = ServiceContext<Clients, State>

  interface State extends RecorderState {
    code: number
  }
}

export default new Service<Clients, State, ParamsContext>({
  routes: {
    analytics: method({
      GET: [analytics],
    }),
  },
  events: {
    liveUsersUpdate: updateLiveUsers,
    
  },
})