import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import SkeletonCircle from '@/components/skeleton/circle/index.js'
import SkeletonRect from '@/components/skeleton/rect/index.js'

Vue.use(Element)
Vue.use(SkeletonCircle)
Vue.use(SkeletonRect)
