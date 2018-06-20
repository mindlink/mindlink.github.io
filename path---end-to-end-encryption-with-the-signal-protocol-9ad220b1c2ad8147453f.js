webpackJsonp([470145679688],{518:function(e,t){e.exports={data:{site:{siteMetadata:{title:"Engineering at MindLink"}},markdownRemark:{id:"/Applications/TfsBuildAgent/_work/7/s/src/pages/18-06-20-signal-protocol-encryption/index.md absPath of file >>> MarkdownRemark",html:'<h2>What is the Signal Protocol?</h2>\n<p>The Signal Protocol (formerly TextSecure Protocol) defines a cryptographic encryption protocol for secure end-to-end encryption (E2EE). It was created by Open Whisper Systems for use in their secure messaging app TextSecure but has since been released, open-source, to the wider community. It has become hugely popular amongst consumer applications and has earned its name as the defacto standard for securing messaging and voice and video communications. Some of the largest adopters include Google Allo, Facebook Messenger and WhatsApp, but more and more organizations are embracing E2EE everyday as concerns surrounding privacy, security and surveillance increasingly find themselves center-stage in the public eye.</p>\n<p>In simple terms, E2EE allows us to ensure our data is only visibile to its intended recipient; the data is encrypted on the client on the user’s own device before it is even sent over the wire. This means that all the infrastructure in the middle (routing, messaging servers, databases etc.) will never get to see your data in its raw form! And this is great — it means we can completely eliminate the element of trust between client and server so users no longer have to worry about whether their data is truly safe in the hands of their messaging provider. More importantly though, it means that any third party trying to intercept a user’s communications in transit will surely fail!</p>\n<h2>Give me an example.</h2>\n<p>As an example let’s say that user A wants to send a message to user B over MindLink — here is how a typical Signal Protocol exchange goes:</p>\n<ol>\n<li>User A and User B log on for the first time and generate new asymmetrics key-pairs. They publish their public keys to a server.</li>\n<li>User A downloads user B’s keys from the server.</li>\n<li>He creates a new secure messaging session.</li>\n<li>Then encrypts the message.</li>\n<li>Sends the message over MindLink.</li>\n<li>User B receives the messages and starts a matching secure messaging session, decrypting the message.</li>\n</ol>\n<h2>Ok, now let’s unpack this a little…</h2>\n<ol>\n<li>\n<p>When logging in to MindLink for the first time, each user generates serveral sets of keys: A long-term identity key-pair, a medium-term signed prekey pair and several emphemeral keys. The public keys of these pairs are packaged up into whats known as a prekey bundle. This bundle is then sent to a Key Exchange server for storage and dissemintation.</p>\n</li>\n<li>\n<p>User A decides to send a message to user B for the first time. User A starts by requesting user B’s prekey bundle from the Key Exchange.</p>\n</li>\n<li>\n<p>With this, user A builds a new session based on both their keys and user B’s keys in what is referred to as the <strong>Extended Triple Diffie-Hellman (X3DH) key agreement protocol</strong>. </p>\n</li>\n</ol>\n<p>Note: This sounds like a mouthful, and while I likely won’t do it justice here you can find very detailed information about X3DH and indeed the other defining features of the Signal Protocol at the official website, <a href="https://signal.org/docs/">https://signal.org/docs/</a>.</p>\n<p>The Diffie-Hellman (or more specifically the <strong>elliptic-curve Diffie-Hellman</strong>) protocol describes a novel way of deriving a shared secret amongst two parties over an insecure channel. Using some clever mathematics it can be shown that two users sharing some initial public data and some hidden secret data can exchange a sequence of transformations based on that data and arrive at entirely the same conclusion - the shared secret - without anyone who might be observing this exchange being able to do the same! This shared secret then becomes the starting point of an encrypted session between the two users.</p>\n<ol start="4">\n<li>User A encypts a message using their new session.</li>\n</ol>\n<p>This relies on Signal Protocol’s famous <a href="https://signal.org/docs/specifications/doubleratchet/">Double Ratchet algorithm</a> which combines two types of ratchet - a symmetric-key ratchet and a Diffie-Hellman ratchet - to acheive a means of deriving a series of unique message encryption keys that are totally dissociated from any previous or future encryption keys. This means that if an attacker were to compromise one the Double Ratchet keys, they could not then go on to decrypt any other messages. It is this feature of dynamically evolving cryptography that affords Signal its uber-secure reputation.</p>\n<p>The <strong>symmetric ratchet</strong> uses the shared secret key from the X3DH protocol in combination with user B’s ephemeral keys to generate two symmetric keys: a root key (a secret only the users A and B can posses) and a sending chain key. These keys are passed through a <strong>key derivation function (KDF)</strong> to derive unique message keys for each message that is sent. When user A sends a message to user B, user A will advance their sending key chain by one step, generating a new sending chain key and a message encryption key, and on receipt of this message user B will advance their receiving key chain one step and generate the corresponding message decryption key. This is good but if an attacker were to steal user B’s sending and receiving chain key they could potentially calculate every future message key and thus every future message. This is where the other half of the <strong>Double Ratchet</strong> comes in…</p>\n<p>The <strong>Diffie-Hellman ratchet</strong> is “interleaved” with the symmetric ratchet and the output periodically initialises a new set of sending and receiving chain keys and a brand new root key. This means the attacker’s stolen keys are useless after only a single two-way message exchange (the “period” of the DH ratchet)!</p>\n<p>This all sounds quite complicated… and that’s because it is! I would encourage anyone who’s really interested to go away and read and this very technical, very in-depth <a href="https://eprint.iacr.org/2016/1013.pdf">analysis of Signal</a>.</p>\n<p>The message itself contains the encrypted ciphertext payload along with the outputs of the DH ratchet at each stage and some additional information for the recipient to advance their receiving key chain correctly. But this is also a special case - being the first message sent in a new session. User A also straps their prekey bundle to the encrypted message so user B can derive a complementary session.</p>\n<ol start="5">\n<li>\n<p>User A sends the encrypted payload over the wire!</p>\n</li>\n<li>\n<p>User B receives the encrypted message payload. They recognise that they don’t have a matching session for the message, but they DO realise that there’s a prekey bundle attached to the message that they can establish one with. After going through the same steps as user A in #3 and #4 user B ends up with the decrypted plaintext message.</p>\n</li>\n</ol>\n<h2>Wrapping it up</h2>\n<p>So that’s it! There are plenty of details left out here but this should hopefully offers a decent high-level overview of the kind of flow and processes you can expect to see in a typicaly Signal Protocol offering.</p>\n<p>For further interest regarding implementation of the protocol, I’ve created a simple browser-based demonstration using the Javascript Signal APIs <a href="https://github.com/Jamie-Matthews/Signal-Protocol-Demo">which you can find on GitHub</a>. The demo creates two “users” and runs through the steps outlined in this post to exchange some messages between them. Enjoy!</p>',frontmatter:{title:"End-To-End Encryption with the Signal Protocol",date:"June 20, 2018",author:{id:"Jamie Matthews",bio:null,avatar:{childImageSharp:{resolutions:{tracedSVG:"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60' version='1'%3E%3Crect width='100%25' height='100%25' fill='%23f6f2f8'/%3E%3Cpath d='M27 8c-4 5-5 9-3 13v5h5v2c1 2 0 2-2 2l-2-1h-1l-1-1-2-3H9c-6 0-7 0-8 2s-1 2 3 2h5c2 0 3 2 1 2-1 1 0 1 1 1l2-1 5-1c5 0 6 0 6 2 0 3 0 3-14 7-8 2-10 4-10 14v7h16c8 0 15 0 14-1v-1c0-2 2-1 2 1l14 1h15v-8l-1-7-1-3-1-2c-1 1-2 0-2-1l-5-2-6-3-2-1 4 7v3c0 2-3 1-3-2 0-1-1-1-2 1-2 3-5 4-3 1v-2l-1-3c0-3-2-6-4-6l-1-1c-1-2 0-2 2-3l4-2c1-2 2-2 3 1l3 3 1 1h2c0-2 1-2 1-1l1 1c1-1 0-4-1-4-1 1-5-2-5-4l-2-1c-2 0-2 0-1-1s1-1-1-1c-2 1-3 0-4-1l-3-2-1-1-1-2v-2c1 0 2-1 2-3 0-4-3-4-6-1m8 1c-1 5 3 6 7 4V9c-3-3-7-3-7 0m17 20c-1 2-1 2 1 2 3 1 7 0 7-2s-5-2-8 0M0 53l1 4v-8l-1 4m32-6l1 9 1 2h2v-3l1-5c2-3 2-3 0-3h-5' fill='%23e0d6eb' fill-rule='evenodd'/%3E%3C/svg%3E",width:60,height:60,src:"/static/jamie-ef845734f9f6a26e3ff77046f81ed650-454f9.jpg",srcSet:"/static/jamie-ef845734f9f6a26e3ff77046f81ed650-454f9.jpg 1x,\n/static/jamie-ef845734f9f6a26e3ff77046f81ed650-f8c68.jpg 1.5x,\n/static/jamie-ef845734f9f6a26e3ff77046f81ed650-d364e.jpg 2x,\n/static/jamie-ef845734f9f6a26e3ff77046f81ed650-e5a4b.jpg 3x"}}}}}}},pathContext:{slug:"end-to-end-encryption-with-the-signal-protocol",previous:{fields:{slug:"custom-content-in-a-skype-for-business-conversation"},frontmatter:{title:"Custom content in a Skype for Business conversation"}},next:!1}}}});
//# sourceMappingURL=path---end-to-end-encryption-with-the-signal-protocol-9ad220b1c2ad8147453f.js.map