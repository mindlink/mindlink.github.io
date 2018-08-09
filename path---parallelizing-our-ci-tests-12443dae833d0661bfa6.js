webpackJsonp([0xbf10ae2e1acf],{533:function(e,t){e.exports={data:{site:{siteMetadata:{title:"Engineering at MindLink"}},markdownRemark:{id:"/Applications/TfsBuildAgent/_work/7/s/src/pages/18-07-05-parallelizing-our-ci-tests/index.md absPath of file >>> MarkdownRemark",html:'<p>In this second “improving our CI tests” blog we’ll complete our journey by:</p>\n<ul>\n<li>Enabling parallel NUnit test execution at the text-fixture granularity</li>\n<li>Fixing some issues in our CI tests stack that prevented parallelisation</li>\n<li>Reducing our CI test run time by a further 10%</li>\n</ul>\n<h2>Background</h2>\n<p>The MindLink .NET CI/test stack looks like:</p>\n<ul>\n<li>TFS 2018</li>\n<li>NUnit</li>\n<li>Moq</li>\n</ul>\n<p>See the previous <a href="../improving-our-ci-tests">blog post</a> about how we enabled test project-level parallelism and upgraded to NUnit 3.10.</p>\n<h2>Parallelising Take 2</h2>\n<p>NUnit 3 now supports running individual tests in parallel. This is at a different level of granularity to the project-level scope supported by the external test runners. We can choose which groups of tests are able to run in parallel by attaching <code class="language-text">[Parallelizable]</code> attributes <a href="https://github.com/nunit/docs/wiki/Parallelizable-Attribute">at the correct level and scope</a>.</p>\n<p>This has some interesting implications for your tests. With project-level granularity, your tests still run in the same environment as they would do otherwise - basically just entire isolated environments running in parallel.</p>\n<p>Now, with test-level granularity <em>your tests</em> need to make sure that they can run whilst other tests are running. This of course <em>should</em> be the case for correctly designed Unit and in-memory component tests (and correctly designed code under test).</p>\n<p>In our previous post, project-level parallelism gave us a 2x speed-up (on a 2-processor build server). In theory, turning on test-level parallelisation isn’t going to give us any greater speed up - there are still 2 cores to perform the synchronously-running tests, regardless of who and how is scheduling them.</p>\n<p>However, we decided to look into this anyway because:</p>\n<ul>\n<li>Unless the project-level distribution of the tests is <em>exactly equal</em> across test projects, there will always be the case where there’s one test project left running after all the others have completed. At this stage, we will benefit from test-level parallelisation.</li>\n<li>Developers running the tests individually from Resharper/Visual Studio will benefit from the test-level parallelisation.</li>\n<li>We <em>should</em> be able to turn on parallelisation - if our tests are written correctly - so it’s an interesting exercise to try.</li>\n</ul>\n<h2>Turning on Parrallelisation</h2>\n<blockquote>\n<p>At this point in the blog I have typed the word “parallel” so many times I’m forgetting how to spell it.</p>\n</blockquote>\n<p>We need to decide at what level we can enable parallelisation. We have a couple of options, based on where we apply the <code class="language-text">[Parallelizable]</code> attribute, and what scope we define.</p>\n<ul>\n<li>Per-test - all tests can run parallel with each other</li>\n<li>Per-test-fixture - all test fixtures can run parallel with each other, but tests inside run sequentially</li>\n<li>Per-namespace - tests in different namespaces can be run in parallel, but tests inside the same namespace run sequentially</li>\n</ul>\n<p>The answer to the above depends on how you’ve written your tests. I think we’re in the same boat as most NUnit teams in that our test fixtures have state that is reset in each <code class="language-text">[SetUp]</code> method (i.e. we have private fields in each test fixture class). On the up-side, each test depends on that state and that state alone.</p>\n<div class="gatsby-highlight">\n      <pre class="language-c#"><code class="language-c#">[TestFixture]\npublic sealed class MyTestFixture\n{\n    private Mock&lt;IMyDependentInterface&gt; mockMyDependentInterface;\n\n    private MyClass myClass;\n\n    [SetUp]\n    public void SetUp()\n    {\n        this.mockMyDependentInterface = new Mock&lt;IMyDependentInterface&gt;();\n\n        this.myClass = new MyClass(this.mockMyDependentInterface.Object);\n    }\n\n    [Test]\n    public void DoingSomethingWhenSomethingDoesSomething()\n    {\n        this.mockMyDependentInterface.Setup(...);\n\n        Assert.That(\n            this.myClass.DoSomething(),\n            Is.EqualTo(Expected));\n    }\n}</code></pre>\n      </div>\n<p>I should point out that the goal with this work is to enable parallelization:</p>\n<ul>\n<li>With the minimum amount of work/changes/risk possible.</li>\n<li>Zero changes to the actual code (i.e. outside of the tests).</li>\n</ul>\n<p>If we can’t achieve parallelization without either of the above being true, then we’ll abandon the exercise.</p>\n<p>This leads me to the conclusion that we can run all test-fixtures in parallel, but tests inside each fixture must be run in sequence. This isn’t to say we can’t change individual test fixtures - or write new fixtures - to support per-test parallelization in future.</p>\n<p>So to do this, I apply the <code class="language-text">[Parallelizable]</code> to each of our test projects, at the assembly level. The Scope parameter is instructing that each test-fixture can be run in parallel, but no two tests inside each fixture can run at the same time.</p>\n<p><code class="language-text">[assembly: Parallelizable(ParallelScope.Fixtures)]</code></p>\n<p>And low-and-behold, when I run chunks of test fixtures in Resharper, I can actually see multiple fixtures running in parallel.</p>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/static/parallel-running-00849fbe03616d34da4f76653ea0a107-6eb6a.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block; ; max-width: 547px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 15.904936014625228%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAADCAIAAAAcOLh5AAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAlUlEQVQI12XJ0QqCMACF4b3/W0QYFHhTe4O60ASRXM41ajO3JJeFbpYVYZE3gvDdnP8AuFVwI8drNHOotYytFbE9NnWZ7YvftUB5j5qH2cgJJh6C/wLad/M0JT+T/JSIPc3lUWVC31T7egw0n0YHzA0TvyvA1PdLcQ136MBYjEkUYcaTVEhVFJU22tR9ZaUjjklKu/kFxN+eas7S9E4AAAAASUVORK5CYII=\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="Test Platform Settings"\n        title=""\n        src="/static/parallel-running-00849fbe03616d34da4f76653ea0a107-6eb6a.png"\n        srcset="/static/parallel-running-00849fbe03616d34da4f76653ea0a107-d1e32.png 148w,\n/static/parallel-running-00849fbe03616d34da4f76653ea0a107-c5651.png 295w,\n/static/parallel-running-00849fbe03616d34da4f76653ea0a107-6eb6a.png 547w"\n        sizes="(max-width: 547px) 100vw, 547px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<p>So with that, I push and that’s it!</p>\n<h2>Problems</h2>\n<p>Except it never is.</p>\n<h3>Problem Number 1 - Static Variables</h3>\n<p>The first thing that happens is 7 tests in the same namespace fail with the same error:</p>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/static/nullreference-exception-1-233509de7469615d5ed114cd00fe2c85-82ab5.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block; ; max-width: 590px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 25.832223701731028%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAFCAYAAABFA8wzAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAx0lEQVQY03WOCw+CMAyE9///nG9NVF5KkIewAQKGwc52oDEmNvlyt6bdVWitofWAvu9hjMG7vv2/MmbEOA5fjBD5/YYodBC4B2TJBaqIUaoUSsaQeTy9ZUK9hHoT/JZ5REd0n/A3onmUNHwH67OrrXZtTVQ/WqNtZt+xL+1FvyVUkSFNQkrO5oUJXmjZN9Wn/5w/mqgoXOFRF6TSKoeJNPbhuxtcvB288wq+s7a4pyU8qyvruRfQHCvPOceFVSYM9rj6W9zCM15Ko31p80vLQwAAAABJRU5ErkJggg==\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="Nullreference Exception"\n        title=""\n        src="/static/nullreference-exception-1-233509de7469615d5ed114cd00fe2c85-fb8a0.png"\n        srcset="/static/nullreference-exception-1-233509de7469615d5ed114cd00fe2c85-1a291.png 148w,\n/static/nullreference-exception-1-233509de7469615d5ed114cd00fe2c85-2bc4a.png 295w,\n/static/nullreference-exception-1-233509de7469615d5ed114cd00fe2c85-fb8a0.png 590w,\n/static/nullreference-exception-1-233509de7469615d5ed114cd00fe2c85-82ab5.png 751w"\n        sizes="(max-width: 590px) 100vw, 590px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<p>I then come to the realisation: The tests that have failed are testing what can perhaps be described as <em>not the most up-to-date</em> part of our codebase. In fact, there’s a particular set of static variables that the code under test relies apon.</p>\n<p>In real life, these variables get initialized when the application starts up. In the test world, each test fixture initializes and tears down these static variables - and worse, each test fixture initializes the variables with <em>slightly different values</em>. </p>\n<p>Because the fixtures are now running concurrently, they’re overwriting the variables and it’s causing havoc with the code under test, and the mocked dependencies.</p>\n<p>I have a couple of options to fix this - re-write the code under test to avoid the static variables, or fix the way the variables are initialized during the test runs. Removing the static variables breaks our rule that we shouldn’t be making any changes to the actual code. We’ll do this eventually at some point no doubt, but for now the least risk is to lift the initialization of these variables out of the test fixtures themselves. </p>\n<p>NUnit has a <code class="language-text">[OneTimeSetUp]</code> attribute that denotes a method used to initialize test-fixtures across a whole namespace. We already use this mechanism to alleviate the boilerplate set up of some our “cross-cutting” concerns, like logging. Introducing a new method just for this troublesome namespace allows me to lift the initialization of these static variables into one shared place.</p>\n<div class="gatsby-highlight">\n      <pre class="language-c#"><code class="language-c#">[OneTimeSetUp]\npublic override void TestFixtureSetUp\n{\n    base.TestFixtureSetUp();\n\n    ChannelService.ChatConnectionChatRoomPrefix = DummyChatConnectionChatRoomPrefix;\n    ChannelService.ChatConnectionUserPrefix = DummyChatConnectionUserPrefix;\n}</code></pre>\n      </div>\n<p>I also remove the equivalent code from each of the offending child fixtures, and update the tests/mocks to understand these new constant values. If anything, this does more closely mirror how the code runs in real life.</p>\n<h3>Problem Number 2 - Cross-Cutting Dependencies</h3>\n<p>So I push the previous fix and all of a sudden more problems start occurring.</p>\n<p>In particular, loads of errors like the below:</p>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/static/nullreference-exception-2-b08f6ad7278e791b3b3da23b5cda4768-e402a.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block; ; max-width: 590px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 25.36945812807882%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAFCAYAAABFA8wzAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAA0UlEQVQY021R2Q6CMBDs//+XD+LxYkQBNR4gprSggLcw7i4YSbTJpLszk91Oqs5lgWNmkVqN++2K1/OBp+De4tHBt6+rCnVd/0DlJwN92EDHaxi9hU1CZHYPa0KkJhJwL1yrpaTxcD48pHvU5VIiz4+y9WNoTN+t6HCMqn0d/vhUtPPhTnoI5kP4MwdLb4SlP8KCbu5914E37Tc61QtvSPoYwWxA+gCrYNz6+titXaiyyCgCRzpQTIpoY6obcG2TvegmiaS2hvtYwJzwoof0Fxpvmeh65CzcvB8AAAAASUVORK5CYII=\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="Nullreference Exception"\n        title=""\n        src="/static/nullreference-exception-2-b08f6ad7278e791b3b3da23b5cda4768-fb8a0.png"\n        srcset="/static/nullreference-exception-2-b08f6ad7278e791b3b3da23b5cda4768-1a291.png 148w,\n/static/nullreference-exception-2-b08f6ad7278e791b3b3da23b5cda4768-2bc4a.png 295w,\n/static/nullreference-exception-2-b08f6ad7278e791b3b3da23b5cda4768-fb8a0.png 590w,\n/static/nullreference-exception-2-b08f6ad7278e791b3b3da23b5cda4768-e402a.png 812w"\n        sizes="(max-width: 590px) 100vw, 590px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<p>I come to the second realisation - we have cross-cutting behaviour that’s being mocked out individually in each test fixture. The test fixtures are again overwriting each other’s attempts at this global mocking.</p>\n<p>Just to take a step back for a second:</p>\n<ul>\n<li>Our code models certain cross-cutting concerns via a “service locator” pattern</li>\n<li>The “service locator” is a global static instance. The locator’s implementation can vary, but it’s initialized when the application starts and you just always presume it’s there, and that you can fetch various services from it. So for example I can retrieve an ICatService implementation by going <code class="language-text">var myCatService = ServiceLocator.Instance.GetService&lt;ICatService&gt;()</code></li>\n<li>This is about as awkward as it sounds. We have concrete dependencies on the ServiceLocator.Instance. We have no real control over which instances end up with references to which service implementation.</li>\n<li>We’ve generally removed this pattern, but it is still used in a number of places for obtaining access to our <code class="language-text">ISchedulerService</code> instance. This is pretty much used by anything that wants to schedule a callback - immediately on the threadpool, or as a timed callback etc.</li>\n</ul>\n<p>So we need to make sure this mechanism works when running our tests. This means in each test setup we have to:</p>\n<ol>\n<li>Set the <code class="language-text">ServiceLocator.Instance</code> guy as a stubbed <code class="language-text">IServiceLocator</code> implementation that’ll let us register a <code class="language-text">ISchedulerService</code> instance for retrieval by the code under test</li>\n<li>Register a mock <code class="language-text">ISchedulerService</code> with the stub service locator. We typically set up the <code class="language-text">ISchedulerService</code>’s mocked behaviour as part of this (for instance, simulating the callback). The code under test will then retrieve this instance from the service locator instance.</li>\n</ol>\n<p>You can probably see where the problem is - test fixtures are competing for the mocking of the service locator instance.</p>\n<p>Unfortunately this pattern is in a lot of places in the code, and it’s just not feasible to refactor away from this pattern in one fell swoop.</p>\n<p>To fix this, we somehow need to mock a static instance, but keep how we’ve mocked that instance unique in the context of each parallely running test fixture. This sounds like something thready - but it’s worse than that: we use <code class="language-text">async/await</code> a lot in the code, so tests don’t even necessarily run on their own thread. Rather, they run in their own async execution context.</p>\n<p>At this point I give up and go to the pub.</p>\n<hr>\n<blockquote>\n<p>About 3 pints in and it dawns on me.</p>\n</blockquote>\n<p>The first observation is that I need to stop each test-fixture overwriting the <code class="language-text">ServiceLocator.Instance</code> singleton. This means we need to initialize this guy (with <em>something</em>) once per test project.</p>\n<p>Now - what do we set the global instance as? My second observation is that whatever it is, I need a way for each test fixture to register their own <code class="language-text">ISchedulerService</code> instance with it, and for their code-under-test to see the same instance. So there needs to be a logical affinity between the test-code registering the service instance, and the code-under-test fetching the service instance. And this affinity needs to flow across async control flow.</p>\n<p><code class="language-text">System.Threading.AsyncLocal&lt;T&gt;</code> to the rescue!</p>\n<p>So I come up with this as my new global test fixture setup:</p>\n<div class="gatsby-highlight">\n      <pre class="language-c#"><code class="language-c#">public static readonly AsyncLocal&lt;ISchedulerService&gt; SchedulerServiceAsyncLocal = new AsyncLocal&lt;ISchedulerService&gt;();\n\n[OneTimeSetUp]\npublic virtual void TestFixtureSetUp()\n{\n    var mockServiceLocator = new Mock&lt;IServiceLocator&gt;();\n\n    mockServiceLocator.Setup(sl =&gt; sl.GetObjectOfType&lt;ISchedulerService&gt;())\n        .Returns(() =&gt; SchedulerServiceAsyncLocal.Value);\n\n    ServiceLocator.Instance = mockServiceLocator.Object;\n}</code></pre>\n      </div>\n<p>To clarify:</p>\n<ul>\n<li>I’ve created a global <code class="language-text">AsyncLocal</code> object that all the test fixtures can see and set their own <code class="language-text">ISchedulerService</code> instance on.</li>\n<li>I’ve created a mocked <code class="language-text">ServiceLocator</code> object using <a href="https://github.com/moq/moq4">Moq</a> that will serve requests for <code class="language-text">ISchedulerService</code> instances by fetching the current value from the <code class="language-text">AsyncLocal</code>. This mock <code class="language-text">ServiceLocator</code> is initialized once per test project and shared across all concurrently running test fixtures.</li>\n</ul>\n<p>Each test in a test fixture then registers its mock instance a la:</p>\n<div class="gatsby-highlight">\n      <pre class="language-c#"><code class="language-c#">var mockSchedulerService = new Mock&lt;ISchedulerService&gt;();\nSetUpFixture.SchedulerServiceAsyncLocal.Value = mockSchedulerService.Object;</code></pre>\n      </div>\n<p>This means that:</p>\n<ul>\n<li>Each test can fiddle about with their own ISchedulerService mock instance, isolated from tests in other fixtures</li>\n<li>All code under test (running in the same async execution flow) will get the same instance as the corresponding set up code registered.</li>\n</ul>\n<p>So we have the exact same static-mocking behaviour as before, but our test fixtures can run in parallel!</p>\n<blockquote>\n<p>I’m actually strangely pleased with myself that I came up with this</p>\n</blockquote>\n<h2>Concluding</h2>\n<p>So anyway, after that change all the tests started reliably passing. I don’t think the problems we found were actually too bad on a codebase of our size. Work to resolve the static references in the older bits of our codebase continues.</p>\n<p>And now our build timings:</p>\n<ul>\n<li>Unit tests - 1:44 (this actually isn’t any faster than our result from the <a href="../improving-our-ci-tests">first blog post</a>, as predicted. Though this is a couple of weeks later, and we do have a few more tests now)</li>\n<li>Behaviour tests - 1:36 (trimmed a minute off here - there’s more of an uneven distribution of tests between projects in this step)</li>\n</ul>\n<p>And running from Resharper is now faster than lightning!</p>',frontmatter:{title:"Parallelizing our CI tests",date:"July 05, 2018",author:{id:"Ben Osborne",bio:"Craft beer and cats.",avatar:{childImageSharp:{resolutions:{tracedSVG:"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60' version='1'%3E%3Crect width='100%25' height='100%25' fill='%23f6f2f8'/%3E%3Cpath d='M16 2c0 9 1 15 7 21l3 4c0 2-1 4-3 4-5 0-13 4-17 7-3 4-3 4-4 11 0 11-2 11 29 11 30 0 28 0 28-11-1-6-1-7-4-11-4-3-12-7-17-7-2 0-3-2-3-4l3-4c6-6 7-12 7-21 0-2 0-2-14-2-15 0-15 0-15 2M0 51l1 3v-7l-1 4' fill='%23e0d6eb' fill-rule='evenodd'/%3E%3C/svg%3E",width:40,height:40,src:"/static/default-788e71c2bb40c6a516ea06e9a06387eb-bad24.png",srcSet:"/static/default-788e71c2bb40c6a516ea06e9a06387eb-bad24.png 1x"}}}}}}},pathContext:{slug:"parallelizing-our-ci-tests",previous:{fields:{slug:"mixin-that-memory-leak"},frontmatter:{title:"Mixin that memory leak"}},next:{fields:{slug:"getting-started-with-python-and-the-mindlink-api"},frontmatter:{title:"Getting started with Python and the MindLink API."}}}}}});
//# sourceMappingURL=path---parallelizing-our-ci-tests-12443dae833d0661bfa6.js.map