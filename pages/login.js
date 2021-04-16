import Head from "next/head";
import styled from 'styled-components';
import {Button} from "@material-ui/core";
import {auth, provider} from "../firebase";

const Login = () => {
    const signIn = () => {
        auth.signInWithPopup(provider).catch(alert);
    }

    return (
        <Container>
            <Head>
                <title>Login</title>
            </Head>
            <LoginContainer>
                <Logo src={"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/598px-WhatsApp.svg.png"} />
                <Button onClick={signIn} variant="outlined"> Sign In with Google </Button>
            </LoginContainer>
        </Container>
    )
}

export default Login;

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: whitesmoke;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 4px 14px -3px rgba(0, 0, 0, 0.2);
`;

const Logo = styled.img`
  height: 200px;
  width: 200px;
`;