import createEmotionServer from "create-emotion-server"
import Document, { DocumentContext, DocumentInitialProps } from "next/document"
import React, { Fragment } from "react"
import { cache } from "./cache"

const { extractCritical } = createEmotionServer(cache)

const createEmotionDocument = (
  NextDocument: typeof Document
): typeof Document =>
  class EmotionDocument extends NextDocument {
    static async getInitialProps(
      ctx: DocumentContext
    ): Promise<DocumentInitialProps> {
      // We get the regular render of the App
      const initialProps = await super.getInitialProps(ctx)

      // This removes the style tags of the HTML and concatenates them in a
      // single CSS string.
      const critical = extractCritical(initialProps.html)

      // We replace the rendered html with the cleaned up one.
      initialProps.html = critical.html

      // We add the Emotion CSS to the styles already rendered by Next
      initialProps.styles = (
        <Fragment>
          {initialProps.styles}
          <style
            data-emotion-css={critical.ids.join(" ")}
            dangerouslySetInnerHTML={{ __html: critical.css }}
          />
        </Fragment>
      )

      return initialProps
    }
  }

export default createEmotionDocument
