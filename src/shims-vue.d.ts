/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.jpg' {
  const component: string
  export default component
}
declare module '*.png' {
  const component: string
  export default component
}
declare module '*.svg' {
  const component: string
  export default component
}

