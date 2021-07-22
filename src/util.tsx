import type { EmotionCriticalToChunks } from "@emotion/server/types/create-instance"

type StyleChunk = EmotionCriticalToChunks["styles"] extends (infer T)[]
  ? T
  : never

const styleChunkToTag = (style: StyleChunk) => (
  <style
    key={style.key}
    data-emotion={[style.key, ...style.ids].join(" ")}
    dangerouslySetInnerHTML={{ __html: style.css }}
  />
)

export const emotionChunksToStyleTags = (chunks: EmotionCriticalToChunks) => (
  <>{chunks.styles.map(styleChunkToTag)}</>
)
