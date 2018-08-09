webpackJsonp([0xdc6677c37d92],{534:function(e,t){e.exports={data:{site:{siteMetadata:{title:"Engineering at MindLink"}},markdownRemark:{id:"/Applications/TfsBuildAgent/_work/7/s/src/pages/18-04-13-tfs-to-github-pages/index.md absPath of file >>> MarkdownRemark",html:'<p>Recently we decided it was time to publish our own blog to showcase some of what our talented engineers do and find interesting. To do this with the existing tools and as cheaply and quickly as possible we needed to link Team Foundation Server (TFS) to GitHub Pages.</p>\n<h2>TL;DR</h2>\n<p>To deploy from TFS to GitHub pages:</p>\n<ol>\n<li>Install the <code class="language-text">gh-pages</code> npm module </li>\n<li>Define an npm script to run gh-pages e.g. <code class="language-text">“deploy”: “gh-pages -d public”</code></li>\n<li>Use TFS secure variables to inject a GitHub personal token into <code class="language-text">gh-pages</code> call </li>\n<li>\n<p>Combined this means defining a build step of the form</p>\n<ul>\n<li><code class="language-text">npm run deploy — -r https://$(GH_TOKEN)@github.com/user/repository.git</code></li>\n<li>The <code class="language-text">—</code> (that’s a double <code class="language-text">-</code>) tells npm that it should forward what follows as additional script arguments </li>\n<li>The <code class="language-text">-r</code> is the <code class="language-text">gh-pages</code> argument for defining an alternative repository </li>\n<li>The <code class="language-text">$(GH_TOKEN)</code> will be replaced by TFS with the value of the variable called <code class="language-text">GH_TOKEN</code></li>\n</ul>\n</li>\n</ol>\n<h2>Onward to a continuously deployed blog</h2>\n<p>Here at MindLink we use Microsoft Team Foundation Server to host our source in a git repository, manage the build and release process and track our iterations. It’s all nice and integrated!</p>\n<p>We wanted to keep ownership of the blogging platform as seems to be the trend, as opposed to using a service like <a href="https://www.medium.com">medium</a>. The main reason for this is that by having control we also gain the ability to change where we publish and how we publish in future.</p>\n<p>GitHub pages struck us as the perfect platform for a low cost (<em>free</em>) way to publish a blog and is widely used for such a purpose. It also has a simple way to publish a site - simply push a static site to a specific repository (or gh-pages branch in a project repository). You can read more about GitHub pages <a href="https://pages.github.com/">here</a>.</p>\n<p>What we wanted was a simple way to write a blog post and automatically publish it using the tools our engineers use every day.</p>\n<blockquote>\n<p>This will give it a low barrier to entry and encourage all the development team to contribute!</p>\n</blockquote>\n<p>As TFS was our existing git repository host and build system it made sense to leverage that for the blog source and release mechanism. Getting TFS to publish a built static site to GitHub is not so straight forward.</p>\n<p>With a static site generator (<a href="https://www.gatsbyjs.org/">gatsby</a> in this case) it’s easy to take a source tree and build a static site. That’s step 1.</p>\n<p>To take that static site and publish it to GitHub when you’re not already in a GitHub repository is less straight-forward, but still perfectly doable!</p>\n<ol>\n<li>Use the <code class="language-text">gh-pages</code> npm module to publish </li>\n<li>Use an npm script to define the standard <code class="language-text">gh-pages</code> script </li>\n<li>Get TFS build to run the npm script and inject the GitHub credentials and target repository </li>\n<li>Setup the build triggers to either run on every commit, schedule it or do something else </li>\n</ol>\n<p>I’d probably also suggest splitting the build and release phases if you’re worried about publishing potentially broken sites. Since TFS has a fairly powerful build and release mechanism you can get a process that works for you!</p>\n<h2>The details</h2>\n<p>I’m going to assume the following:</p>\n<ol>\n<li>You already have a script to build the static site (maybe an npm script or gulp or grunt process) </li>\n<li>The static site is built to <code class="language-text">/public</code> in the root directory </li>\n</ol>\n<h3>Setup gh-pages npm script</h3>\n<p>The first step is to install the node modules we will need (I’m using yarn here but it will work just as well with npm install): <code class="language-text">yarn add gh-pages</code>.</p>\n<p>With that installed we’ll now specify an npm script to publish the built static site (you could just as easily do this with a task runner like gulp or grunt instead, the trick is in injecting the GitHub key):</p>\n<div class="gatsby-highlight">\n      <pre class="language-json"><code class="language-json"><span class="token punctuation">{</span>\n    ...<span class="token punctuation">,</span>\n    <span class="token property">"scripts"</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n        ...<span class="token punctuation">,</span>\n        <span class="token property">"deploy"</span><span class="token operator">:</span> <span class="token string">"gh-pages -d public"</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>This tells <code class="language-text">gh-pages</code> to run using only the “public” folder. With only this configuration it will add a branch called gh-pages to the current repository.</p>\n<h3>Get TFS Build to run the script</h3>\n<p>For the second step we need to tell TFS build to run this script and target a GitHub repository instead!</p>\n<p>Get yourself a personal access token from GitHub by going to <a href="https://github.com/settings/tokens">github token settings for your account</a> and creating a new access token. Make sure you give it permission to read and write to public repositories. Copy that token and don’t lose it!</p>\n<p>Now go to your TFS build configuration and select the variables tab. Add the token as a secure variable with any name you like - here we use <code class="language-text">GH_TOKEN</code>.</p>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/static/tfs-variables-576181a66ba553dcf1f9105718fcbac9-eeb2a.jpg"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block; ; max-width: 590px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 30.13270882123341%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAGABQDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAEF/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEAMQAAAB34FB/8QAFhAAAwAAAAAAAAAAAAAAAAAAABAR/9oACAEBAAEFAiL/xAAUEQEAAAAAAAAAAAAAAAAAAAAQ/9oACAEDAQE/AT//xAAUEQEAAAAAAAAAAAAAAAAAAAAQ/9oACAECAQE/AT//xAAWEAADAAAAAAAAAAAAAAAAAAAAEDH/2gAIAQEABj8CKv/EABgQAQEAAwAAAAAAAAAAAAAAABEBABBh/9oACAEBAAE/IQyqqnNf/9oADAMBAAIAAwAAABADz//EABQRAQAAAAAAAAAAAAAAAAAAABD/2gAIAQMBAT8QP//EABQRAQAAAAAAAAAAAAAAAAAAABD/2gAIAQIBAT8QP//EABsQAQACAgMAAAAAAAAAAAAAAAEAETFBYZGh/9oACAEBAAE/EAYX3GEGNKp8ic1P/9k=\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="TFS Variables"\n        title=""\n        src="/static/tfs-variables-576181a66ba553dcf1f9105718fcbac9-f8fb9.jpg"\n        srcset="/static/tfs-variables-576181a66ba553dcf1f9105718fcbac9-e8976.jpg 148w,\n/static/tfs-variables-576181a66ba553dcf1f9105718fcbac9-63df2.jpg 295w,\n/static/tfs-variables-576181a66ba553dcf1f9105718fcbac9-f8fb9.jpg 590w,\n/static/tfs-variables-576181a66ba553dcf1f9105718fcbac9-85e3d.jpg 885w,\n/static/tfs-variables-576181a66ba553dcf1f9105718fcbac9-d1924.jpg 1180w,\n/static/tfs-variables-576181a66ba553dcf1f9105718fcbac9-eeb2a.jpg 1281w"\n        sizes="(max-width: 590px) 100vw, 590px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<p>Next add a new build step to run our deploy script as below:</p>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/static/tfs-build-step-c2afb440c28667ee9f1dad68b0d9466c-d6369.jpg"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block; ; max-width: 590px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 46.334310850439884%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAJABQDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAQAF/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEAMQAAAB3mQmP//EABQQAQAAAAAAAAAAAAAAAAAAACD/2gAIAQEAAQUCX//EABQRAQAAAAAAAAAAAAAAAAAAABD/2gAIAQMBAT8BP//EABQRAQAAAAAAAAAAAAAAAAAAABD/2gAIAQIBAT8BP//EABQQAQAAAAAAAAAAAAAAAAAAACD/2gAIAQEABj8CX//EABUQAQEAAAAAAAAAAAAAAAAAAAEQ/9oACAEBAAE/IRpf/9oADAMBAAIAAwAAABCAD//EABQRAQAAAAAAAAAAAAAAAAAAABD/2gAIAQMBAT8QP//EABQRAQAAAAAAAAAAAAAAAAAAABD/2gAIAQIBAT8QP//EABgQAAIDAAAAAAAAAAAAAAAAAAAQETFB/9oACAEBAAE/EMCVR//Z\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="TFS Build Step"\n        title=""\n        src="/static/tfs-build-step-c2afb440c28667ee9f1dad68b0d9466c-f8fb9.jpg"\n        srcset="/static/tfs-build-step-c2afb440c28667ee9f1dad68b0d9466c-e8976.jpg 148w,\n/static/tfs-build-step-c2afb440c28667ee9f1dad68b0d9466c-63df2.jpg 295w,\n/static/tfs-build-step-c2afb440c28667ee9f1dad68b0d9466c-f8fb9.jpg 590w,\n/static/tfs-build-step-c2afb440c28667ee9f1dad68b0d9466c-85e3d.jpg 885w,\n/static/tfs-build-step-c2afb440c28667ee9f1dad68b0d9466c-d6369.jpg 1023w"\n        sizes="(max-width: 590px) 100vw, 590px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<div class="gatsby-highlight">\n      <pre class="language-text"><code class="language-text">Type: npm\nRun: custom\nArguments: deploy — -b master -r https://$(GH_TOKEN)@github.com/MindLink/MindLink.github.io.git</code></pre>\n      </div>\n<p>That’s it! TFS build will run the npm script “deploy” and pass additional arguments:</p>\n<ul>\n<li><code class="language-text">-b master</code> => publish to the master branch of the repository</li>\n<li><code class="language-text">-r https://$(GH_TOKEN)@&lt;repository&gt;</code> => publish to a repository using the personal token (which allows you to publish without a user/pass) </li>\n</ul>\n<p>Now whenever you trigger the build it will publish a new version of your static site to GitHub Pages.</p>\n<h3>Wrap up</h3>\n<p>This is the exactly how we have started doing it. Right now our team has total freedom to push updates to the blog with continuous deployment, in future that may change to a more managed release process, but our aim is to get our content out with as few steps as possible!</p>\n<p>If you’re interested the full process for somebody to post an article to our blog is:</p>\n<ol>\n<li>Checkout the blog source </li>\n<li>Add an author yaml entry if they’ve not already got one </li>\n<li>Add a new post folder with a unique name </li>\n<li>Add a markdown article with front matter (author, title, date and tags) </li>\n<li>Run it locally first if you like </li>\n<li>Commit and push </li>\n</ol>\n<p>We could distil this further, but we shall see how we get on! A couple of ideas are:</p>\n<ul>\n<li>don’t require a separate folder, so you just create the markdown article and push </li>\n<li>Support drafts so you can push without publishing, but still view in develop </li>\n</ul>',frontmatter:{title:"Publishing to GitHub Pages from TFS",date:"April 13, 2018",author:{id:"Luke Terry",bio:"Senior Engineer at MindLink. Enjoys technology, playing games and making things work, blogs at www.indescrible.co.uk.",avatar:{childImageSharp:{resolutions:{tracedSVG:"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60' version='1'%3E%3Crect width='100%25' height='100%25' fill='%23f6f2f8'/%3E%3Cpath d='M0 4l1 4v17l-1 8 1 7 1 2-1 1-1 9v8h11c11 0 11 0 11-2l-2-9c0-6 0-6 2-5l5 1 4-1h-4c-4 0-8-5-11-12-2-6-3-9-1-9 4 0 5 0 4-1l-2-1c-1 1-2 0-2-2-1-4 2-9 5-10l12 1 3 1c1-1 2 2 2 3l1 5c2 4 2 4 2 2 0-3 0-3 2-1s-1 12-3 9l-1 2c0 3-5 11-7 12v1l4-3 3-4 4 4c5 6 8 13 9 18l5 1h5V34a171 171 0 0 0-1-27l1-3V0H0v4m0 12c0 3 1 4 1 2v-6c-1-1-1 0-1 4m0 17c0 4 1 6 1 3v-8l-1 5m0 21c0 4 1 5 1 3v-6c0-2-1-1-1 3' fill='%23e0d6eb' fill-rule='evenodd'/%3E%3C/svg%3E",width:60,height:60,src:"/static/luke-b4696583a30eac95175e7eb6a8becde1-454f9.jpg",srcSet:"/static/luke-b4696583a30eac95175e7eb6a8becde1-454f9.jpg 1x,\n/static/luke-b4696583a30eac95175e7eb6a8becde1-f8c68.jpg 1.5x,\n/static/luke-b4696583a30eac95175e7eb6a8becde1-d364e.jpg 2x,\n/static/luke-b4696583a30eac95175e7eb6a8becde1-e5a4b.jpg 3x"}}}}}}},pathContext:{slug:"publishing-to-github-pages-from-tfs",previous:null,next:{fields:{slug:"why-draftjs-doesnt-work-on-android"},frontmatter:{title:"Why DraftJS doesn't work on Android"}}}}}});
//# sourceMappingURL=path---publishing-to-github-pages-from-tfs-efe42a166c6643254c7b.js.map