/**
 * Promise View Acres — canonical site content.
 * Single source of truth for copy. Mirrors vault content-spec.md.
 * Edit here to change copy without touching layout. Externalize to JSON
 * later if a CMS is wired (see vault build-plan.md).
 */

export const site = {
  name: "Promise View Acres",
  tagline: "Faith · Family · Land · Purpose",
  // External destinations — placeholders until Luke supplies real handles.
  youtube: "https://www.youtube.com/", // TODO: real channel
  instagram: "https://www.instagram.com/", // TODO: real handle
  email: "hello@promiseviewacres.com", // TODO: confirm inbox

  nav: [
    { label: "Home", href: "/" },
    { label: "Our Story", href: "/our-story" },
    { label: "The Journey", href: "/journey" },
    { label: "Journal", href: "/journal" },
    { label: "Beyond Organic Gardening", href: "/beyond-organic-gardening" },
    { label: "Resources", href: "/resources" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export const home = {
  hero: {
    headline: "Rooted in Faith. Growing in Stewardship.",
    subtext:
      "Documenting the beauty, challenges and lessons learned in building a homestead on faith.",
    primaryCta: { label: "Watch the Journey", href: site.youtube },
    secondaryCta: { label: "Our Story", href: "/our-story" },
  },
  mission: {
    eyebrow: "Our Mission",
    body: `At Promise View Acres we believe that true freedom only comes one way. Through faith in Christ and living in alignment with God's promises, precepts, and principles. So we made a decision to stop doing it the world's way and start building a life that actually reflects that belief. On real land, with a real family, through a very real and imperfect process. Our mission is to document that journey of faith honestly so that anyone who has ever longed for something more can see with their own eyes the kind of life and liberty God has made freely and abundantly available to them too.`,
  },
  values: [
    {
      title: "Faith",
      body: "Everything we do flows from our relationship with God. He is not in the background of this journey. He is the reason for it. Every decision runs through that filter first.",
    },
    {
      title: "Stewardship",
      body: "How you care for what God entrusts to you says everything about how much you actually trust Him. That shows up daily in how we tend this land, manage our resources, and handle what He has placed in our hands.",
    },
    {
      title: "Simplicity",
      body: "Modern life is loud and complicated on purpose. We are choosing a different pace. Not because simple is easy but because simple is where peace actually lives.",
    },
    {
      title: "Hospitality",
      body: "A well-stewarded life should have room for others. Whether that is sharing what we grow, teaching what we know, or simply making people feel welcome, generosity is woven into everything we are building.",
    },
    {
      title: "Love",
      body: "Everything we do is motivated by it. Love for God, love for our family, love for the people He sends our way. Without it none of this means anything. It is not something we just talk about, it is supposed to show up in everything we do.",
    },
  ],
  stewardship: {
    eyebrow: "Current Stewardship",
    intro:
      "The areas we're currently focused on as we continue building and improving what God has entrusted to us.",
    cards: [
      { title: "Greenhouse", body: "Planting, growing, and preparing for abundant harvests." },
      { title: "Garden", body: "Building healthy soil and growing food for our family." },
      { title: "Property", body: "Landscaping, improving, and stewarding 21 acres God led us to." },
      { title: "Projects", body: "Building, fixing, and creating things that serve our purpose." },
      { title: "Family Life", body: "Establishing rhythms and memories that matter most." },
    ],
  },
} as const;

export const ourStory = {
  intro:
    "We are husband and wife, gardeners, stewards, teachers, and most importantly followers of Christ.",
  invitation: `We are not here to force a lifestyle on you. We are here to simply share and document what happens when two imperfect people decide to trust God with their land, their family, and their life. The real process. The real struggle. The real freedom that comes when you stop doing things the world's way and start living within God's design. It's all for His glory.`,
  resonate: "If that resonates with you, you are exactly where you are supposed to be.",
  joinCta: { label: "Join the Journey", href: site.youtube },
  pictureOfThePromise: {
    title: "Picture of the Promise",
    caption: "The 21 acres God led us to in 2022.", // TODO: real image + caption
  },
  // Long-form testimony
  journey: [
    `The struggles of this world are all too apparent. There is even a fitting term to describe it: the rat race. A world where no matter how hard you work, you can never seem to get ahead, while being drained in every direction in the process. The problem is, it is the only way of life most of us have ever been sold. Constantly. Consistently. From every angle. It feels inescapable.`,
    `And even though this cycle of pain, misery, and struggle ends in death for us, it is a means to an end for something, or someone, that has never and will never have your best interest in mind. At some level, you already know this.`,
    `We are here to tell you there is a counteroffer. Made by Someone who does have your best interest in mind. An offer for a new way of life that brings true life in ways you have never imagined but have always yearned for.`,
    `Years before I accepted Christ at 17, God was gracious enough to let me see the world for what it was and where it was headed. I could see it clearly, but I could not see any possible alternative. That led me down a path into the pits of hopelessness until I came face to face with the epitome of Hope Himself: Yeshua. Jesus.`,
    `In that moment I surrendered, and my life changed forever.`,
    `He showed me there was another way. A way out. The only way. Him. I wanted to shout it from the rooftops.`,
    `Just months after that moment, He told me He was going to give me the platform to do exactly that. Over the course of the 10 years that followed He developed me, prepared me, and brought me an incredible wife in Symone, whom I could never come close to walking the purpose well without. Then He fulfilled His promise.`,
    `In 2022 He led us to 21 acres and used it as the vessel through which we share our journey of faith. Through it He expanded our reach far beyond anything we could have imagined, drawing people from around the world to the light of Christ working through our lives.`,
    `Whether it is through our gardening, our marriage, our stewardship, or anything else in between, we pray that you see the Spirit behind all of it and the results that come from living this way, so that you would glorify the One who makes it all possible and know that He has made the same life available to you.`,
    `Welcome to Promise View Acres.`,
  ],
} as const;

export const beyondOrganic = {
  hero: {
    title: "Beyond Organic Gardening",
    subtitle: "Coming to know the heart of the original Gardener.",
  },
  whatIsIt: {
    heading: "What is Beyond Organic Gardening?",
    body: [
      `Beyond organic gardening is a philosophy and growing method that goes much further than simply avoiding synthetic chemicals. Certified organic gardening primarily focuses on what not to use while still allowing certain inputs simply because they are considered natural. Beyond organic seeks to go further by actively creating a living, thriving, regenerative ecosystem.`,
      `But here is how I see it.`,
      `God is the original gardener. He planted the first garden, placed mankind within it to work it, and walked with him face to face there, making it the ideal environment for man to live in.`,
    ],
    scripture: {
      text: "And the LORD God planted a garden in Eden, in the east, and there He placed the man He had formed.",
      ref: "Genesis 2:8",
    },
    bodyAfter: [
      `After the fall, humanity was driven out and lost that unveiled connection with God. But He never stopped using the garden to speak. Throughout Scripture the language of seeds, soil, fruit, and harvest shows up over and over again because the garden has always been one of the clearest pictures of who He is and how He works.`,
      `There are so many truths to be discovered in the garden that it becomes clear that stewarding the land well to grow healthy food, while crucial, was never meant to be the end goal.`,
      `Beyond organic gardening is about coming to know the heart of our Creator and becoming a living picture of the life, freedom, provision, and abundance He has always intended for us.`,
    ],
  },
  principles: [
    {
      title: "Healthy Foundation",
      body: "We are not primarily growing plants. We are growing healthy soil. When the soil is right, abundant growth becomes natural.",
    },
    {
      title: "Regenerative by Design",
      body: "Nature already demonstrates the solutions. We work with creation's design, not against it, to produce lasting abundance.",
    },
    {
      title: "Stewardship Over Consumption",
      body: "Caring well for the land is not just practical wisdom. It reflects the very purpose man was given from the beginning.",
    },
  ],
  consultation: {
    heading: "Book a Consultation",
    body: [
      `Whether you are just getting started or have been at it for a season or two and something still is not clicking, this consultation is designed to give you real clarity and a clear path forward.`,
      `We will look at where you are, where you want to go, and what the simplest path looks like from here. No overwhelming information dump. Just practical wisdom for your specific situation.`,
    ],
    price: "$197",
    duration: "60 minutes",
  },
} as const;
