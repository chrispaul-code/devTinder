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
- POST /request/send/:intrested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:requestId
- POST /request/review/:rejected/:requestId

## userRoute
- GET /user/connections
- GET /user/requests/received
- GET /user/feed - Gets you the profiles of other users on platform



Status: ignore,intrested,accepted,rejected

