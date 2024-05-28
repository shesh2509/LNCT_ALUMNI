import styled from "styled-components";
import Navbar2 from "../components/Navbar";
import React, {useState, useRef, useEffect} from "react";
import "./Register.css";
import axios from 'axios';
import { useParams } from "react-router-dom";


const Container1 = styled.div`
    width: 100vw;
    overflow-x: hidden;
`

const Container = styled.div`
    height: 1750px;
    width: 100vw; 
    overflow-x: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    /* background-image: linear-gradient(#431d5a, #52104a); */
    background-color: rgb(17 17 17 );
`

const Wrapper = styled.div`
    padding: 20px;
    width: 60%;
    margin: 0 auto;
    border-radius: 30px;
    background-color: white;
    background-color: #212121;
    box-shadow: 0px 8px 16px 0 rgba(0,0,0,0.5), 10px 6px 20px 0px rgba(0,0,0,0.5);
`

const Title = styled.h1`
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    color: white;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
`
const Input = styled.input`
    flex: 1;
    margin: 10px 0px;
    padding: 15px;
    font-size: 15px;
    background-color: #343434;
    color: white;
    border: none;
    border-radius: 30px;

    &:focus{
        outline: none;
    }
`

const Button = styled.button`
    width: 40%;
    border: none;
    border-radius: 5px;
    padding: 15px 20px;
    border-radius: 5px;
    background-color: #343434;
    color: white;
    font-weight: bold;
    font-size: 20px;
    cursor: pointer;
    margin-top: 50px;
    margin-bottom: 20px;
    margin-left: 230px;
    align-items: center;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.5), 0 6px 20px 0 rgba(0,0,0,0.19);

    &:hover{
        background-color: #212121;
        color: white;
        transform: scale(1.05);
        border: solid 0.8px white;
    }
`
const FormContainer = styled.div`
    display: flex;
    flex-direction: row;
`
const FormContainer1 = styled.div`
    margin-left: 100px;
    display: flex;
    flex-direction: column;
`

const FormContainer2 = styled.div`
    width: 60%;
    margin: 0px 100px;
    display: flex;
    flex-direction: column;
`

const SocialMedia = styled.div`
    margin-top: 50px;
`

const SocialMediaConatiner = styled.div`
    width: 74%;
    margin: 0px 100px;
    display: flex;
    flex-direction: column;
`

const Interview = styled.div`
    margin-top: 40px;
`

const Profile = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`

const ProfilePic = styled.div`
    width: 30%;
    margin-top: 40px;
    margin-bottom: 20px;
    margin-left: 50px;
    display: flex;
`

const Textarea = styled.textarea`
    margin-left: 65px;
    font-size: 15px;
    background-color: #343434;
    color: white;
    padding: 30px;
    border: none;
    border-radius: 30px;

    &:focus{
        outline: none;
    }

`
const RequiredLabel = styled.label`
    margin-left: 10px;
    color: red;
