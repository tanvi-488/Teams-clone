## Teams-clone
A website developed during the Microsoft Engage 2021 Mentorship Program.
This WebApp allows users to communicate via video calling and text messages and share files.

## Tech Stack Used
### Backend
1. *Redis* - Open source, in-memory data structure used for caching messages.
2. *Nodejs* - Runtime Environment for javascript
3. *ExpressJS* - as a light, unopinionated application framework 
4. *Firebase* - used the Firebase Authentication SDK to manually integrate sign-in methods into the app.
6. *Socket.io* -  Library for real-time, bidirectional, event-based communication between the browser and server
7. *Simple-peer* - Easy to use peer-to-peer connection API for implementing WebRtc
8. *Chatengine.io* - API to implement the chat window

### Frontend
1. ReactJs
2. Bootstrap
3. CSS
4. HTML

## Installation

Install Redis.io and create your redis account.

Create a chatengine.io account.

Create a firebase project.

Use [npm](https://mpmjs.com), [pnpm](https://pnpm.io) or [yarn](https://yarnpkg.com) to install all dependencies in both client and server folders.

bash 

npm i

## Usage

# startup instruction here

Redis server:redis-server

Server: cd server
        node index.js
        
Client: cd client
        npm start

# ScreenShot

![image](https://user-images.githubusercontent.com/73576515/125317264-7d12aa80-e356-11eb-9e43-a5a3577d1474.png)
![image](https://user-images.githubusercontent.com/73576515/125317301-88fe6c80-e356-11eb-9a58-7ac988810052.png)
![image](https://user-images.githubusercontent.com/73576515/125317391-99164c00-e356-11eb-8cb2-0c137c392767.png)
![image](https://user-images.githubusercontent.com/73576515/125317430-a03d5a00-e356-11eb-9bec-e898ba13c037.png)


# .env
## server
* PORT

## client
* REACT_APP_FIREBASE_API_KEY 
* REACT_APP_FIREBASE_AUTH_DOMAIN
* REACT_APP_FIREBASE_PROJECT_ID
* REACT_APP_FIREBASE_STORAGE_BUCKET 
* REACT_APP_FIREBASE_MESSAGING_SENDER_ID
* REACT_APP_FIREBASE_APP_ID
* REACT_APP_FIREBASE_MEASUREMENT_ID 
* CHAT_ENGINE_PROJECT_ID 
* CHAT_ENGINE_PRIVATE_KEY 


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)

