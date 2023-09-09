# personal-site

Personal website, blog, portfolio, whatever you want to call it.

Has a brief about me section, contact links, projects, blog posts, and link to my resume.

Created with [zola](https://github.com/getzola/zola), a static site generator similar to Hugo and Eleventy written in Rust
and using Tera, a Jinja2-like templating language also written in Rust.

All the content of the posts is written in Markdown which are then used to generated static HTML pages by zola.

I didn't use any prebuilt theme, just custom CSS including a light and dark theme (click the emoji in the corner)

## Run Locally

Run `zola build` in project directory to generate static site in `public` folder.

Run `zola server` to both build and on project on a local dev server on `127.0.0.1:1111`

## TODO
 - Cleanup CSS and remove unneeded styles (please don't look index.css it's a mess right now)
 - Add ubuntu font

