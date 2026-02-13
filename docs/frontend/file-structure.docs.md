Folder Structure:
./ web-app
public
  def
    def-img.jpeg # the default thumbnail in case of no thumbnail
  icons
src
  app
    api
    libs
    user
    global.css
    layout.tsx
    page.tsx
    page.module.css
  components
    AllPosts
    BlogPost
    CreatePost
    EditProfle
    Markdown
    Profile
  
  hooks
    truncate
    useApi
    useToString

  types
    blogs.types.ts
    User.types.ts

store
UI
.env
.example.env
.gitignore
package.json
... other files