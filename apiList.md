# Devtinder APIs

## authRouter
- POST /signup
- POST /login
- POST /logout

## profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## connectioRequestRouter

status-intrested or ignored
- POST /request/send/:status/:userId 

status- accepted or rejected  
- POST /request/review/:status/:requestId


## userRoute
- GET /user/connections
- GET /user/requests/received
- GET /user/feed - Gets you the profiles of other users on platform



Status: ignore,intrested,accepted,rejected

