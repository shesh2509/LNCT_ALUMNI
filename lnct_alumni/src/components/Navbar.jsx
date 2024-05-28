import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
    margin: 0;
    padding: 0;
    background-color: rgb(17 17 17 );
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

    const enrollmentNumber = localStorage.getItem('enrollmentNumber');

    const handleLogout = () => {
        localStorage.removeItem('enrollmentNumber');
        localStorage.removeItem('accessToken');
        window.location.href = '/';
    }

    const navigate = useNavigate();

    const getProfile = async() => {
        try{
            const enrollmentNumber = localStorage.getItem('enrollmentNumber');
            // const res = await axios.get(`http://localhost:5000/api/find?enrollment=${enrollmentNumber}`);
            const res = await axios.get(`https://alumni-app-beryl.vercel.app/api/find?enrollment=${enrollmentNumber}`);
            const user = res.data.find(user => user.enrollmentNumber === enrollmentNumber);
            navigate(`/profile/${user._id}`);
        }catch(err){
          console.error(err);
        }
    };
    return (
        <Container>
            <Wrapper>
                <Left>
                    <a href = "/">
                        <Image src = "../Image/LNCT-Logo.png" alt = ""/>
                    </a>
                </Left>

                <Center>
                    <a href='/find'
                    style={{color:'white', fontWeight:"bold", textDecoration:"none", marginLeft:"10px"}}
                    >FIND ALUMNI</a>

                    {enrollmentNumber ? (
                        <div>
                            <button onClick={getProfile} style={{ color: 'white', fontWeight: "bold", fontSize:'18px', marginLeft: "10px", border: "none", background: "none", cursor: "pointer" }}>{enrollmentNumber}</button>
                            <button onClick={handleLogout} style={{ color: 'white', fontWeight: "bold", fontSize:'18px', marginLeft: "10px", border: "none", background: "none", cursor: "pointer" }}>Logout</button>
                        </div>
                    ) : (
                        <a href='/login'
                        style={{color:'white', fontWeight:"bold", textDecoration:"none", marginLeft:"10px"}}
                        >LOGIN AS ALUMNI</a>
                    )}
                </Center>
            </Wrapper>
        </Container>
    )
}