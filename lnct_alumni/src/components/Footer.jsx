import styled from "styled-components";

const Container = styled.div`
    height: 100px;
    background-color: rgb(17 17 17 );
`

const Text = styled.p`
    color: #b82020;
    margin-left: 400px;
    margin-top: 20px;
    margin-bottom: 0;
`

const ImageL = styled.img`
    height: 20px;
    width: 20px;
    margin-top: 5px;
    margin-right: 0px;
`

const ImageI = styled.img`
    height: 20px;
    width: 20px;
    margin-top: 5px;
`

const Wrapper = styled.div`
    display: flex;
`

const Wrapper2 = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
`

export default function Footer(){
    return(
        <Container>
            <Wrapper>
                <Text>
                    *Note: This is not an offical webiste, it's just for helping our juniors.
                </Text>
            </Wrapper>

            <Wrapper2>
                
                <a href = "https://www.linkedin.com/in/shesh2509/" rel="noreferrer" target="_blank" style={{color:"white", textDecoration:"none"}}>
                    <ImageL src = "../Image/linkedin.png" />
                </a>
                <a href = "https://www.linkedin.com/in/shesh2509/" rel="noreferrer" target="_blank" style={{color:"white", textDecoration:"none"}}>
                    <p style={{color:"white", marginLeft:"0px", marginRight:"10px"}}>@shesh</p>
                </a>
                
                <p style={{color:"white"}}>Copyright @ SHESH</p>
                <a href = "https://www.instagram.com/shesh2509/" rel="noreferrer" target="_blank" style={{color:"white", marginLeft:"20px", textDecoration:"none"}}>
                    <ImageI src = "../Image/instagram.png"/>
                </a>
                <a href = "https://www.instagram.com/shesh2509/" rel="noreferrer" target="_blank" style={{color:"white", textDecoration:"none"}}>
                    <p style={{color:"white"}}>@shesh</p>
                </a>
                

            </Wrapper2>
            
           

        </Container>
    )
}