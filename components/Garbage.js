import styled from 'styled-components';

const Garbage = () => {
    return (
        <Container>
            <GibberishImage src={"https://cdn.ndtv.com/tech/images/whatsapp_web_connected.jpg"} />
        </Container>
    )
}

export default Garbage;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: whitesmoke;
`;

const GibberishImage = styled.img`
  box-shadow: 5px 5px 13px 16px rgba(0, 0, 0, 0.2);
`;