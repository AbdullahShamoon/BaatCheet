import React, { useEffect, useRef, useState } from 'react'
import EmojiPicker from 'emoji-picker-react'
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import { useChatStore } from '../../lib/chatStore'
import { useUserStore } from '../../lib/userStore'
import { format } from "timeago.js";
import { toast } from 'react-toastify'


const Chat = () => {

  const [open, setOpen] = useState(false)
  const [text, setText] = useState("")
  const [chat, setChat] = useState()
  const [img, setImg] = useState({
    file: null,
    url: ""
  })
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");

  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } = useChatStore()
  const { currentUser } = useUserStore()

  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chat?.messages])

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {

      setChat(res.data())
    })

    return () => unSub()
  }, [chatId])

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji)
    setOpen(false)
  }

  const handleimg = async (e) => {
    if (!e.target.files[0]) return;

    const file = e.target.files[0];
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", "chugli_chowk"); // Replace with your preset name

    try {
      // Upload the file to Cloudinary
      const res = await fetch("https://api.cloudinary.com/v1_1/dtwvr9cxt/image/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.secure_url) {
        setImg({
          file,
          url: data.secure_url, // Cloudinary URL
        });
      } else {
        toast.error("Failed to upload image. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Error uploading image.");
    }
  };


  const handleAudioRecord = async () => {
    if (!recording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        const audioChunks = [];
  
        mediaRecorder.ondataavailable = (event) => {
          audioChunks.push(event.data);
        };
  
        mediaRecorder.onstop = async () => {
          const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
          const formData = new FormData();
          formData.append("file", audioBlob);
          formData.append("upload_preset", "chugli_chowk");
  
          try {
            const res = await fetch("https://api.cloudinary.com/v1_1/dtwvr9cxt/video/upload", {
              method: "POST",
              body: formData,
            });
  
            const data = await res.json();
            if (data.secure_url) {
              // Once uploaded, send the audio message to the database
              await updateDoc(doc(db, "chats", chatId), {
                messages: arrayUnion({
                  senderId: currentUser.id,
                  createdAt: new Date(),
                  audio: data.secure_url, // Use the uploaded audio URL
                }),
              });
  
              // setAudioUrl(""); // Reset the state after sending
            }
          } catch (error) {
            console.error("Error uploading audio:", error);
          }
        };
  
        mediaRecorder.start();
        setRecording(true);
  
        setTimeout(() => {
          mediaRecorder.stop();
          setRecording(false);
        }, 5000); // Record for 5 seconds
      } catch (error) {
        toast.error("Error accessing microphone");
        console.error("Error starting audio recording:", error);
      }
    }
  };
  

  const handleCameraCapture = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const video = document.createElement("video");
    video.srcObject = stream;
    video.play();

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    setTimeout(() => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageData = canvas.toDataURL("image/png");
      stream.getTracks().forEach((track) => track.stop());

      const formData = new FormData();
      formData.append("file", imageData);
      formData.append("upload_preset", "chugli_chowk");

      fetch("https://api.cloudinary.com/v1_1/dtwvr9cxt/image/upload", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          setImg({ file: null, url: data.secure_url });
        })
        .catch((err) => console.error("Error uploading image:", err));
    }, 2000);
  };



  const handleSend = async () => {
    if (text === "") return

    let imgUrl = img.url

    try {

      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date(),
          ...(imgUrl && { img: imgUrl })
        })
      })

      const userIds = [currentUser.id, user.id]

      userIds.forEach(async (id) => {


        const userChatsRef = doc(db, "userChats", id)
        const userChatsSnapshot = await getDoc(userChatsRef)

        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data()
          const chatIndex = userChatsData.chats.findIndex((chat) => chat.chatId === chatId)

          userChatsData.chats[chatIndex].lastMessage = text
          userChatsData.chats[chatIndex].isSeen = id === currentUser.id ? true : false
          userChatsData.chats[chatIndex].updatedAt = Date.now()

          await updateDoc(userChatsRef, {
            chats: userChatsData.chats
          })

        }
      })
    } catch (error) {
      console.log(error)
    } finally {

      setImg({
        file: null,
        url: ""
      })
      setText("")
    }
  }

  return (
    <div className='w-[50%] h-full border-x border-[#546d724f] flex flex-col'>

      <div className="top flex justify-between items-center p-3 border-b border-[#546d724f]">
        <div className="user flex items-center gap-3">
          <img src={user?.avatar || "/Images/profile.jpg"} alt="" className='w-11 h-11 rounded-full object-cover' />
          <div className="texts">
            <span className='font-semibold'>{user?.username}</span>
            <p className='text-xs text-gray-400'>Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
        <div className="icons flex items-center justify-center gap-3">
          <img src="/Images/call.png" alt="" className='w-4 h-4 cursor-pointer' />
          <img src="/Images/video.png" alt="" className='w-4 h-4 invert cursor-pointer' />
          <img src="/Images/info.png" alt="" className='w-4 h-4 cursor-pointer' />
        </div>
      </div>

      <div className="center p-3 flex-1 flex flex-col overflow-auto scrollbar-hidden gap-2">

        {/* <div className="message flex gap-2 max-w-[70%]">
          <img src="/Images/profile.jpg" alt="" className='w-6 h-6 rounded-full' />
          <div className="texts flex-1 flex flex-col gap-1">
            <p className='bg-[#1b2f33ad] rounded-md p-2 text-sm'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati, qui?</p>
            <span className='text-xs px-1'>2:30 AM</span>
          </div>
        </div> */}

        {chat?.messages?.map((message) => (
          <div key={message?.createdAt} className={message.senderId === currentUser?.id ? "messageOwn flex gap-2 max-w-[70%] self-end" : "message flex gap-2 max-w-[70%]"}>
            <div className="texts flex-1 flex flex-col gap-1">
              {message.img && <img src={message.img} alt="" className='max-w-full h-[230px] object-cover rounded-md' />}
              {message.audio && <audio controls src={message.audio} />}
              { message.text && <p className={message.senderId === currentUser?.id ? 'text-right bg-[#2564ebbb] rounded-md p-2 text-sm' : 'bg-[#1b2f33ad] rounded-md p-2 text-sm'}>{message.text}</p>}
              {/* <span className='text-xs px-1'>2:30 AM</span> */}
              <span className='text-[0.6rem] px-1'>{format(message.createdAt.toDate())}</span>
            </div>
          </div>
        ))
        }
        {img.url && (
          <div className="messageOwn flex gap-2 max-w-[70%] self-end">
            <div className="texts flex-1 flex flex-col gap-1">
              <img src={img.url} alt="" className='max-w-full h-[230px] object-cover rounded-md' />
            </div>
          </div>
        )}


        <div ref={endRef}></div>


      </div>

      <div className="bottom flex gap-3 justify-between items-center p-3 border-t border-[#546d724f]">
        <div className="icons flex items-center justify-center gap-3">
          <label htmlFor="file">
            <img src="/Images/image.png" alt="" className='w-4 h-4 cursor-pointer' title='Upload Image' />
          </label>
          <input type="file" name="file" id="file" onChange={handleimg} className="hidden" />
          <img src="/Images/camera.png" alt="" className='w-4 h-4 cursor-pointer' title='Capture Image' onClick={handleCameraCapture} />
          <img src="/Images/mic.png" alt="" className='w-4 h-4 cursor-pointer' title='Record Audio for 5 seconds' onClick={handleAudioRecord} />
        </div>
        <input type="text" placeholder={(isCurrentUserBlocked || isReceiverBlocked) ? "You cannot send messages" : "Type a message"} className='bg-[#1b2f33ad] rounded-md p-3 text-xs border-none outline-none flex-1 disabled:cursor-not-allowed disabled:bg-[#121f22ad] ' onChange={(e) => setText(e.target.value)} value={text} disabled={isCurrentUserBlocked || isReceiverBlocked} />
        <div className="emoji relative">
          <img src="/Images/emoji.png" alt="" className='w-6 h-6 cursor-pointer' onClick={() => setOpen((prev) => !prev)} title='Emoji Picker' />
          <div className="picker absolute bottom-10 left-0">
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button className='bg-[#3b83f6c9] text-white rounded-md px-3 py-2 text-xs cursor-pointer disabled:bg-[#537fc5c2] disabled:cursor-not-allowed ' onClick={handleSend} disabled={isCurrentUserBlocked || isReceiverBlocked} title={(isCurrentUserBlocked || isReceiverBlocked) ? "You cannot send messages" : "Send Message"} >Send</button>
      </div>
    </div>
  )
}

export default Chat