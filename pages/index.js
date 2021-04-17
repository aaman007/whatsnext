import Head from 'next/head'
import Sidebar from "../components/Sidebar";
import Garbage from "../components/Garbage";
import styled from 'styled-components';

export default function Home() {
  return (
    <Container>
      <Head>
        <title>Whatsapp 2.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <Sidebar />
        <Garbage />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
`
