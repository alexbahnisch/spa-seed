import { Cookie, LocalStorage, SessionStorage } from 'storage-manager-js'

import { IS_PRODUCTION } from '../common/constants'

declare global {
  interface Window {
    clean?(): void
  }
}

if (typeof window !== 'undefined' && !IS_PRODUCTION) {
  window.clean = () => {
    Cookie.deleteAll()
    LocalStorage.deleteAll()
    SessionStorage.deleteAll()
    window.location.reload()
  }
}
