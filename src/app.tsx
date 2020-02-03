import { CacheProvider } from "@emotion/core"
import App from "next/app"
import React from "react"
import { cache } from "./cache"

type AppComponent = typeof App extends React.ComponentType<infer P>
  ? React.ComponentType<P>
  : never

const createEmotionApp = (NextApp: typeof App): AppComponent => props => (
  // Just wrap the whole App in Emotion's `CacheProvider`. This allows the
  // server to identify and extract critical styles, and the client to
  // hydrate said critical styles.
  <CacheProvider value={cache}>
    <NextApp {...props} />
  </CacheProvider>
)

const EmotionApp = createEmotionApp(App)

export { createEmotionApp as default, createEmotionApp, EmotionApp }
