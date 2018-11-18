# IDMember
This is a member system with crypto-payment feature.

## User Stories:
* Log in
* Sign up
* Log out
* Edit Profile
* Add Friends
* Pay cryptocurrency 

## Pages:
* Explore other users -> “/“
* Friends -> “/friends”
* Profile -> “/profile”
* Login -> “/login”
* Signup -> “/signup”

## API (v1): 
* post “/login”
* get “/logout”
* post “/signup”
* post “/users /:id”
* update “/users /:id”
* get “/friends”
* post “/friends”

## Models: 
> User  
> * Name  
> * Gender  
> * Birthday  
> * Nation  
> * Languages  
> * Address  
> * Email  
> * Password  
> * Ethereum Address  
> * Friends []  

> Payment History  
> * From  
> * To   
> * Amount  

## Build
