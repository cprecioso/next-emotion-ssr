import createEmotionServer from "@emotion/server/create-instance"
import NextDocument, {
  DocumentContext,
  DocumentInitialProps,
} from "next/document"
import { cache } from "./cache"
import { emotionChunksToStyleTags } from "./util"

export const makeEmotionDocument: {
  (): typeof NextDocument
  <T extends typeof NextDocument>(Document: T): T
} = (Document = NextDocument) =>
  class EmotionDocument extends Document {
    static async getInitialProps(
      ctx: DocumentContext
    ): Promise<DocumentInitialProps> {
      const { extractCriticalToChunks } = createEmotionServer(cache)
      const initialProps = await super.getInitialProps(ctx)
      const emotionProps = extractCriticalToChunks(initialProps.html)

      return {
        ...initialProps,
        html: emotionProps.html,
        styles: (
          <>
            {initialProps.styles}
            {emotionChunksToStyleTags(emotionProps)}
          </>
        ),
      }
    }
  }

export const EmotionDocument = /*#__PURE__*/ makeEmotionDocument()
