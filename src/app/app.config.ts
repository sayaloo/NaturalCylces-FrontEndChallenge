import { ApplicationConfig } from '@angular/core'
import { provideRouter } from '@angular/router'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { provideLuxonDateAdapter } from '@angular/material-luxon-adapter'

import { routes } from './app.routes'

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideLuxonDateAdapter()],
}
