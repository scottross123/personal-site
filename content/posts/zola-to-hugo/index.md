+++
title = "Transitioning from Zola To Hugo"
date = 2023-12-29
draft = true
description = "Documentation from how I transition from Zola to Hugo"
tags = ['web']
+++

Recently I migrated this blog from [Zola](https://getzola.org), a site generator written in Rust, to [Hugo](https://gohugo.io), another static site generator written in Go. If you're into web dev you've probably already of heard of Hugo, but maybe not Zola. It is very similar to Hugo, and like Hugo uses Markdown files for its content.

## Why I switched

I've got nothing against Zola, it's pretty cool, and I recommend you check it out if you're looking for a static site generator. I didn't run into any noteworthy gotchas or issues while working with it. The primary reason for switching was just because we're using Hugo for a big project at work and I wanted to give myself some personal incentive for learning it, so I thought I'd give it a try for this site. In a few weeks if I end up hating Hugo I'll switch back to Zola. My site is very minimal at this stage so the migration was really easy and I didn't have to waste a ton of time or anything trying to translate everything from Zola to Hugo.

## Migration

Migrating the content was super easy. `cp /path/to/my/zola/site/content/* /path/to/my/hugo/site/content`. Done. Like I mentioned before, both Hugo and Zola use markdown for content so I didn't need to change any files. Zola uses [TOML](https://toml.io/en/) for front matter, and Hugo supports both YAML and TOML front matter, so no changes there.

To get to tags to work correctly I needed to remove `[taxonomies]` from the the front matter. This is unnecessary in Hugo.

The shortcode syntax between Zola and Hugo is also different, so you will have to modify your short codes like so.

My previous zola site didn't use any theme and just templates I created and some janky custom CSS. I opted to nix all of this and use the [smol](https://themes.gohugo.io/themes/smol/) for Hugo, plus some of my own modifications.

## Conclusion

That's all, like I said my site is pretty basic so I didn't have to do a lot of work to transition. I am still going to keep Zola in mind for future projects, and like I said if I end up hating Hugo too much I might switch over to it.

## References

- [Zola](www.getzola.org)
- [Hugo](www.gohugo.io)