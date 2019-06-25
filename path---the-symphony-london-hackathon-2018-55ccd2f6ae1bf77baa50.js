webpackJsonp([0xa19dba254622],{542:function(e,t){e.exports={data:{site:{siteMetadata:{title:"Engineering at MindLink"}},markdownRemark:{id:"/Applications/AzureDevOpsAgent/_work/13/s/src/pages/18-10-01-symphony-hackathon-review/index.md absPath of file >>> MarkdownRemark",html:'<p>MindLink entered it’s first hackathon and placed second with the Town Hall bot. This post is a brief review of how it went!</p>\n<h2>TL;DR</h2>\n<ul>\n<li>MindLink entered the Symphony London Hackathon September 2018 and we placed second with Town Hall Bot!</li>\n<li>We had fun, learned a lot about Symphony and made a complex bot to improve transparency and company-wide relationships</li>\n</ul>\n<h2>The idea</h2>\n<p>This is the first hackathon MindLink has entered, after our success hopefully it won’t be our last!</p>\n<p>If you’re not familiar with Symphony as a platform, I suggest you go and check it out at <a href="https://www.symphony.com">https://www.symphony.com</a>, in the most basic description it’s a secure real-time messaging platform that supports 1-1, multiparty and chat room messaging. There’s much more to it than that, but it sets the scene!</p>\n<p>Symphony has many APIs available, but we wanted to focus on user experience and that boils down to two main APIs:</p>\n<ul>\n<li>Bot => a back-end application that can send and receive messages in 1-1, multiparty and chat room conversations,</li>\n<li>Client extension => a website that is embedded within the Symphony UX and can directly communicate with parts of the UX</li>\n</ul>\n<p>We wanted to incorporate both of these APIs in some form and tie them together for a unique and seamless user experience. We will cover the specifics of how we managed to tie them together in another post.</p>\n<p>MindLink has a lot of ideas from a long history in the collaboration and messaging space, but we kept coming back to the idea of a “Town Hall Bot”.</p>\n<p>Town Hall meetings are fundamentally about transparency, whether that’s within a company or with its shareholders. The larger a company gets the more silos form, the harder it is for everybody to move in the same direction. Town Halls are all about breaking down those barriers to keep everybody on the same page, that’s broadly applicable to every part of a company and so has a huge potential for positive business impact.</p>\n<h2>The hackathon</h2>\n<p>The hackathon itself was held at the BNP Paribas offices in Harewood Avenue, London. As can be expected from a banking group the offices are modern, professional and big! A large open atrium space was assigned for the hackathon and there were about 9 teams and 50 attendees including the Symphony cohort. Everbody from Symphony was welcoming, approachable and encouraging - exactly what you need for an event like this!</p>\n<p>Having never been to a hackathon before we were apprehensive, we knew we had the ideas and the expertise, but could we deliver in the time?!</p>\n<p>For the most part the day was spent with the MindLink team (myself, Dimitri Fadda and Jamie Matthews) diligently working away, making sure we kept regularly in sync. Our approach was simple - get a minimum viable product and then build upon its feature set. We didn’t break for lunch, but enjoyed the <strong>really good</strong> sandwiches put on for the event while continuing to develop the bot. </p>\n<p>We were in a good place for most of the event, until the last hour and a half - that’s when everything is supposed to come together and work beautifully and it didn’t!</p>\n<p>Unfortunately we had an issue with a set of features that relied on sending IMs to users to notify them when their Town Hall questions are answered, we frantically tried to figure out the problem but ended up having to remove the feature on the day, which was disappointing.</p>\n<h2>The presentation</h2>\n<p>Having successfully created the bot and client extension it was up to me to present the idea to the room and make a compelling story. As we were down to the wire for implementation we didn’t spend a lot of time preparing a slide deck or rehearsing so I wasn’t feeling all the confident having seen other polished presentations.</p>\n<p>Fortunately the concept is relatable to almost anybody, so to tell a story about the impact of the idea isn’t the hard part, however the technical presentation wasn’t flawless. I predicted that PowerPoint would try to extend the display of the laptop and thus make it harder to then do a live demo so I turned off that “automatically extend my display” setting, only to find that didn’t work and the display was extended anyway :( So I had to flail around moving windows to the extended display so everyone could see => that’s not slick and despite my best effort to continue talking, not a great experience!</p>\n<p>All in all the presentation went OK, everything worked that should have worked and the audience didn’t look bewildered or bored afterward!</p>\n<h2>Grand finale</h2>\n<p>MindLink entered the hackathon to get some more exposure to the Symphony APIs and strengthen our relationship with Symphony, but I am also competitive so there was also a part of me vying to win one of the categories ;)</p>\n<p>We were up against some strong competition, everybody produced something that addressed a real need in a business area - whether that’s trading, dev-ops or client engagement. However, we had a couple of unique takes on the hackathon:</p>\n<ol>\n<li>\n<p>We built for the whole business, not a specific set of users - anybody in any part of the business can be involved in a town hall meeting, there’s no specific expertise required and it’s fundamentally about getting everybody in the company getting their questions answered. I strongly believe that it has a huge business impact and one that is not easily quantified since it involves emotions and relationships and complex community systems.</p>\n</li>\n<li>\n<p>We leveraged two independent APIs and tied them together for a single user experience, using the Symphony identity and authentication model to have a mechanism that didn’t require external dependencies to authenticate a user.</p>\n</li>\n</ol>\n<p>We are very proud that our efforts were rewarded with second place for the <em>Most Cutting-Edge Technical Development</em> category!</p>\n<p>Thank you to my fellow engineers - Dimitri and Jamie - and to Symphony and BNP Paribas for hosting the event!</p>',frontmatter:{title:"The Symphony London Hackathon 2018",date:"October 01, 2018",author:{id:"Luke Terry",bio:"Senior Engineer at MindLink. Enjoys technology, playing games and making things work, blogs at www.indescrible.co.uk.",avatar:{childImageSharp:{resolutions:{tracedSVG:"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60' version='1'%3E%3Crect width='100%25' height='100%25' fill='%23f6f2f8'/%3E%3Cpath d='M0 4l1 4v17l-1 8 1 7 1 2-1 1-1 9v8h11c11 0 11 0 11-2l-2-9c0-6 0-6 2-5l5 1 4-1h-4c-4 0-8-5-11-12-2-6-3-9-1-9 4 0 5 0 4-1l-2-1c-1 1-2 0-2-2-1-4 2-9 5-10l12 1 3 1c1-1 2 2 2 3l1 5c2 4 2 4 2 2 0-3 0-3 2-1s-1 12-3 9l-1 2c0 3-5 11-7 12v1l4-3 3-4 4 4c5 6 8 13 9 18l5 1h5V34a171 171 0 0 0-1-27l1-3V0H0v4m0 12c0 3 1 4 1 2v-6c-1-1-1 0-1 4m0 17c0 4 1 6 1 3v-8l-1 5m0 21c0 4 1 5 1 3v-6c0-2-1-1-1 3' fill='%23e0d6eb' fill-rule='evenodd'/%3E%3C/svg%3E",width:60,height:60,src:"/static/luke-b4696583a30eac95175e7eb6a8becde1-454f9.jpg",srcSet:"/static/luke-b4696583a30eac95175e7eb6a8becde1-454f9.jpg 1x,\n/static/luke-b4696583a30eac95175e7eb6a8becde1-f8c68.jpg 1.5x,\n/static/luke-b4696583a30eac95175e7eb6a8becde1-d364e.jpg 2x,\n/static/luke-b4696583a30eac95175e7eb6a8becde1-e5a4b.jpg 3x"}}}}}}},pathContext:{slug:"the-symphony-london-hackathon-2018",previous:{fields:{slug:"visualising-skype-for-business-persistent-chat-data"},frontmatter:{title:"Visualising Skype for Business Persistent chat data"}},next:{fields:{slug:"hybrid-electron-application-deployment-in-the-enterprise"},frontmatter:{title:"Hybrid Electron application deployment in the enterprise"}}}}}});
//# sourceMappingURL=path---the-symphony-london-hackathon-2018-55ccd2f6ae1bf77baa50.js.map