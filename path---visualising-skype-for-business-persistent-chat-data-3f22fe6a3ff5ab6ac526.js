webpackJsonp([0xe01e93ad7acb],{539:function(e,t){e.exports={data:{site:{siteMetadata:{title:"Engineering at MindLink"}},markdownRemark:{id:"/Applications/AzureDevOpsAgent/_work/13/s/src/pages/18-07-27-using-power-bi-and-skype-for-business-persistent-chat-database/index.md absPath of file >>> MarkdownRemark",html:'<p>Persistent Chat allows the Skype For Business users to create topic-based discussion rooms that persist over time. This feature allows users within an organization to discuss either casual or business related subjects in chatrooms dedicated for a desired purpose. Logically, a lot of business relevant data for an organization is generated in those chatrooms so it would be great if we could extract that information and visualise it in some modern and cool charts, wouldn’t it? </p>\n<h1>Proof of concept</h1>\n<p>In this post we are going to show how easy it is to use Power Bi tool and to visualise some interesting statistics about the Persistent Chat usage in one of our dev environments. The goal with this exercise is to be able to display the 5 top users for any desired chatroom in a classic bar chart. </p>\n<h1>Enter Microsoft Power BI</h1>\n<p>Microsoft Power BI is a business intelligence cloud service that provides business users with tools for aggregating, analysing and visualising data. It did not take too long to get used to its simple interface as it is quite similar to other widely used Microsoft products.</p>\n<p>One great thing about this service is that it is possible to get data from multiple sources. For instance: </p>\n<ul>\n<li>File based data such as JSON or XML</li>\n<li>Datatabase data like SQL Server,  Oracle, MySQL and many more systems.</li>\n<li>Azure services such as SQL Data Warehouse, Azure HDInsight or Azure Data Lake Store.</li>\n<li>and many other online services like Facebook, SalesForce or MailChimp.</li>\n</ul>\n<p>Another very good aspect about Power Bi is that the user has a very wide range of clean, neat and customisable charts to choose from. </p>\n<p>Bar, Column, Stacked, Clustered, Waterfall, Donut, Filled Map, Gauge, HeatMap, Word Cloud, amongst many others, can be easilly selected to represent the data that you want to visualise. Not surprisingly, many more type of charts can be downloaded from the Marketplace.</p>\n<p>There are two different versions: professional and free. The professional version has a paid subscription attached to it and it offers more storage, more frequent data refresh cycles and much more streaming data consuption.  </p>\n<h1>Persistent Chat Backend</h1>\n<p>Going back to Persistent Chat for Skype For Business, chat room and user data is persisted in a SQL Server database. Let’s look at some important tables for Lync Group Chat 2010, one of the predecessors of Skype For Business Persistent Chat, which has a very similar structure to Skype For Business 2015 Persistent Chat.</p>\n<ul>\n<li><em>tblChat</em> - contains all the messages sent in chatrooms.</li>\n<li><em>tblNode</em> - contains all the chatrooms and their respective categories that the chatrooms might be associated with. </li>\n<li><em>tblPrincipal</em> - contains the information about all the users that are enabled for Persistent Chat and the AD groups that they potentially are associated with.</li>\n<li>few more dozens of tables but they are out of scope for our exercise.</li>\n</ul>\n<p>Shall we start doing our little proof of concept? </p>\n<h1>Preparing the DataSet and Relationships</h1>\n<p>Let’s start by opening the PowerBi Desktop application, which you can easilly download for free from the Microsoft website. First thing to do is to authenticate against it with an Office365 account.</p>\n<p>After authenticating the user is guided to the start page which has a form to create a new project.</p>\n<p>As expected the user is prompted with a menu that allows it to choose where to get its data from. In this case we want to get the data from the Persistent Chat database in our Skype For Business 2015 dev environment. After selecting <em>SQL Server database</em> option the application ask the user to fill in the server details and the database name. In addition it is required to specify which Data Connectivity mode we prefer:</p>\n<ul>\n<li>\n<p>Import - extracts the data from your database and pulls it into the Power BI Desktop :</p>\n<ul>\n<li>Gives you the full suite of transformation and data manipulation in the Desktop.</li>\n<li>Consumes and pushes the data into the Power BI Azure backend</li>\n<li>Can only be refreshed up to 8x a day by setting up a scheduled refresh (In the Service)</li>\n</ul>\n</li>\n<li>\n<p>Direct Query - leaves the data in the database and sends queries to pull the information:</p>\n<ul>\n<li>Limits your ability to manipulate data in the Desktop (removes the Data section).</li>\n<li>Leaves the data in the SQL database.</li>\n<li>Is <em>live</em>, no need to schedule a refresh.</li>\n</ul>\n</li>\n</ul>\n<p>In this example we suggest to select the Import option as we want to be able to do transformation and data manipulation.</p>\n<p>Ok so now it’s time to specify the credentials to access the database and then press <em>Connect</em>.</p>\n<p>Now that we have tested that we can connect to the Persistent Chat database we are prompted with a navigator that allows the user to select which tables they want to import. We will select the three tables that were mentioned in the previous section: <em>tblNode</em>, <em>tblPrincipal</em> and <em>tblChat</em>. Since <em>tblChat</em> has thousands and thousands of rows it will take a while to load all the rows.</p>\n<p>Great! Once all the tables are loaded we will be taken to the project’s main page and on the left hand side there will be 3 icons:</p>\n<ul>\n<li>Reports icon - where we place the actual charts and buttons for our report.</li>\n<li>Data icon - where the data is defined - queries, lookups and so on.</li>\n<li>Relationships icon - where the relationships between our entities are outlined.</li>\n</ul>\n<p>Before doing anything else, maybe now it’s a good time to save your project. </p>\n<p>If you click on the Data icon you’ll be able to see imported tables and their respective data.</p>\n<p>But first we need to define the relationships between the tables! So click on the Relationships icon.</p>\n<p>We can see the three tables that we’ve loaded from our database connection. The goal is to clearly specify that: </p>\n<ul>\n<li>\n<p><em>tblChat</em>’s userId tells us which user sent the respective message so the <em>userId</em> in <em>tblChat</em> will correspond to the <em>prinId</em> in <em>tblPrincipal</em>. In order to establish that relationship just drag the <em>prinId</em> field in <em>tblPrincipal</em> to userId field in <em>tblChat</em>. Now for a given <em>userId</em> in <em>tblChat</em> we will be able to know more about that user - more specifically - the prinName which corresponds to the user name that will be displayed in the chart.</p>\n</li>\n<li>\n<p><em>tblChat</em>’s <em>channelId</em> is referring to what group was the message sent in so in order to get the information about that group we need to drag the <em>tblNode</em>’s nodeId to <em>tblChat</em>’s <em>channelId</em> field. </p>\n</li>\n</ul>\n<p>It should look like this:</p>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/static/EntityRelationships-7eba4701c8b856839e8260901dd098e4-1a87f.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block; ; max-width: 590px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 63.78482228626321%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAIAAAAmMtkJAAAACXBIWXMAAA7DAAAOwwHHb6hkAAACRUlEQVQoz32S7U/aUBTG+wejKKVluriwD2YOZEtwQshgIAhzyzL3luE+LBMMI/GTkgwWILy0lta+3ra0IBrcU/zkh3nSNLf3nt+5z3l6KI7jbdsyNMUgRDVMjVj2eEwsh5hja+zaNr4cLBx3ggN77JimNZ1MNN1wHIe6VDSDmLIk8PyFKErCSFI1TVI0UVIuZU1WVEVVsdZ1YzjkkDwaiYauXwgialGZ14l3bzMfPxTeH2Rf7eykUqnMm0wul9vby2Wz2Xw+n8tld3d3k8nkTjyeTqe9hEwGZ3hTXw5LvV5XFIU/jfrKyvLSkm9jY+P09PTs7Ly9iGarFQ6HfT6f3++vVCqNRqPT6fT7/UQiQVV+lS3LRifcoMmywdUAHYlGiWHIsjy7vr65uXFdNxqN0jQdDAZ5nocH2JzP58VikTqpHMESQkx++DfE0o/Xll++iBg6YGU6hTUTeBaLxRiGAd/r9RR4oKqoWCgUqOpx2XEmjuMO+831NXr90crzSAQYjlH+9vZ2Npttb2/fwVArLwJF9/f3PXgM1x2XG7SePlkFvLn5TJJEZEiShLcgCFtbW8wi+t7NCjYJIfASPX83LQvK+UGLYQIsy4ZCobX7cbcJuNvtgsREQJonGzAGAQ8MY4I00pAavB/sIiD7DiameXV15cHHP78ZBsGEdNvn6Iv9fwDutNsiJkmS0LMnu1b9MZ3ONE33bn4QDgQCHMfhLyIZRpZKJSqViH39VPp8WDwopdDVAzD0l8vlWu13tXpSr9fj8fg/ccI0KMOvYv8AAAAASUVORK5CYII=\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="alt text"\n        title=""\n        src="/static/EntityRelationships-7eba4701c8b856839e8260901dd098e4-fb8a0.png"\n        srcset="/static/EntityRelationships-7eba4701c8b856839e8260901dd098e4-1a291.png 148w,\n/static/EntityRelationships-7eba4701c8b856839e8260901dd098e4-2bc4a.png 295w,\n/static/EntityRelationships-7eba4701c8b856839e8260901dd098e4-fb8a0.png 590w,\n/static/EntityRelationships-7eba4701c8b856839e8260901dd098e4-526de.png 885w,\n/static/EntityRelationships-7eba4701c8b856839e8260901dd098e4-1a87f.png 1041w"\n        sizes="(max-width: 590px) 100vw, 590px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<h1>Creating the report</h1>\n<p>Now that the data is there we can start creating the report which will include a chart and a dropdown to select the chatroom that we wish to see the top 5 users that have sent more messages. First thing to do is to rename the the page for that report from <em>Page 1</em> to <em>Top 5 Users in Chatroom</em>.</p>\n<h2>Adding the slicer</h2>\n<p>By pressing the <em>Reports</em> icon we are taken to the area where we can drop the slicer that will contain all the chatrooms in our Persistent Chat environment. The slicer can be formatted to look like a dropdown.</p>\n<p>The <em>Visualizations</em> navigator has a list of predefined objects so we need to press the slicer icon.</p>\n<p>There are several properties that need to be filled so that the slicer displays all the chatrooms in a dropdown.</p>\n<p>First the filters:</p>\n<ul>\n<li>Field: Drag the <em>nodeName</em> field from the <em>tblNode</em> table.</li>\n<li>\n<p>Filters: </p>\n<ul>\n<li>\n<p>Page level filters: This affects which rows will be shown in the dropdown.</p>\n<ul>\n<li>drag the <em>disabled</em> field from <em>tblNode</em> here and tick the <em>False</em> box as we only want to show chatrooms that are enabled.</li>\n<li>drag the <em>nodeType</em> field from <em>tblNode</em> here and tick the <em>False</em> box as we only want to filter out chatroom categories from the eligible chatrooms.</li>\n</ul>\n</li>\n</ul>\n</li>\n</ul>\n<p>And then the Formatting:</p>\n<ul>\n<li>First, click on the paint roller icon!</li>\n<li>\n<p>Here you can define the visual aspects of the slicer.</p>\n<ul>\n<li>You can edit the title by switching the <em>Title</em> on.</li>\n<li>Or edit edit the <em>Header</em>.</li>\n<li>and change other properties as you please :)</li>\n</ul>\n</li>\n</ul>\n<p>To behave like a dropdown instead of a list hover the slicer’s header and there is the possibility to choose between <em>list</em> or <em>dropdown</em>.</p>\n<p>Now you should be able to see the dropdown with all the valid chatrooms!</p>\n<h2>Adding the Clustered Column chart and linking it with the dropdown</h2>\n<p>It’s time to add the chart that will show us the top 5 users for a chatroom!</p>\n<p>The Clustered column chart will do just fine so in order to add it to our report simply press the report page and then click on the corresponding icon and place it next to the dropdown. </p>\n<p>Ok so now it is time to configure the chart! </p>\n<p>Our first goal is to link the chart with the dropdown so that every time we choose a different chatroom the chart component displays the top 5 users for the selected chatroom.</p>\n<p>In order to achieve this we need to :</p>\n<ul>\n<li>\n<p>Highlight the slicer component.</p>\n</li>\n<li>\n<p>Select the Format tab (in between Help and Data/Drill tabs). </p>\n</li>\n<li>\n<p>Switch on Edit Interactions.</p>\n</li>\n<li>\n<p>Filter controls are represented by the funnel icon on top of each component.      </p>\n<ul>\n<li>Initially all the Filter icons are selected.</li>\n</ul>\n</li>\n<li>\n<p>Highlight both components and ensure the filter controls are selected for both.</p>\n</li>\n<li>\n<p>Now we need to configure the chart accordingly:</p>\n<ul>\n<li>\n<p>Highlight the chart component and check the fields section on the right hand side.</p>\n</li>\n<li>\n<p>Filters :</p>\n<ul>\n<li>\n<p>Legend: </p>\n<ul>\n<li>This will determine what will be shown in the X axis. Since we want to display a bar for each of the top 5 users in the chatroom this has to show the user name. Don’t forget  that we have established the relationship between <em>tblPrincipal</em> and <em>tblChat</em>. So for each <em>tblChat</em> row there is a userId associated with a message sent and that is linked with the respective user in <em>tblPrincipal</em>. To show the sender’s user name we simply need to drag the prinName from <em>tblPrincipal</em> to the Legend data field. We can rename the what is shown in the chart by clicking the arrow next to prinName and by clicking on <em>Rename</em>.</li>\n</ul>\n</li>\n<li>\n<p>Value:</p>\n<ul>\n<li>This will reflect what should be displayed in the Y axis. In our case we want a count of each occurences of a given <em>channelId</em> in the <em>tblChat</em>. This will give us a count of all messages in that chatroom. In order to achieve this we just need to drag the <em>channelId</em> field in <em>tblChat</em> and drop it in the <em>Value</em> data field. Once that is done if you click the arrow next to it some options will appear and the one that we want is <em>Count</em>.</li>\n</ul>\n</li>\n</ul>\n</li>\n</ul>\n<p>At the moment you should be able to change the chatroom and see a new graph being drawn every time you select a new chatroom. It is showing the number of messages sent by each user in the given chatroom. Now we want to limit it to only show 5 users and improve the looks of that chart! </p>\n<ul>\n<li>\n<p>Visual level filters:</p>\n<ul>\n<li>\n<p>User (all) </p>\n<ul>\n<li>Click on <em>Filter type</em> and select <em>Top N</em>.</li>\n<li>Next to <em>Top</em> type <em>5</em>.</li>\n<li>Now drag <em>chatId</em> from <em>tblChat</em> to <em>By value</em> section.</li>\n<li>Click on <em>Apply filter</em> and it should only display the top 5 users in that chatroom!</li>\n</ul>\n</li>\n</ul>\n</li>\n</ul>\n</li>\n<li>\n<p>Format :</p>\n<ul>\n<li>\n<p>Here it is where you can change the layout of the chart. For instance you can move the legend to be at the bottom instead of being at the top or you can add a title to any of the axis.</p>\n</li>\n<li>\n<p>More visual aspects can be changed such as the colour of the bars or add some nice labels that indicate the absolute number of messages sent to them. </p>\n</li>\n</ul>\n</li>\n</ul>\n<h2>Publish the report!</h2>\n<p>Now that we have done what we wanted we need to publish the report that we have just done to the cloud! </p>\n<p>In order to achieve that go to <em>File</em> and click on the <em>Publish</em> button! </p>\n<p>After the <em>success</em> dialog click on the link provided and you will be redirected to the PowerBi portal so sign in using the same credentials as before and you should be able to see this report in your workspace.</p>\n<p> \n  <a\n    class="gatsby-resp-image-link"\n    href="/static/Top5UsersChatroom-22c9b968eaa3647bea9669fcd5201502-ea655.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block; ; max-width: 590px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 33.0488750969744%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAHCAIAAACHqfpvAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAA4ElEQVQY032QSwrCMBCGvZwX8AIewJUnEF2oZ/AGIi5UqKArFbGK4ELBlYirolRIqEnMNA+nqe3Gx0+YTIb55pGCzaS1AZASIAaw1uRxpRTnXDqhwxh7ZioY885DR2mDF31wPGkkhQmhCHEulJN2QieHEwvsgna8PfUWB4fptAQhJIoi+6EMNkmeDLzLzu8MV935Hp+xg1GUUiHELxiNa3KdtKrNUqU9Wh9zGFcNwxCH/AJnC7smN69eaRTLtf7ykMNYGABwyS+wlEKKJ07FRCzJyZ9tBlP/HNyT/zfG/tULkqWQMQfVfkIAAAAASUVORK5CYII=\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="alt text"\n        title=""\n        src="/static/Top5UsersChatroom-22c9b968eaa3647bea9669fcd5201502-fb8a0.png"\n        srcset="/static/Top5UsersChatroom-22c9b968eaa3647bea9669fcd5201502-1a291.png 148w,\n/static/Top5UsersChatroom-22c9b968eaa3647bea9669fcd5201502-2bc4a.png 295w,\n/static/Top5UsersChatroom-22c9b968eaa3647bea9669fcd5201502-fb8a0.png 590w,\n/static/Top5UsersChatroom-22c9b968eaa3647bea9669fcd5201502-526de.png 885w,\n/static/Top5UsersChatroom-22c9b968eaa3647bea9669fcd5201502-fa2eb.png 1180w,\n/static/Top5UsersChatroom-22c9b968eaa3647bea9669fcd5201502-ea655.png 1289w"\n        sizes="(max-width: 590px) 100vw, 590px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<p>If you want to publish it to the Internet or to embed in a SharePoint or to a Powerpoint simply go to File and those options will be available!\n</p>\n<h2>Conclusions</h2>\n<p>This was a very basic example on how we can combine a powerful visual tool like the Power BI with the Skype For Business Persistent Chat database to show us interesting information about a chatroom usage.</p>\n<p>Another good example that I was also working on was to create a word cloud <em>chart</em> that is built of the most used words in a chatroom but unfortunately that is still work in progress as it requires a bit more advanced algorithms to gather the meaningful words present in messages that are sent in a chatroom. </p>\n<p>My experience with Power Bi was very positive as I found the tool quite powerful and easy to integrate with existing systems. It allows the user to get data from a long list of data sources and it offers a wide range of different charts that display the information the users need. With the R Script Editor,which I did not cover on this example, the more technical user will feel more empowered to use their scripting abilities to create and use their own Power Bi visuals. </p>\n<p>As a quick and last note I am definitely not an expert on Power Bi so if you found something that was wrong or could be explained better please leave a friendly comment :)</p>\n<p>Hopefully this article has sparked some curiosity about this tool! </p>',frontmatter:{title:"Visualising Skype for Business Persistent chat data",date:"August 09, 2018",author:{id:"Gonçalo Ferreira",bio:"I believe in Ripple XRP and so should you.",avatar:{childImageSharp:{resolutions:{tracedSVG:"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60' version='1'%3E%3Crect width='100%25' height='100%25' fill='%23f6f2f8'/%3E%3Cpath d='M2 1C1 4 2 26 3 27l1 2c1 2 6 4 8 4l1-4 1-2 5-1h4c0 2 2 1 2-2 1-2 1-2 3-1l3 2c1 2 3-7 3-10-1-3-1-3 10-2 2 0 3 1 5 5l4 6c1 1 3-21 2-22C54 0 2-1 2 1m22 11l-1 1 1 2c2 2 9 3 7 1-1-1-2-2-3-1-2 0-2 0-2-2v-2l-2 1m3 21c-2 0-2 1-1 3v2c-2 1-2 1-1 2v1c-1 0-4-2-4-4l-1-1-1 1v3c-2 3 0 6 7 10l5 4h-9l-8 1v-6c0-5 0-5-3-5-1 0-2 0-1 1 3 0 2 2 0 2l-2 1v1l1 2 2 3 1 4c0 2 1 2 9 2l11-1h8c-1 1 1 1 5 1 6 0 6 0 7-3 0-1 0-3-2-4v-2c3 0 4-11 1-13h-7l-5 1c-3 0-4 0-4 3l1 2 2 2c1 2 1 2-1 2s-3-2-3-5l-2-5-1-3c3-2 0-3-4-2m0 8c0 3 1 5 3 5 2-1 2-1 1-3v-3l-2-1c-2-1-2 0-2 2' fill='%23e0d6eb' fill-rule='evenodd'/%3E%3C/svg%3E",width:60,height:60,src:"/static/goncalo-a48a10a6091da477f7b38b45e4556184-454f9.jpg",srcSet:"/static/goncalo-a48a10a6091da477f7b38b45e4556184-454f9.jpg 1x,\n/static/goncalo-a48a10a6091da477f7b38b45e4556184-f8c68.jpg 1.5x,\n/static/goncalo-a48a10a6091da477f7b38b45e4556184-d364e.jpg 2x,\n/static/goncalo-a48a10a6091da477f7b38b45e4556184-e5a4b.jpg 3x"}}}}}}},pathContext:{slug:"visualising-skype-for-business-persistent-chat-data",previous:{fields:{slug:"getting-started-with-python-and-the-mindlink-api"},frontmatter:{title:"Getting started with Python and the MindLink API."}},next:{fields:{slug:"the-symphony-london-hackathon-2018"},frontmatter:{title:"The Symphony London Hackathon 2018"}}}}}});
//# sourceMappingURL=path---visualising-skype-for-business-persistent-chat-data-3f22fe6a3ff5ab6ac526.js.map