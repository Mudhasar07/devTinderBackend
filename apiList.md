# Dev Tinder API's

## authRouter
- POST /signup
- POST /Login
- POST /Logout

## profileRoute
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password => Forgot password API

## connectionRouter
- POST /request/send/interest/:userId
- POST /request/send/ignore/:userId
- POST /request/view/accept/:requestId
- POST /request/view/reject/:requestId

## userRoute
- GET /user/connection/request
- GET /request/received
- GET /feed

- Status = ["interested", "Ignored", "Accepted", "Rejected"]