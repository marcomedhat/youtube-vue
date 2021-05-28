import Home from './components/Home.vue'
import VideoDetails from './components/VideoDetails.vue'
import Search from './components/Search.vue'

export default [
  {path: '/', component: Home},
  {path: '/search', component: Search},
  {path: '/video/:id', component: VideoDetails}
]