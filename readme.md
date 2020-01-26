# Next + Emotion + SSR

This package encapsulates the
[Advanced Approach](https://emotion.sh/docs/ssr#advanced-approach) of doing SSR
in Emotion 10, adapted for [Next.js](https://nextjs.org/).

The code is quite simple, so if you need more customization (like using a
[non-default EmotionCache](https://emotion.sh/docs/@emotion/cache)), it's easy
to copy it to your project and do the necessary changes.

## Why use this?

Indeed, if you're happy enough with
[Emotion's Default SSR Approach](https://emotion.sh/docs/ssr#default-approach),
you don't need this package.

However, this **Default Approach** creates one `<style>` tag per component, and
inserts them in the DOM, individually, wherever your component appears. This can
unnecessarily increase your bundle size, and create problems with `:nth`
selectors, as the docs note.

In contrast, the **Advanced Approach** removes all this individual `<style>`
tags, and concatenates them into a single one. It does so without losing any
functionality, so it's strictly better in my eyes.

However, the docs are not especially helpful in teaching how to set it up, and
getting it to work with the idiosyncrasies of `Next.js` can take some time to
work out (it did for me!). That's why I created this package.

## Installing

We assume that you already have `@emotion/core`, `next`, and `react` installed.
If you don't have them, use this command to install them:

```sh
$ yarn add @emotion/core next react
```

Then install this package with:

```sh
$ yarn add --dev @cprecioso/next-emotion-ssr
```

## Usage

Setup `@emotion/core` normally.
[There's an official example available](https://github.com/zeit/next.js/tree/master/examples/with-emotion).

Then create a `pages/_app.jsx` or `pages/_app.tsx` file and write:

```typescript
import createEmotionApp from "@cprecioso/next-emotion-ssr/app"
import App from "next/app"

export default createEmotionApp(App)
```

Similarly, create a `pages/_document.jsx` or `pages/_document.tsx` file and
write:

```typescript
import createEmotionDocument from "@cprecioso/next-emotion-ssr/document"
import Document from "next/document"

export default createEmotionDocument(Document)
```

### Advanced

If you already created a custom `App`, just subclass your component from the
wrapped Emotion version instead of the original Next one, like this:

```patch
 import App from "next/app"
+import createEmotionApp from "@cprecioso/next-emotion-ssr/app"
 ...
-class MyApp extends App {
+class MyApp extends createEmotionApp(App) {
 ...
 }
 export default MyApp
```

Same with a custom `Document`:

```patch
 import Document from "next/document"
+import createEmotionDocument from "@cprecioso/next-emotion-ssr/app"
 ...
-class MyDocument extends Document {
+class MyDocument extends createEmotionDocument(Document) {
 ...
 }
 export default MyDocument
```

> If you need to access the cache we're using, just
> `import { cache } from "@cprecioso/next-emotion-ssr"`. There are few reasons
> why you'd need to do this.
