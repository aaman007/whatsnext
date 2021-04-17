import styled from 'styled-components';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { auth, db } from '../firebase';
import {Avatar, Button, IconButton} from "@material-ui/core";
import ChatIcon from '@material-ui/icons/Chat';
import MoreIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import * as EmailValidator from 'email-validator';
import Chat from './Chat';

const Sidebar = () => {
    const [user] = useAuthState(auth);
    const userChatRef = db.collection("chats")
        .where("users", "array-contains", user.email);
    const [chatSnapshot] = useCollection(userChatRef);

    const chatAlreadyExists = (email) => (
        !!chatSnapshot?.docs.find(
            chat => chat.data().users.find(
                user => user === email
            )?.length > 0
        )
    )

    const createChat = () => {
        const input = prompt('Enter email of the user');

        if (!input) return;

        if (EmailValidator.validate(input) && input !== user.email && !chatAlreadyExists(input)) {
            db.collection("chats").add({
                users: [user.email, input]
            })
        }
    }

    return (
        <Container>
            <Header>
                <UserAvatar onClick={() => auth.signOut()} src={user.photoURL} />
                <IconsContainer>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreIcon />
                    </IconButton>
                </IconsContainer>
            </Header>

            <Search>
                <SearchIcon />
                <SearchInput placeholder={"Search in chat"} />
            </Search>

            <SidebarButton onClick={createChat}> Start a new chat </SidebarButton>

            { chatSnapshot?.docs.map(chat => (
                <Chat key={chat.id} id={chat.id} users={chat.data().users} />
            )) }
        </Container>
    )
}

export default Sidebar;

const Container = styled.div`
  flex: 0.45;
  border-right: 1px solid whitesmoke;
  height: 100vh;
  min-width: 350px;
  max-width: 350px;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  position: sticky;
  z-index: 1;
  top: 0;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;
  
  :hover {
    opacity: 0.8;
  }
`;

const IconsContainer = styled.div``;

const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius:2px;
`;

const SearchInput = styled.input`
  outline-width: 0;
  border: none;
  flex: 1;
`;

const SidebarButton = styled(Button)`
  width: 100%;
  
  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`;