import React from 'react';
import styled from 'styled-components';


const Container = styled.div`
    margin: 0;
    padding: 0;
    background-image: linear-gradient(#261063, #451b58);
    /* position: fixed;
    top: 0;
    width: 100%; */
`

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Left = styled.div`
    flex:1;
    display: flex;
    align-items: center;
`
const Image = styled.img`
    height: 70px;
    width: 150px;
`

const Center = styled.div`
    flex:1;
    display: flex;
    align-items: center;
    justify-content: space-around;
`


export default function Navbar(){
    return (
        <Container>
            <Wrapper>
                <Left>
                    <a href = "/">
                        <Image src = "https://lnct.ac.in/wp-content/uploads/2021/04/LNCT-Logo.png" alt = ""/>
                    </a>
                </Left>

                <Center>
                    {/* <a href='https://lnct.ac.in/'
                    style={{color:'white', fontWeight:"bold", textDecoration:"none"}}
                    >ABOUT</a>

                    <a href='https://lnct.ac.in/placement-records/'
                    style={{color:'white', fontWeight:"bold", textDecoration:"none"}}
                    >PLACEMENT RECORD</a>

                    <a href='https://lnct.ac.in/contact/'
                    style={{color:'white', fontWeight:"bold", textDecoration:"none"}}
                    >CONTACT</a> */}

                    <a href='/find'
                    style={{color:'white', fontWeight:"bold", textDecoration:"none"}}
                    >FIND ALUMNI</a>

                    <a href='/login'
                    style={{color:'white', fontWeight:"bold", textDecoration:"none"}}
                    >LOGIN AS ALUMNI</a>


                </Center>
            </Wrapper>
        </Container>
    )
}