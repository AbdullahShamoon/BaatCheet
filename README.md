# BaatCheet - Chat Live, Anytime, Anywhere

BaatCheet is a real-time live chat application designed for seamless communication. It comes with a variety of features to enhance user interaction and privacy.

## Features

- **Real-time Messaging:** Chat with users in real time.
- **Image Sharing:** Upload and send images via Cloudinary integration.
- **Voice Messages:** Record and send audio messages with a simple click.
- **Block Feature:** Maintain privacy by blocking unwanted users.
- **Live Camera Capture:** Capture photos using the camera and send them as messages.
- **Emoji Support:** Use the emoji-picker-react library to send emojis in messages.
- **Search Filters:** Search through the user list with ease.
- **Notifications:** Get instant feedback with toast messages using `react-toastify`.

## Tech Stack

- **Frontend:** React, Zustand for state management.
- **Backend:** Firebase for authentication and Firestore for real-time database.
- **Media Storage:** Cloudinary for storing profile pictures, chat images, and voice messages.
- **Utilities:**
  - `react-toastify` for toast notifications.
  - `emoji-picker-react` for emojis.
  - `timeago.js` for displaying relative timestamps.

## Screenshots

![Login Page](/public/Screenshots/1.png)
![Main Page](/public/Screenshots/2.png)

## Usage

- Log in or register to start chatting.
- Search for users and initiate a chat.
- Use the emoji picker to enhance your messages.
- Share images and audio messages directly in the chat.
- Block users if needed to maintain your privacy.
- Capture photos using the camera and share them instantly.


## Future Improvements

- **Call Feature:** Add voice and video calls.
- **Group Chat:** Create and join group chats.
- **Privacy Policy:** Add privacy policy.
- **Responsive Design:** Make the app responsive for different screen sizes.\
***Many more....***

## Contributions

Contributions are welcome! Feel free to submit issues or pull requests.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/AbdullahShamoon/baatcheet.git
   ```
2. Navigate to the project directory:
   ```bash
   cd baatcheet
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up Firebase and Cloudinary configurations.
5. Run the app:
   ```bash
   npm start
   ```