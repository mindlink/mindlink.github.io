webpackJsonp([0x9f7c8fb0c6f],{527:function(n,s){n.exports={data:{site:{siteMetadata:{title:"Engineering at MindLink"}},markdownRemark:{id:"/Applications/TfsBuildAgent/_work/7/s/src/pages/18-05-18-rasa/index.md absPath of file >>> MarkdownRemark",html:'<p>In this post we will explain and demonstrate how to leverage <a href="https://rasa.com/">Rasa</a> to develop intelligent chatbots and securely deploy them on premise. Chatbots are one of the most direct ways to integrate with existing chat platforms. Whether you require a simple bot that replies to specific queries by fetching some information, or a more complex NPL-powered interactive agent, chatbots provide a way to integrate external services and functions into the collaboration experience of the chat platform users.</p>\n<h2>Chatbot development since 2016</h2>\n<p>Modern chatbot development for the most part leverages the capabilities of cloud APIs such as Microsoft <a href="https://azure.microsoft.com/en-gb/services/cognitive-services/language-understanding-intelligent-service/">LUIS</a> and Google <a href="https://dialogflow.com/">DialogFlow</a> that tend to abstract away from the developer most of the underlying complexities of natural language understanding and response selection tasks. This makes developing chatbot integration significantly easier than it would have been previously, where either more rudimentary approaches where necessary or intelligent chatbot development was significantly harder. This unfortunately means that this useful level of abstraction is unavailable to enterprise environments that have strict compliance or security requirements.</p>\n<p>The use of cloud APIs that can read and store the information exchanged can lead to sensitive information being leaked to unintended parties, as well as not being as easlily traceable and archivable for compliance purposes. This means that many existing chatbot integrations that use these APIs are unsuitable for use on premise, and in-house development teams are prevented from using them as well. In order to achieve the same rich user experience talking to intelligent chatbots the in-house team has a lot more work to do, which may make these integrations unreasonably complex and time consuming to develop.</p>\n<h2>Enter Rasa</h2>\n<p>Rasa is the only natural language understanding and chatbot development API that is open source. The API itself can be deployed on premise in a controlled environment, with each message becoming easily traceable and subject to the same security constrains as any other message exchanged over the chat system. By using Rasa it becomes relatively easy to analyse natural language messages sent by chat users for intent categorisation and to build intelligent integrations with external systems.</p>\n<p>We’re now going to take a look at a very simple bot built through Rasa and how to connect it to the MindLink API.</p>\n<h2>The interesting bit</h2>\n<p>For this example we’re going to use one of the tutorials for Rasa Core, and implement a simple group-listening bot connection to MindLink that will read all messages sent in a particular chatroom and reply with some information. It should be possible to resuse the connection code for other bots in the same manner as it is used here. We’ll implement the whole thing in Python as that is the simplest way to write bots against Rasa, but mutatis mutandis you should be able to re-implement the connection in your favorite language. Similarly to how the MindLink API works, you can setup the Rasa API as a REST service and use any language.</p>\n<p>I’m going to assume you have Rasa Core installed locally, and you have your local Python environment setup (I’m assuming Python3, but the connection code is relatively straightforward and should not be too hard to port to Python2).</p>\n<h3>The anathomy of an intelligent chat bot</h3>\n<p>There are two independent pieces of a Rasa bot: an “interpreter” or intent-extractor and a dialogue model. The first is a mechanism to “parse” natural language input and extract the user intent, then feed this to the dialogue model together with raw natural language input. It is trained over a set of pre-classified data, and uses this training to classify new inputs. Similarly, the dialogue model is built from a set of response templates, actions and the same intents recognized by the interpreter. It is also trained over sample dialogues that represent possible conversations.</p>\n<p>Both modular pieces are implemented in a “data-driven” fashion: to develop an intelligent chatbot a significant amount of training data is required for both the intent extractor and the dialogue model. Interactive training modes, where you basically have a dialogue with the interpreter/dialogue model and give it feedback allowing it to adjust its responses, are available out of the box. Both components are also independent from each other (you can use alternative dialogue models/intent extractor with them) and allow very fine tuning of the resulting trained models (if you know what you’re doing). Again, compelling chatbots are always the product of repeated training over a significant body of data. Depending on the application, there may be large data sets already publically available (e.g. healthcare etc).</p>\n<h3>Great, but how do I actually put these together?</h3>\n<p>Let’s focus on the intent extractor first. We’ll define a set of intents in a markdown file with some initial associated data: <code class="language-text">intents.md</code>. This is the file that basically defines how the intent extractor is going to interpret the input<sup id="fnref-1"><a href="#fn-1" class="footnote-ref">1</a></sup>.</p>\n<div class="gatsby-highlight">\n      <pre class="language-markdown"><code class="language-markdown"><span class="token title important"><span class="token punctuation">##</span> intent:greet</span>\n<span class="token list punctuation">-</span> hey\n<span class="token list punctuation">-</span> hello\n<span class="token list punctuation">-</span> hi\n\n<span class="token title important"><span class="token punctuation">##</span> intent:goodbye</span>\n<span class="token list punctuation">-</span> bye\n<span class="token list punctuation">-</span> goodbye\n\n<span class="token title important"><span class="token punctuation">##</span> intent:mood_affirm</span>\n<span class="token list punctuation">-</span> yes\n<span class="token list punctuation">-</span> correct\n\n<span class="token title important"><span class="token punctuation">##</span> intent:mood_deny</span>\n<span class="token list punctuation">-</span> no\n<span class="token list punctuation">-</span> nope\n\n<span class="token title important"><span class="token punctuation">##</span> intent:mood_great</span>\n<span class="token list punctuation">-</span> very good\n<span class="token list punctuation">-</span> great\n<span class="token list punctuation">-</span> amazing\n<span class="token list punctuation">-</span> happy\n\n<span class="token title important"><span class="token punctuation">##</span> intent:mood_unhappy</span>\n<span class="token list punctuation">-</span> I am sad\n<span class="token list punctuation">-</span> super sad\n<span class="token list punctuation">-</span> sad\n<span class="token list punctuation">-</span> very sad\n<span class="token list punctuation">-</span> unhappy\n<span class="token list punctuation">-</span> so saad\n<span class="token list punctuation">-</span> so sad</code></pre>\n      </div>\n<p>Secondly, we’ll need two separate files for the dialogue model, one to define the things it recognizes and the actions it can take, and another with example conversations that exemplify when to take an action. First we define a domain: <code class="language-text">domain.yml</code>.</p>\n<div class="gatsby-highlight">\n      <pre class="language-yml"><code class="language-yml">intents:\n  - greet\n  - goodbye\n  - mood_affirm\n  - mood_deny\n  - mood_great\n  - mood_unhappy\n\nactions:\n- utter_greet\n- utter_cheer_up\n- utter_did_that_help\n- utter_happy\n- utter_goodbye\n\ntemplates:\n  utter_greet:\n  - text: &quot;Hey! How are you?&quot;\n    buttons:\n    - title: &quot;great&quot;\n      payload: &quot;great&quot;\n    - title: &quot;super sad&quot;\n      payload: &quot;super sad&quot;\n\n  utter_cheer_up:\n  - text: &quot;Here is something to cheer you up:&quot;\n    image: &quot;https://i.imgur.com/nGF1K8f.jpg&quot;\n\n  utter_did_that_help:\n  - text: &quot;Did that help you?&quot;\n  - text: &quot;Was that helpful?&quot;\n\n  utter_happy:\n  - text: &quot;Great carry on!&quot;\n\n  utter_goodbye:\n  - text: &quot;Bye&quot;</code></pre>\n      </div>\n<p>As you can see the domain also contains the response templates the bot can respond with.\nThen we define sample conversations <code class="language-text">stories.md</code>:</p>\n<div class="gatsby-highlight">\n      <pre class="language-markdown"><code class="language-markdown"><span class="token title important"><span class="token punctuation">##</span> happy path               </span><span class="token comment">&lt;!-- name of the story - just for debugging --></span>\n<span class="token list punctuation">*</span> greet\n  <span class="token list punctuation">-</span> utter_greet\n<span class="token list punctuation">*</span> mood_great               <span class="token comment">&lt;!-- user utterance, in format _intent[entities] --></span>\n  <span class="token list punctuation">-</span> utter_happy\n\n<span class="token title important"><span class="token punctuation">##</span> sad path 1               </span><span class="token comment">&lt;!-- this is already the start of the next story --></span>\n<span class="token list punctuation">*</span> greet\n  <span class="token list punctuation">-</span> utter_greet             <span class="token comment">&lt;!-- action of the bot to execute --></span>\n<span class="token list punctuation">*</span> mood_unhappy\n  <span class="token list punctuation">-</span> utter<span class="token italic"><span class="token punctuation">_</span>cheer<span class="token punctuation">_</span></span>up\n  <span class="token list punctuation">-</span> utter<span class="token italic"><span class="token punctuation">_</span>did<span class="token punctuation">_</span></span>that_help\n<span class="token list punctuation">*</span> mood_affirm\n  <span class="token list punctuation">-</span> utter_happy\n\n<span class="token title important"><span class="token punctuation">##</span> sad path 2</span>\n<span class="token list punctuation">*</span> greet\n  <span class="token list punctuation">-</span> utter_greet\n<span class="token list punctuation">*</span> mood_unhappy\n  <span class="token list punctuation">-</span> utter<span class="token italic"><span class="token punctuation">_</span>cheer<span class="token punctuation">_</span></span>up\n  <span class="token list punctuation">-</span> utter<span class="token italic"><span class="token punctuation">_</span>did<span class="token punctuation">_</span></span>that_help\n<span class="token list punctuation">*</span> mood_deny\n  <span class="token list punctuation">-</span> utter_goodbye\n\n<span class="token title important"><span class="token punctuation">##</span> say goodbye</span>\n<span class="token list punctuation">*</span> goodbye\n  <span class="token list punctuation">-</span> utter_goodbye\n\n<span class="token title important"><span class="token punctuation">##</span> no greeting happy</span>\n<span class="token list punctuation">*</span> mood_great\n  <span class="token list punctuation">-</span> utter_happy\n\n<span class="token title important"><span class="token punctuation">##</span> no greeting sad</span>\n<span class="token list punctuation">*</span> mood_unhappy\n  <span class="token list punctuation">-</span> utter<span class="token italic"><span class="token punctuation">_</span>cheer<span class="token punctuation">_</span></span>up\n  <span class="token list punctuation">-</span> utter<span class="token italic"><span class="token punctuation">_</span>did<span class="token punctuation">_</span></span>that_help</code></pre>\n      </div>\n<p>Each story is an independent example of a complete conversation. As you can see, the dialogue model doesn’t understand natural language, it undertstands intents. So the raw input needs to be piped through the intent extractor and then into the dialogue model.</p>\n<p>Now that we’ve defined our data in files we need to train (“compile” if you like) the actual models from the data. You can use config files or pass additional parameters to the python scripts:</p>\n<p>nlu_config.json</p>\n<div class="gatsby-highlight">\n      <pre class="language-json"><code class="language-json"><span class="token punctuation">{</span>\n  <span class="token property">"pipeline"</span><span class="token operator">:</span> <span class="token string">"spacy_sklearn"</span><span class="token punctuation">,</span>\n  <span class="token property">"path"</span> <span class="token operator">:</span> <span class="token string">"./models/interpreter"</span><span class="token punctuation">,</span>\n  <span class="token property">"data"</span> <span class="token operator">:</span> <span class="token string">"./data/intents.md"</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Training the intent extractor:</p>\n<p><code class="language-text">python -m rasa_nlu.train -c nlu_config.json --fixed_model_name current</code></p>\n<p>Training the dialogue model:</p>\n<p><code class="language-text">python -m rasa_core.train -s data/stories.md -d domain.yml -o models/dialogue --epochs 300</code></p>\n<p>Hopefully, you’ve got a working bot at this point. You can talk to it over the command line<sup id="fnref-2"><a href="#fn-2" class="footnote-ref">2</a></sup>:</p>\n<p><code class="language-text">python -m rasa_core.run -d models/dialogue -u models/interpeter/default/current</code></p>\n<p>Now we are ready to wire this up to the MindLink API.</p>\n<h3>A simple Python MindLink API connection</h3>\n<p>We’re going to define a simple API connection class. This class will be responsible for interfacing with MindLink, relaying messages received to a consumer (which will be the bot in our example) and allowing for sending messages.</p>\n<div class="gatsby-highlight">\n      <pre class="language-python"><code class="language-python"><span class="token keyword">class</span> <span class="token class-name">ApiConnection</span><span class="token punctuation">:</span>\n    <span class="token keyword">def</span> <span class="token function">authenticate</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>\n        requestUrl <span class="token operator">=</span> <span class="token string">\'{}/Authentication/V1/Tokens\'</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>host<span class="token punctuation">)</span>\n\n        response <span class="token operator">=</span> requests<span class="token punctuation">.</span>post<span class="token punctuation">(</span>\n            requestUrl<span class="token punctuation">,</span>\n            json <span class="token operator">=</span> <span class="token punctuation">{</span>\n                <span class="token string">\'Username\'</span><span class="token punctuation">:</span> self<span class="token punctuation">.</span>username<span class="token punctuation">,</span>\n                <span class="token string">\'Password\'</span><span class="token punctuation">:</span> self<span class="token punctuation">.</span>password<span class="token punctuation">,</span>\n                <span class="token string">\'AgentId\'</span><span class="token punctuation">:</span> self<span class="token punctuation">.</span>agent\n            <span class="token punctuation">}</span><span class="token punctuation">,</span>\n            headers <span class="token operator">=</span> self<span class="token punctuation">.</span>RequestHeaders<span class="token punctuation">)</span>\n\n        self<span class="token punctuation">.</span>token <span class="token operator">=</span> response<span class="token punctuation">.</span>json<span class="token punctuation">(</span><span class="token punctuation">)</span>\n\n        <span class="token keyword">return</span> self<span class="token punctuation">.</span>token\n\n    <span class="token keyword">def</span> <span class="token function">getMessages</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> channelId<span class="token punctuation">,</span> count<span class="token punctuation">)</span><span class="token punctuation">:</span>\n        requestUrl <span class="token operator">=</span> <span class="token string">\'{}/Collaboration/V1/Channels/{}/Messages\'</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>host<span class="token punctuation">,</span> channelId<span class="token punctuation">)</span>\n\n        parameters <span class="token operator">=</span> <span class="token punctuation">{</span>\n            <span class="token string">\'take\'</span><span class="token punctuation">:</span> count<span class="token punctuation">,</span>\n        <span class="token punctuation">}</span>\n\n        response <span class="token operator">=</span> requests<span class="token punctuation">.</span>get<span class="token punctuation">(</span>\n            requestUrl<span class="token punctuation">,</span>\n            params <span class="token operator">=</span> parameters<span class="token punctuation">,</span>\n            headers <span class="token operator">=</span> <span class="token punctuation">{</span>\n                <span class="token string">\'Accept\'</span> <span class="token punctuation">:</span> <span class="token string">\'application/json\'</span><span class="token punctuation">,</span>\n                <span class="token string">\'Authorization\'</span><span class="token punctuation">:</span> <span class="token string">\'FCF {}\'</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>token<span class="token punctuation">)</span><span class="token punctuation">}</span>\n            <span class="token punctuation">)</span>\n\n        <span class="token keyword">return</span> response<span class="token punctuation">.</span>json<span class="token punctuation">(</span><span class="token punctuation">)</span>\n\n    <span class="token keyword">def</span> <span class="token function">sendMessage</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> channelId<span class="token punctuation">,</span> message<span class="token punctuation">)</span><span class="token punctuation">:</span>\n        requestUrl <span class="token operator">=</span> <span class="token string">\'{}/Collaboration/V1/Channels/{}/Messages\'</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>host<span class="token punctuation">,</span> channelId<span class="token punctuation">)</span>\n\n        response <span class="token operator">=</span> requests<span class="token punctuation">.</span>post<span class="token punctuation">(</span>\n            requestUrl<span class="token punctuation">,</span>\n            json <span class="token operator">=</span> <span class="token punctuation">{</span>\n                <span class="token string">\'Text\'</span><span class="token punctuation">:</span> json<span class="token punctuation">.</span>dumps<span class="token punctuation">(</span>message<span class="token punctuation">)</span><span class="token punctuation">,</span>\n                <span class="token string">\'IsAlert\'</span><span class="token punctuation">:</span> <span class="token boolean">False</span>\n            <span class="token punctuation">}</span><span class="token punctuation">,</span>\n            headers <span class="token operator">=</span> <span class="token punctuation">{</span>\n                <span class="token string">\'Accept\'</span> <span class="token punctuation">:</span> <span class="token string">\'application/json\'</span><span class="token punctuation">,</span>\n                <span class="token string">\'Authorization\'</span><span class="token punctuation">:</span> <span class="token string">\'FCF {}\'</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>token<span class="token punctuation">)</span><span class="token punctuation">}</span>\n            <span class="token punctuation">)</span>\n\n        <span class="token keyword">if</span> response<span class="token punctuation">.</span>status_code <span class="token operator">!=</span> <span class="token number">200</span><span class="token punctuation">:</span>\n            <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">\'Failed to send message to channel\'</span><span class="token punctuation">,</span> channelId<span class="token punctuation">)</span>\n\n    <span class="token keyword">def</span> <span class="token function">_getEvents</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> channelId<span class="token punctuation">,</span> callback<span class="token punctuation">)</span><span class="token punctuation">:</span>\n        self<span class="token punctuation">.</span>running <span class="token operator">=</span> <span class="token boolean">True</span>\n\n        <span class="token keyword">while</span> self<span class="token punctuation">.</span>running<span class="token punctuation">:</span>\n            requestUrl <span class="token operator">=</span> <span class="token string">\'{}/Collaboration/V1/Events\'</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>host<span class="token punctuation">)</span>\n\n            parameters <span class="token operator">=</span> <span class="token punctuation">{</span>\n                <span class="token string">\'last-event\'</span><span class="token punctuation">:</span> self<span class="token punctuation">.</span>last_event<span class="token punctuation">,</span>\n                <span class="token string">\'types\'</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">\'message\'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n                <span class="token string">\'channels\'</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>channelId<span class="token punctuation">]</span><span class="token punctuation">,</span>\n                <span class="token string">\'regex\'</span><span class="token punctuation">:</span> <span class="token string">\'\'</span><span class="token punctuation">,</span>\n                <span class="token string">\'origins\'</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">\'remote\'</span><span class="token punctuation">]</span>\n            <span class="token punctuation">}</span>\n\n            response <span class="token operator">=</span> requests<span class="token punctuation">.</span>get<span class="token punctuation">(</span>\n                requestUrl<span class="token punctuation">,</span>\n                params <span class="token operator">=</span> parameters<span class="token punctuation">,</span>\n                headers <span class="token operator">=</span> <span class="token punctuation">{</span>\n                    <span class="token string">\'Accept\'</span> <span class="token punctuation">:</span> <span class="token string">\'application/json\'</span><span class="token punctuation">,</span>\n                    <span class="token string">\'Authorization\'</span><span class="token punctuation">:</span> <span class="token string">\'FCF {}\'</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>token<span class="token punctuation">)</span>\n                    <span class="token punctuation">}</span><span class="token punctuation">)</span>\n\n            <span class="token keyword">if</span> response<span class="token punctuation">.</span>status_code <span class="token operator">!=</span> <span class="token number">200</span><span class="token punctuation">:</span>\n                <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">\'Failed to get new messages from channel\'</span><span class="token punctuation">,</span> channelId<span class="token punctuation">)</span>\n                <span class="token keyword">continue</span>\n\n            <span class="token keyword">for</span> event <span class="token keyword">in</span> response<span class="token punctuation">.</span>json<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>\n                eventId <span class="token operator">=</span> event<span class="token punctuation">[</span><span class="token string">\'EventId\'</span><span class="token punctuation">]</span>\n                <span class="token keyword">if</span> <span class="token punctuation">(</span>eventId <span class="token operator">></span> self<span class="token punctuation">.</span>last_event<span class="token punctuation">)</span><span class="token punctuation">:</span>\n                    self<span class="token punctuation">.</span>last_event <span class="token operator">=</span> eventId\n\n                <span class="token keyword">if</span> <span class="token punctuation">(</span>event<span class="token punctuation">[</span><span class="token string">\'Sender\'</span><span class="token punctuation">]</span> <span class="token operator">!=</span> self<span class="token punctuation">.</span>localUserId<span class="token punctuation">)</span><span class="token punctuation">:</span>\n                    message <span class="token operator">=</span> Message<span class="token punctuation">(</span>event<span class="token punctuation">[</span><span class="token string">\'Sender\'</span><span class="token punctuation">]</span><span class="token punctuation">,</span> event<span class="token punctuation">[</span><span class="token string">\'Content\'</span><span class="token punctuation">]</span><span class="token punctuation">,</span> event<span class="token punctuation">[</span><span class="token string">\'Time\'</span><span class="token punctuation">]</span><span class="token punctuation">,</span> event<span class="token punctuation">[</span><span class="token string">\'ChannelId\'</span><span class="token punctuation">]</span><span class="token punctuation">)</span>\n                    callback<span class="token punctuation">(</span>message<span class="token punctuation">)</span>\n\n    <span class="token keyword">def</span> <span class="token function">startStreaming</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> channelId<span class="token punctuation">,</span> callback<span class="token punctuation">)</span><span class="token punctuation">:</span>\n        self<span class="token punctuation">.</span>requestThread <span class="token operator">=</span> threading<span class="token punctuation">.</span>Thread<span class="token punctuation">(</span>target<span class="token operator">=</span>self<span class="token punctuation">.</span>_getEvents<span class="token punctuation">,</span> args <span class="token operator">=</span> <span class="token punctuation">(</span>channelId<span class="token punctuation">,</span> callback<span class="token punctuation">)</span><span class="token punctuation">)</span>\n        self<span class="token punctuation">.</span>requestThread<span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span>\n\n    <span class="token keyword">def</span> <span class="token function">stopStreaming</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>\n        self<span class="token punctuation">.</span>running <span class="token operator">=</span> <span class="token boolean">False</span></code></pre>\n      </div>\n<h4>What’s all this?</h4>\n<p>Let’s breakdown the methods on by one. First off, the <code class="language-text">authenticate</code> should be relatively self-explanatory, it makes a request to the authentication endpoint of the MindLink API in order to log on an agent. It’s going to keep a hold of the received token and send it back with each subsequent request (this needs to be renewed if it expires).</p>\n<p>The <code class="language-text">getMessages</code> method is going to read a certain number of messages from the messages endpoint for a specific channel. Similarly with the <code class="language-text">sendMessage</code> method.</p>\n<p>Then we get to the more complicated bits: <code class="language-text">_getEvents</code> is a perpetually running method that repeatedly makes get requests to the events endpoint of the API, fetching new events for a given channel ID. This method is invoked from the public <code class="language-text">startStreaming</code> method on a separate thread, and will keep that thread running forever until the <code class="language-text">stopStreaming</code> method is invoked. As you can see, what happens with each event received is not defined by this class, but needs to be forwarded by the caller in the form of a callback.</p>\n<p>Now that we’ve covered the core connection code, we’ll build a basic example of how to use it.</p>\n<h3>MindLink + Rasa</h3>\n<p>Let’s make a python script entry point file, this is the actual sauce that feeds the message content to the bot and posts back a respone:</p>\n<div class="gatsby-highlight">\n      <pre class="language-python"><code class="language-python"><span class="token keyword">def</span> <span class="token function">handleMessage</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span><span class="token punctuation">:</span>\n    response <span class="token operator">=</span> agent<span class="token punctuation">.</span>handle_message<span class="token punctuation">(</span>message<span class="token punctuation">.</span>content<span class="token punctuation">)</span>\n    connection<span class="token punctuation">.</span>sendMessage<span class="token punctuation">(</span>channelId<span class="token punctuation">,</span> response<span class="token punctuation">)</span>\n\n<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">"__main__"</span><span class="token punctuation">:</span>\n    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">\'Loading Rasa agent (this may take a while).\'</span><span class="token punctuation">)</span>\n    agent <span class="token operator">=</span> Agent<span class="token punctuation">.</span>load<span class="token punctuation">(</span>dialogue_model<span class="token punctuation">,</span> interpreter_model<span class="token punctuation">)</span>\n\n    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">\'Creating connection to MindLink.\'</span><span class="token punctuation">)</span>\n    connection <span class="token operator">=</span> ApiConnection<span class="token punctuation">(</span>\n        u<span class="token string">\'http://localhost:8081\'</span><span class="token punctuation">,</span>\n        u<span class="token string">\'userdomain\\\\moodbot\'</span><span class="token punctuation">,</span>\n        u<span class="token string">\'some password\'</span><span class="token punctuation">,</span>\n        u<span class="token string">\'moodbot_agent\'</span><span class="token punctuation">,</span>\n        u<span class="token string">\'contact:moodbot@userdomain.local\'</span><span class="token punctuation">)</span>\n\n    connection<span class="token punctuation">.</span>authenticate<span class="token punctuation">(</span><span class="token punctuation">)</span>\n\n    connection<span class="token punctuation">.</span>startStreaming<span class="token punctuation">(</span>\n        channelId<span class="token punctuation">,</span>\n        <span class="token keyword">lambda</span> _<span class="token punctuation">,</span> message<span class="token punctuation">:</span> handleMessage<span class="token punctuation">(</span>message<span class="token punctuation">)</span><span class="token punctuation">)</span>\n\n    <span class="token builtin">input</span><span class="token punctuation">(</span><span class="token string">\'Type anything to stop.\\r\\n\'</span><span class="token punctuation">)</span>\n    connection<span class="token punctuation">.</span>stopStreaming<span class="token punctuation">(</span><span class="token punctuation">)</span></code></pre>\n      </div>\n<p>This will “start” the API connection on a given channel, with some preconfigured agent settings and a given channel ID (in a real application these may be passed as command line arguments, read from file etc). For each message received in the channel, this will be forwarded to the Rasa bot and the response will be sent back to the channel.</p>\n<h2>Conclusion</h2>\n<p>We covered a fair amount of ground in this post, explaining why Rasa is interesting for enterprise development, touching on core Rasa bot development concepts and demonstrating a basic way to wire everything up the MindLink API.</p>\n<div class="footnotes">\n<hr>\n<ol>\n<li id="fn-1">\n<p>This is a condensed version of <a href="https://core.rasa.com/tutorial_basics.html">this short tutorial</a>.</p>\n<a href="#fnref-1" class="footnote-backref">↩</a>\n</li>\n<li id="fn-2">\n<p>Note that we’re using extremely limited sample data here, the classification and response selection performance is almost certainly going to be disappointing. A lot of data is necessary before satisfactory performance is achieved.</p>\n<a href="#fnref-2" class="footnote-backref">↩</a>\n</li>\n</ol>\n</div>',
frontmatter:{title:"Leveraging Rasa to build on-premise intelligent chat bots",date:"May 18, 2018",author:{id:"Niccolo Terreri",bio:"Niccolo has a cat named Nosey who is true to her name. www.niccoloterreri.com",avatar:{childImageSharp:{resolutions:{tracedSVG:"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60' version='1'%3E%3Crect width='100%25' height='100%25' fill='%23f6f2f8'/%3E%3Cpath d='M24 4l-1 4-1-3-1-3H0v6c0 3 0 5 1 4 1-2 7-3 7-1H7l-3 1-2 1v3l-1 3-1 12v12l5-1c4 0 4 0 4 2v2h1l2-3h1c0 3 15 2 16-2l2-1 1 1-1 6-1 4 1-3 2-6c0-3 0-3 1-1s4 5 9 7c7 3 8 3 9-1 2-3 0-4-8-4-2 0-3 0-2-1l1-1h3c3-1 3-2 3-4 0-3-1-4-7-4s-7-1-7-3l1-3 1 2c0 3 0 3 3 2 3-2 2-9-2-9l-1-1 6-1c7-1 7-2 4-6-1-2-3-2-6-2l-7-1 3-1c3 0 3 0 3-4-1-4-1-4-6-4l-7-1c-1 0-2 0-3 3m19-2v8l1-1h7c3 1 6-3 5-5s-9-4-13-2m16 1v5c1 2 1-2 1-5-1-2-1-2-1 0m-6 9c-3 2 1 8 5 8 2 0 2-1 2-4s0-4-2-4l-3-1-2 1m-36 1l-1 2-1 1-1 2c-1 1 0 2 2 2 4 0 5 1 5 3s-7 3-7 1h-1v3l1 2c-2 2 0 5 2 4h2l2-2c1-2 1-2 1 0s1 3 3 0h1l2 2 2 2v3l1-3 2-2 1-5c0-4-1-6-2-3-1 2-6 2-7 1l1-3c0-2 6-3 7-1h1l-1-2v-1c3 0 1-2-5-4-6-3-8-3-10-2m28 11c-2 1-1 4 1 5 1 2 6 2 8 1l3-1c2 0 2-1 2-3 0-1 0-2-1-1l-1-1c1-1-11-2-12 0m7 10l-1 3 1 3 5 1c3 0 3 0 3-4 0-3-1-4-3-4l-5 1m-36 2c0 3 10 4 11 1l-1-1H16m38 11c0 3 1 4 3 4 3 0 3 0 3-3 0-4 0-4-3-4s-3 0-3 3m0 7l2 2 1 2 2 2 1-3c0-4 0-4-3-4l-3 1' fill='%23e0d6eb' fill-rule='evenodd'/%3E%3C/svg%3E",width:60,height:60,src:"/static/niccolo-26a188bd01f250cfcc08e18338c308e7-454f9.jpg",srcSet:"/static/niccolo-26a188bd01f250cfcc08e18338c308e7-454f9.jpg 1x,\n/static/niccolo-26a188bd01f250cfcc08e18338c308e7-f8c68.jpg 1.5x,\n/static/niccolo-26a188bd01f250cfcc08e18338c308e7-d364e.jpg 2x,\n/static/niccolo-26a188bd01f250cfcc08e18338c308e7-e5a4b.jpg 3x"}}}}}}},pathContext:{slug:"leveraging-rasa-to-build-on-premise-intelligent-chat-bots",previous:{fields:{slug:"why-draftjs-doesnt-work-on-android"},frontmatter:{title:"Why DraftJS doesn't work on Android"}},next:{fields:{slug:"custom-content-in-a-skype-for-business-conversation"},frontmatter:{title:"Custom content in a Skype for Business conversation"}}}}}});
//# sourceMappingURL=path---leveraging-rasa-to-build-on-premise-intelligent-chat-bots-b2c2f5228625308d7484.js.map