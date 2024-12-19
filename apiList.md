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
- POST /request/send/:Interest/:userId
- POST /request/send/:Ignored/:userId

- POST /request/view/:Accepted/:requestId
- POST /request/view/:Rejected/:requestId

## userRoute
- GET /user/request/received
- GET /request/received
- GET /feed

- Status = ["Interested", "Ignored", "Accepted", "Rejected"]