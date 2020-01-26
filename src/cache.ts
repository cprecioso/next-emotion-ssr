import createCache from "@emotion/cache"

// The cache is extracted into its own file because we don't want the
// `EmotionApp` to pull the whole file of `EmotionDocument` and its
// dependencies, and vice versa.
export const cache = createCache()
