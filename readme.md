# Next + Emotion + SSR

This package encapsulates the
[Advanced Approach](https://emotion.sh/docs/ssr#advanced-approach) of doing SSR
in Emotion 11, adapted for [Next.js](https://nextjs.org/).

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

We assume that you already have `@emotion/react`, `next`, `react`, `react-dom`
installed. If you don't have them, use this command to install them:

```sh
$ yarn add @emotion/react next react react-dom
```

Then install this package with:

```sh
$ yarn add @cprecioso/next-emotion-ssr
```

If you're only using
[`@emotion/styled` components](https://emotion.sh/docs/styled), you can stop
here. However, if you're going to use
[the `css` prop](https://emotion.sh/docs/css-prop), or want to take advantage of
the
[`@emotion/babel-plugin` functionalities](https://emotion.sh/docs/@emotion/babel-plugin),
you should
[install and configure them](https://emotion.sh/docs/css-prop#babel-preset).

## Usage

Then create a `pages/_app.jsx` or `pages/_app.tsx` file and write:

```typescript
export { EmotionApp as default } from "@cprecioso/next-emotion-ssr"
```

Similarly, create a `pages/_document.jsx` or `pages/_document.tsx` file and
write:

```typescript
export { EmotionDocument as default } from "@cprecioso/next-emotion-ssr"
```

> If you have a custom `Document` or `App` already, you can wrap them in the
> `makeEmotionApp(YourAppComponent)` and
> `makeEmotionDocument(YourDocumentComponent)` functions exported from the
> package.
