# Frontend Folder Structure

web-app/
│
├── public/
│   └── def/
│   |   └── def-img.jpeg          # the default thumbnail in case of no thumbnail
│   ├── icons/
|   |   ├──...                    # svgs used 
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── blogs/
│   │   │   │   ├── getAll/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── one/
│   │   │   │   │   └── route.ts
│   │   │   │   └── route.ts
│   │   │   ├── search/
│   │   │   │   ├── quick/
│   │   │   │   │   └── route.ts
│   │   │   │   └── route.ts
│   │   │   ├── tags/
│   │   │   │   └── route.ts
│   │   │   ├── user/
│   │   │   │   ├── login/
│   │   │   │   │   └── route.ts
│   │   │   │   └── route.ts
│   │   │   └── route.ts
│   │   │
│   │   ├── libs/
│   │   │   ├── middleware/
│   │   │   │   └── checkApiKey.ts
│   │   │   ├── hashPassword.ts
│   │   │   └── supabaseClient.ts
│   │   │
│   │   ├── user/
│   │   │   ├── blogs/
│   │   │   │   └── [id]/
│   │   │   │       ├── edit/
│   │   │   │       │   ├── page.module.css
│   │   │   │       │   └── page.tsx
│   │   │   │       ├── Blog.tsx
│   │   │   │       ├── page.module.css
│   │   │   │       └── page.tsx
│   │   │   │
│   │   │   ├── home/
│   │   │   │   ├── page.module.css
│   │   │   │   └── page.tsx
│   │   │   │
│   │   │   ├── profile/
│   │   │   │   └── [name]/
│   │   │   │       ├── edit/
│   │   │   │       │   ├── page.module.css
│   │   │   │       │   └── page.tsx
│   │   │   │       ├── page.module.css
│   │   │   │       ├── page.tsx
│   │   │   │       └── ProfilePage.tsx
│   │   │   │
│   │   │   ├── search/
│   │   │   │   └── [query]/
│   │   │   │       ├── page.module.css
│   │   │   │       └── page.tsx
│   │   │   │
│   │   │   └── layout.tsx
│   │   │
│   │   ├── global.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── page.module.css
│   │
│   ├── components/
│   │   ├── AllPosts/
│   │   │   ├── AllPosts.tsx
│   │   │   └── page.module.css
│   │   ├── BlogPost/
│   │   │   ├── AllPosts.tsx          # Note: This might be a naming error (should be BlogPost.tsx?)
│   │   │   └── page.module.css
│   │   ├── CreatePost/
│   │   │   ├── CreatePost.tsx
│   │   │   └── page.module.css
│   │   ├── EditProfle/                # Note: Typo in folder name (EditProfile)
│   │   │   ├── EditProfle.tsx         # Typo in filename
│   │   │   └── page.module.css
│   │   ├── Markdown/
│   │   │   └── Markdown.tsx
│   │   └── Profile/
│   │       ├── Profile.tsx
│   │       └── page.module.css
│   │
│   ├── hooks/
│   │   ├── truncate/
│   │   │   └── Truncate.ts
│   │   ├── useApi/
│   │   │   └── hooks.ts
│   │   └── useToString/
│   │       └── hook.ts
│   │
│   └── types/
│       ├── blogs.types.ts
│       └── User.types.ts
│
├── store/
│   └── zestStore/
│       └── Store.ts
│
├── UI/
│   ├── Btn/
│   │   ├── Btn.tsx
│   │   └── page.module.css
│   ├── Input/
│   │   ├── Input.tsx
│   │   └── page.module.css
│   ├── Loaders/
│   │   ├── Loaders.tsx
│   │   └── loader.css
│   └── NavBar/
│       ├── NavBar.tsx
│       └── page.module.css
│
├── .env
├── .example.env
├── .gitignore
├── package.json
└── ... other files