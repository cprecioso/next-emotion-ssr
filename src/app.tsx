import { CacheProvider } from "@emotion/react"
import NextApp, { AppProps } from "next/app"
import type { ComponentType, FunctionComponent } from "react"
import { cache } from "./cache"

export const makeEmotionApp: <P extends AppProps>(
  App?: ComponentType<P>
) => FunctionComponent<P> =
  (App = NextApp) =>
  (props) =>
    (
      <CacheProvider value={cache}>
        <App {...props} />
      </CacheProvider>
    )

export const EmotionApp = /*#__PURE__*/ makeEmotionApp()
