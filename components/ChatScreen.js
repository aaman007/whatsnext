import styled from 'styled-components';
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, db} from "../firebase";
import {useRouter} from "next/router";
import {Avatar, IconButton} from "@material-ui/core";
import MoreIcon from '@material-ui/icons/MoreVert';
import AttachIcon from '@material-ui/icons/AttachFile';
import MicIcon from '@material-ui/icons/Mic';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import {useCollection} from "react-firebase-hooks/firestore";
import Message from "./Message";
import {useState} from "react";
import firebase from 'firebase';
import getRecipientEmail from "../utils/getRecipientEmail";
import TimeAgo from "timeago-react";

const ChatScreen = ({ chat, messages }) => {
    const [user] = useAuthState(auth);
    const router = useRouter();
    const [input, setInput] = useState("");
    const [messagesSnapshot] = useCollection(
        db.collection("chats")
            .doc(router.query.id.toString())
            .collection("messages")
            .orderBy("timestamp", "asc")
    );
    const [recipientSnapshot] = useCollection(
        db.collection("users")
            .where("email", "==", getRecipientEmail(chat.users, user))
    )

    const recipient = recipientSnapshot?.docs?.[0]?.data();
    const recipientEmail = getRecipientEmail(chat.users, user);

    const showMessages = () => {
        console.log(messagesSnapshot)
        if (messagesSnapshot && false) {
            return messagesSnapshot?.docs?.map(message => {
                return (
                    <Message
                        key={message.id}
                        user={message.data().user}
                        message={{
                            ...message,
                            timestamp: message.data().timestamp.toDate().getTime(),
                        }}
                    />
                )
            })
        }
        else {
            return JSON.parse(messages).map(message => {
                return (
                    <Message
                        key={message.id}
                        user={message.user}
                        message={message}
                    />
                )
            })
        }
    }

    const sendMessage = e => {
        e.preventDefault();

        db.collection("users").doc(user.uid).set({
            lastSeen: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });

        db.collection("chats").doc(router.query.id)
            .collection("messages").add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                user: user.email,
                message: input,
                photoURL: user.photoURL
            });

        setInput("");
    }

    return (
        <Container>
            <Header>
                {recipient
                    ? <Avatar src={recipient.photoURL} />
                    : <Avatar> {recipientEmail[0]} </Avatar>
                }
                <HeaderInformation>
                    <h3> {recipientEmail} </h3>
                    {recipientSnapshot ? (
                        <p> Last Seen: {' '}
                            {recipient?.lastSeen?.toDate() ? (
                            <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
                        ) : "Unavailable" }
                        </p>
                    ) : ( <p> Loading Last Active </p> )
                    }
                </HeaderInformation>
                <HeaderButtons>
                    <IconButton>
                        <MoreIcon />
                    </IconButton>
                    <IconButton>
                        <AttachIcon />
                    </IconButton>
                </HeaderButtons>
            </Header>

            <MessagesContainer>
                {showMessages()}
                <EndOfMessage />
            </MessagesContainer>

            <InputContainer>
                <IconButton> <InsertEmoticonIcon /> </IconButton>
                <Input value={input} onChange={e => setInput(e.target.value)} />
                <button hidden disabled={!input} type={"submit"} onClick={sendMessage}>Send Message</button>
                <IconButton> <MicIcon /> </IconButton>
            </InputContainer>
        </Container>
    )
}

export default ChatScreen;

const Container = styled.div`
  height: 100vh;
`;

const Header = styled.div`
  position: sticky;
  background-color: white;
  z-index: 100;
  top: 0;
  display: flex;
  padding: 11px;
  height: 80px;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
`;

const HeaderInformation = styled.div`
  flex: 1;
  margin-left: 20px;
  
  >h3 {
    margin-bottom: 3px;
  }
  
  >p {
    font-size: 14px;
    color: grey;
  }
`;

const HeaderButtons = styled.div``;

const MessagesContainer = styled.div`
  padding: 30px;
  min-height: 90vh;
  background-color: #efded8;
`;

const EndOfMessage = styled.div``;

const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background-color: white;
  z-index: 100;
`;

const Input = styled.input`
  flex: 1;
  outline: 0;
  border: none;
  border-radius: 10px;
  background-color: whitesmoke;
  padding: 20px;
  margin-left: 15px;
  margin-right: 15px;
`;