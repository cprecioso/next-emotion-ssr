import { CacheProvider } from "@emotion/core"
import App from "next/app"
import React from "react"
import { cache } from "./cache"

const createEmotionApp = (NextApp: typeof App): typeof App =>
  class EmotionApp extends NextApp {
    // Just wrap the whole App in Emotion's `CacheProvider`. This allows the
    // server to identify and extract critical styles, and the client to
    // hydrate said critical styles.
    render() {
      return <CacheProvider value={cache}>{super.render()}</CacheProvider>
    }
  }

export default createEmotionApp
