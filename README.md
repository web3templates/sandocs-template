# Sandocs Documentation Template

Sandocs is a JAMStack Documentation, Knowledge Base & Help Center Template built with Next.js, Tailwind CSS & Sanity CMS built by [Web3Templates](https://web3templates.com/).

[Click here to see live demo →](https://sandocs.vercel.app/)

<a href="https://vercel.com/new/clone?demo-title=Sandocs&demo-description=Sandocs%20Documentation%20Template&demo-url=https%3A%2F%2Fsandocs.vercel.app%2F&demo-image=https%3A%2F%2Fuser-images.githubusercontent.com%2F1884712%2F179554008-fc32f768-4ca8-4b75-9074-9ffbb804b8b7.png&project-name=Sandocs&repository-name=sandocs-docs&repository-url=https://github.com/web3templates/sandocs-template/&from=templates&integration-ids=oac_hb2LITYajhRQ0i4QznmKH7gx">
<img width="259" alt="Deploy to Vercel & Sanity" src="https://user-images.githubusercontent.com/1884712/169833532-1007b9aa-1456-4386-9526-7b5b46b094ed.png">
</a>

###### Click the above button for one-click clone & deploy for this template. Read [quick start](#quick-start) guide below. 

#### Template Preview

![image](https://user-images.githubusercontent.com/1884712/179554008-fc32f768-4ca8-4b75-9074-9ffbb804b8b7.png)

## Sandocs - Pro Version

![image](https://user-images.githubusercontent.com/1884712/179554511-a16fd2d6-6e58-4a25-953c-7eaddc0b1a21.png)

Pro version is available to purchase on https://web3templates.com which includes:

- The Landing Page
- Dark Mode
- Remove Backlink
- Personal License
- 6 Months Support

## Quick Start

To use this template and configure sanity and deploying to vercel, we recommend the "One Click Deploy" method. Just follow the GUI and you will have an exact copy of what you see in the live demo .Using this method will automatically configure the following tasks for you.

- Signup/Login to Sanity CMS (if not already)
- Create a Sanity Project
- Add required CORS & API settings in the project
- Create new Repository in Github
- Install Sanity Integration in Vercel
- Add required `.env` variables
- Deploy Sanity Studio - Content Manager
- Import Demo Content (as seen in live demo)
- Deploy to Vercel

<a href="https://vercel.com/new/clone?demo-title=Sandocs&demo-description=Sandocs%20Documentation%20Template&demo-url=https%3A%2F%2Fsandocs.vercel.app%2F&demo-image=https%3A%2F%2Fuser-images.githubusercontent.com%2F1884712%2F179554008-fc32f768-4ca8-4b75-9074-9ffbb804b8b7.png&project-name=Sandocs&repository-name=sandocs-docs&repository-url=https://github.com/web3templates/sandocs-template/&from=templates&integration-ids=oac_hb2LITYajhRQ0i4QznmKH7gx">
<img width="259" alt="Deploy to Vercel & Sanity" src="https://user-images.githubusercontent.com/1884712/169833532-1007b9aa-1456-4386-9526-7b5b46b094ed.png">
</a>

To setup one click deployment, click the above link below and follow the steps.

## Local Development

Again, we recommend you to use the one-click deploy first which will create a github repo. You can then clone the github repo to your local system and change following `.env` variables.

1. ~root/`.env.local`

Change `.env.local.example` placed in the root folder and rename it to `.env.local` and add your sanity project ID. Get it from https://sanity.io/manage

```
NEXT_PUBLIC_SANITY_PROJECT_ID=xxyyzz
```

2. `/studio/.env.development` or `/studio/sanity.json`

To develop sanity cms locally, you also need to add the Project ID and Dataset in either `.env` or in `sanity.json` file.

```
# .env.development
SANITY_STUDIO_API_PROJECT_ID=xxyyzz
SANITY_STUDIO_API_DATASET=production

```

or you can directly replace the project ID in the `/studio/sanity.json`

```js
// sanity.json
  // ...
  "api": {
    "projectId": "xxyyzz",
    "dataset": "production"
  },
  // ...
```

### Copy Demo Content
Before running this template, make sure you add your content or upload demo content provided by this template. Make sure `@sanity/cli` is installed globally. 

Demo data is available in `.sanity-template/data/production.tar.gz`. Checkout [Sanity docs](https://www.sanity.io/docs/importing-data#d183adde8ef9) to import demo data instructions.


### Run Next.js frontend

You can use the normal Next.js method to run the frontend. Just run the following command and a live server will open on `http://localhost:3000`

```
yarn dev
```

### Run Sanity Studio CMS

1. Install Sanity CLI globally (if not already)

```
npm install -g @sanity/cli
```

2. Run

To run sanity studio server, run the following command in your terminal. It will open a live server on `http://localhost:3333`

```
yarn sanity
# or
cd studio && sanity start
```