`


export default function EditUser(){

    const [image, setImage] = useState(null);
    const [profile, setProfile] = useState(null);
    const { id } = useParams();
    const hiddenFileInput = useRef(null);

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

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const imgname = event.target.files[0].name;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            const img = new window.Image();
            img.src = reader.result;
            img.onload = () => {
                const canvas = document.createElement("canvas");
                const maxSize = Math.max(img.width, img.height);
                canvas.width = maxSize;
                canvas.height = maxSize;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(
                    img, 
                    (maxSize - img.width) / 2,
                    (maxSize - img.height) / 2
                );
                canvas.toBlob(
                    (blob) => {
                        const file = new File([blob], imgname, {
                            type: "image/png",
                            lastModified: Date.now(),
                        });

                        setImage(file);
                    },
                    "image/jpeg",
                    0.8
                );
            };
        };
    };
   
    const handleClick = (event) => {
        hiddenFileInput.current.click();
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // await axios.put(`http://localhost:5000/api/find/${id}`, profile);
            await axios.put(`https://alumni-app-beryl.vercel.app/api/find/${id}`, profile);
            // Redirect to profile page after successful update
            window.location.href = `/profile/${id}`;
        } catch (error) {
            console.error("Error updating profile:", error.response.data);
        }
    };


    if (!profile) {
        return <div>Loading...</div>;
    }


    return (
        <Container1>
            <Navbar2/>
            <Container>
            
            <Wrapper>
                <Title> Edit Your Profile</Title>
                <p style={{color:"#b82020", marginLeft:"300px", marginBottom:"0px", marginTop:"0px"}} >All * are required field</p>
                <Form onSubmit={handleSubmit}>
                    <Profile>
                        <label htmlFor = "image-upload-label" className="image-upload-label">
                            {"Upload Profile Picture:"}
                        </label>
                        <ProfilePic>

                            <div onClick={handleClick} style = {{cursor:"pointer"}}>
                                {image ? (
                                    // eslint-disable-next-line jsx-a11y/img-redundant-alt
                                    <img src = {URL.createObjectURL(image)}
                                    alt = "upload image" className="img-display-after"/>
                                ) :(
                                    // eslint-disable-next-line jsx-a11y/img-redundant-alt
                                    <img src = "../Image/profile.png" alt = "upload image" className="img-display-before"/>
                                )}

                                <input
                                    id = "image-upload-input"
                                    type = "file"
                                    name="profilePic"
                                    onChange={handleImageChange}
                                    ref = {hiddenFileInput}
                                    style={{display:"none"}}
                                />
                            </div>
                        </ProfilePic>
                    </Profile>
                    <FormContainer>
                        <FormContainer1>

                            <RequiredLabel style={{marginLeft: "10px", color: "white"}}>Full Name*:</RequiredLabel>
                            <Input type="text" name="fullName" value={profile?.fullName} onChange={handleInputChange}/>

                            <RequiredLabel style={{marginLeft: "10px", color: "white"}}>College*:</RequiredLabel>
                            <Input  type="text" name="college" value={profile?.college} onChange={handleInputChange}/>

                            <RequiredLabel style={{marginLeft: "10px", color: "white"}}>Enrollment Number*:</RequiredLabel>
                            <Input  type="text" name="enrollmentNumber" value={profile?.enrollmentNumber} disabled/>

                            <RequiredLabel style={{marginLeft: "10px", color: "white"}}>Company*:</RequiredLabel>
                            <Input  type="text" name="company" value={profile?.company} onChange={handleInputChange}/>

                        </FormContainer1>

                        <FormContainer2>
                            <RequiredLabel style={{marginLeft: "10px", color: "white"}}>Email*:</RequiredLabel>
                            <Input type="email" name="email" value={profile?.email} disabled/>

                            <RequiredLabel style={{marginLeft: "10px", color: "white"}}>Branch*:</RequiredLabel>
                            <Input type="text" name="branch" value={profile?.branch} onChange={handleInputChange}/>

                            <RequiredLabel style={{marginLeft: "10px", color: "white"}}>Passing Year*:</RequiredLabel>
                            <Input type="text" name="passingYear" value={profile?.passingYear} onChange={handleInputChange}/>

                            <RequiredLabel style={{marginLeft: "10px", color: "white"}}>Package*:</RequiredLabel>
                            <Input type="text" name="package" value={profile?.package} onChange={handleInputChange}/>

                        </FormContainer2>
                    </FormContainer>
                    

                    <SocialMedia>
                        <p
                        style={{fontWeight:"bold", fontSize: "25px", marginLeft:"190px", color: "white"}}
                        >Your's Social Media Profiles</p>
                        <SocialMediaConatiner>
                            <label style={{marginLeft: "10px", color: "white"}}>LinkedIn:</label>
                            <Input type="text" name="linkedIn" value={profile?.linkedIn} onChange={handleInputChange}/>

                            <label style={{marginLeft: "10px", color: "white"}}>Instagram:</label>
                            <Input type="text" name="instagram" value={profile?.instagram} onChange={handleInputChange}/>

                            <label style={{marginLeft: "10px", color: "white"}}>Github:</label>
                            <Input type="text" name="twitter" value={profile?.twitter} onChange={handleInputChange}/>
                        </SocialMediaConatiner>
                    </SocialMedia>
                    <Interview>
                        <p style={{fontWeight:"bold", fontSize: "25px", marginLeft:"190px", color: "white"}}> Share Your Interview Experience *</p>
                        <Textarea  rows="20" cols="68" name="interview" value={profile?.interview} onChange={handleInputChange}></Textarea>
                    </Interview>
                    <Button type="submit">UPDATE</Button>
                </Form>

                

            </Wrapper>

        </Container>
        </Container1>
        
    )
}