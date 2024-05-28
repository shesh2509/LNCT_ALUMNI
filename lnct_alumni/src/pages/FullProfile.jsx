import styled from "styled-components";
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import Navbar from "../components/Navbar";
import {Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Container1 = styled.div``;

const Container = styled.div`
    /* height: 200vh; */
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    //background-image: linear-gradient(#431d5a, #52104a);
    background-color: rgb(17 17 17 );
`;

const Wrapper = styled.div`
    /* padding: 20px; */
    width: 70%;
    border-radius: 20px;
    background-color: #212121;
    box-shadow: 0px 8px 16px 0 rgba(0,0,0,0.5), 0px 6px 20px 0px rgba(0,0,0,0.5);
    margin-bottom: 8px;
    margin-top: 20px;
`

const Cover = styled.div`
    height: 350px;
    background-image: url(../Image/Cover.jpg);
    margin-top: 0px;
    margin-bottom: 0px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
`
const PDiv = styled.div`
    height: 210px;
    width: 210px;
    border-radius: 50%;
`
const Ppic = styled.img`
    height: 200px;
    width: 200px;
    border-radius: 50%;
    border: solid #212121 8px;
    margin-top: 250px;
    margin-left: 50px;
`

const Detail = styled.div`
    width: 80%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 15px;
`

const DetailAbout = styled.div`
    margin-left: 300px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
`

const DetailCompany= styled.div``

const Name = styled.h2`
    margin-left: 300px;
    margin-bottom: 0px;
    color: white;
`

const Clg = styled.p`
    color: white;
    margin-top: 0;
    margin-bottom: 0;
    margin-right: 10px;
`

const WrapperSocial = styled.div`
    /* padding: 20px; */
    width: 70%;
    border-radius: 20px;
    background-color: #212121;
    box-shadow: 0px 8px 16px 0 rgba(0,0,0,0.5), 10px 6px 20px 0px rgba(0,0,0,0.5);
    margin-bottom: 8px;
`

const SocialMedia = styled.div`
    margin-top: 0px;
    height: 200px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center; 
`

const ImgL = styled.img`
    height: 150px;
    width: 150px;
    margin-left: 40px;
    border-radius: 25px;
    box-shadow: 0px 8px 16px 0 rgba(0,0,0,0.5), 10px 6px 20px 0px rgba(0,0,0,0.5);

    &:hover {
        transform: scale(1.05);
    }
`
const ImgI = styled.img`
    height: 150px;
    width: 150px;
    margin-left: 50px;
    border-radius: 35px;
    box-shadow: 0px 8px 16px 0 rgba(0,0,0,0.5), 10px 6px 20px 0px rgba(0,0,0,0.5);
    &:hover {
        transform: scale(1.05);
    }
`

const ImgT = styled.img`
    margin: 0;
    height: 150px;
    width: 150px;
    border-radius: 20px;
    box-shadow: 0px 8px 16px 0 rgba(0,0,0,0.5), 10px 6px 20px 0px rgba(0,0,0,0.5);
    &:hover {
        transform: scale(1.05);
    }
`

const WrapperInterview = styled.div`
    width: 70%;
    border-radius: 20px;
    background-color: #212121;
    box-shadow: 0px 8px 16px 0 rgba(0,0,0,0.5), 10px 6px 20px 0px rgba(0,0,0,0.5);
    margin-bottom: 100px;
`

const InterviewDiv = styled.div`
    width: 80%;
    padding: 20px;
    border-radius: 20px;
    margin-left: 65px;
    margin-bottom: 50px;
    display: flex;
    flex-wrap: wrap;
    box-shadow: 0px 8px 16px 0 rgba(0,0,0,0.5), 10px 6px 20px 0px rgba(0,0,0,0.5);
`
const Interview = styled.p`
    color: white;
    font-size: 20px;
`

const Text = styled.p`
    text-decoration: none;
    color: white;
`

const Icon = styled.button`
    width: 150px;
    height: 40px;
    border: none;
    border-radius: 15px;
    background-color: #343434;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 710px;
    margin-top: 0;
    margin-bottom: 10px;
    transition: all 0.2s ease;
    box-shadow: 0px 8px 16px 0 rgba(0,0,0,0.5), 10px 6px 20px 0px rgba(0,0,0,0.5);

    &:hover{
        background-color: #212121;
        color: white;
        transform: scale(1.05);
        border: solid white 0.8px;
    }
`

export default function FullProfile() {
    const enrollmentNumber = localStorage.getItem('enrollmentNumber');
    const { id } = useParams();
    const [profile, setProfile] = useState(null);
    useEffect(() => {
        const fetchProfile = async () => {
        try {
            // const response = await axios.get(`http://localhost:5000/api/find/${id}`);
            const response = await axios.get(`https://alumni-app-beryl.vercel.app/api/find/${id}`);
            setProfile(response.data);
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    };
    fetchProfile();
    }, [id]);

    return (
        <Container1>
            <Navbar/>
        <Container>
           
            <Wrapper>
                <Cover>
                    <PDiv>
                        <Ppic src = {profile?.profilePic}></Ppic>
                    </PDiv>
                </Cover>
                <Name>
                    {profile?.fullName}
                </Name>
                
                <Detail>
                    <DetailAbout>
                        <Clg>College: {profile?.college}</Clg>
                        <Clg>Branch: {profile?.branch}</Clg>
                        <Clg>Batch: {profile?.passingYear}</Clg>
                    </DetailAbout>

                    <DetailCompany>
                        <Clg>Company: {profile?.company.toUpperCase()}</Clg>
                        <Clg>Package: {profile?.package}</Clg>
                    </DetailCompany>
                </Detail>


                {enrollmentNumber === profile?.enrollmentNumber && 
                    (<Link to={`/edit/${id}`} style={{textDecoration:"none"}}>
                        <Icon><EditTwoToneIcon/> <Text>Edit Profile</Text></Icon>
                    </Link>)}
                
            </Wrapper>

            <WrapperSocial>
                <h2 style={{marginLeft:"30px", color:"white"}}>Social Media</h2>
                <SocialMedia>
                    <div>
                        <a href = {profile?.linkedIn} rel="noreferrer" target="_blank" >
                            <ImgL src = "../Image/linkedin.png" alt = ""/>
                        </a>    
                    </div>
                    
                    <div>
                    <a href = {profile?.instagram} rel="noreferrer" target="_blank" >
                        <ImgI src = "../Image/instagram.png" alt = ""/> 
                    </a>
                    </div>

                    <div>
                    <a href = {profile?.twitter} rel="noreferrer" target="_blank" style={{color:"white", marginLeft:"20px", textDecoration:"none"}}>
                        <ImgT src = "../Image/github.png" alt = ""/> 
                    </a>
                    </div>
                </SocialMedia>
            </WrapperSocial>

            <WrapperInterview>
                <h2 style={{marginLeft:"30px", color:"white"}}>Interview Experience</h2>
                <InterviewDiv>
                    <Interview>
                        {profile?.interview}
                    </Interview>
                </InterviewDiv>
            </WrapperInterview>
        </Container>
        </Container1>
        
    )
}