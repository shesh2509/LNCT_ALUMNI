import styled from "styled-components";
import Navbar2 from "../components/Navbar";
import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom'
import "./Register.css";
import { useFormik } from 'formik';
import axios from 'axios';


const Container1 = styled.div`
    width: 100vw;
    overflow-x: hidden;
`

const Container = styled.div`
    width: 100vw;
    height: 320vh;
    overflow-x: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    //background-image: linear-gradient(#431d5a, #52104a);
    background-color: rgb(17 17 17);
`

const Wrapper = styled.div`
    padding: 20px;
    width: 60%;
    margin: 0 auto;
    border-radius: 30px;
    background-color: #212121;
    box-shadow: 0px 8px 16px 0 rgba(0, 0, 0, 0.5), 10px 6px 20px 0px rgba(0, 0, 0, 0.5);
`

const Title = styled.h1`
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    color: white;
`
const Image = styled.img`
    height: 100px;
    width: 250px;
    display: flex;
    margin: 0;
    align-items: center;
    margin-bottom: 20px;
    margin-top: 10px;
    margin-left: 250px;
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

    &:focus {
        outline: none;
    }
`

const Button = styled.button`
    width: 40%;
    border: none;
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
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

    &:hover {
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

    &:focus {
        outline: none;
    }

`

const RequiredLabel = styled.label`
    margin-left: 10px;
    color: red;
`

export default function Register() {

    const [image, setImage] = useState(null);
    const hiddenFileInput = useRef(null);
    const navigate = useNavigate();

    const handleImageChange = (event) => {
        console.log(event);
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

    // console.log(image);
    const onUpload = async e => {
        const base64 = await handleImageChange(e);
        setImage(base64);
    }
    const handleClick = (event) => {
        hiddenFileInput.current.click();
    }

    const convertImageToBase64 = (image) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve(reader.result);
            };
            reader.onerror = reject;
            reader.readAsDataURL(image);
        });
    };

    async function registerUser(credentials) {
        try {
            if (!image) {
                credentials.profilePic = "../Image/profile.png";
            } else {
                credentials.profilePic = await convertImageToBase64(image);
            }
            //const { data: { msg } } = await axios.post(`http://localhost:5000/api/auth/register`, credentials);
            const { data: { msg } } = await axios.post(`https://alumni-app-beryl.vercel.app/api/auth/register`, credentials);
            return msg;
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const formik = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            college: '',
            branch: '',
            passingYear: '',
            company: '',
            package: '',
            enrollmentNumber: '',
            password: '',
            confirmPassword: '',
            linkedIn: '',
            instagram: '',
            twitter: '',
            interview: '',
            profilePic: ''
        },
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            //values = await Object.assign(values, {profilePic: image || ''})
            if (values.password !== values.confirmPassword) {
                //Passwords do not match
                alert('Passwords do not match');
            }
            values.profilePic = image ? await convertImageToBase64(image) : '';
            const registerPromise = registerUser(values);
            registerPromise.then(function () { navigate('/') });
            console.log(values)
        }
    })


    return (
        <Container1>
            <Navbar2 />
            <Container>

                <Wrapper>
                    <Title> REGISTER AS ALUMNI</Title>
                    <Image src="../Image/LNCT-Logo.png" alt="" />
                    <p style={{color:"#b82020", marginLeft:"300px", marginBottom:"0px", marginTop:"0px"}} >All * are required field</p>
                    <Form>
                        <Profile>
                            <label htmlFor="image-upload-label" className="image-upload-label">
                                {"Upload Profile Picture:"}
                            </label>
                            <ProfilePic>

                                <div onClick={handleClick} style={{ cursor: "pointer" }}>
                                    {image ? (
                                        // eslint-disable-next-line jsx-a11y/img-redundant-alt
                                        <img src={URL.createObjectURL(image)}
                                            alt="upload image" className="img-display-after" />
                                    ) : (
                                        // eslint-disable-next-line jsx-a11y/img-redundant-alt
                                        <img src="../Image/profile.png" alt="upload image" className="img-display-before" />
                                    )}

                                    <input
                                        id="image-upload-input"
                                        type="file"
                                        onChange={onUpload}
                                        ref={hiddenFileInput}
                                        style={{ display: "none" }}
                                    />
                                </div>
                            </ProfilePic>
                        </Profile>
                        <FormContainer>
                            <FormContainer1>

                                <RequiredLabel style={{ color: "white" }}>Full Name*:</RequiredLabel>
                                <Input {...formik.getFieldProps('fullName')} placeholder="Full Name" required aria-required="true" />

                                <RequiredLabel style={{ color: "white" }}>College*:</RequiredLabel>
                                <Input {...formik.getFieldProps('college')} placeholder="College" />

                                <RequiredLabel style={{ color: "white" }}>Enrollment Number*:</RequiredLabel>
                                <Input {...formik.getFieldProps('enrollmentNumber')} placeholder="Enrollment No." />

                                <RequiredLabel style={{ color: "white" }}>Company*:</RequiredLabel>
                                <Input {...formik.getFieldProps('company')} placeholder="Company" />

                                <RequiredLabel style={{ color: "white" }}>Password*:</RequiredLabel>
                                <Input {...formik.getFieldProps('password')} placeholder="Password" type="password" />

                            </FormContainer1>

                            <FormContainer2>
                                <RequiredLabel style={{ color: "white" }}>Email*:</RequiredLabel>
                                <Input {...formik.getFieldProps('email')} placeholder="Email" type="email" />

                                <RequiredLabel style={{ color: "white" }}>Branch*:</RequiredLabel>
                                <Input {...formik.getFieldProps('branch')} placeholder="Branch" />

                                <RequiredLabel style={{ color: "white" }}>Passing Year*:</RequiredLabel>
                                <Input {...formik.getFieldProps('passingYear')} placeholder="Passing Year" />

                                <RequiredLabel style={{ color: "white" }}>Package*:</RequiredLabel>
                                <Input {...formik.getFieldProps('package')} placeholder="Package" />

                                <RequiredLabel style={{ color: "white" }}>Confirm Password*:</RequiredLabel>
                                <Input {...formik.getFieldProps('confirmPassword')} placeholder="Confirm Password" type="password" />

                            </FormContainer2>
                        </FormContainer>


                        <SocialMedia>
                            <p
                                style={{ fontWeight: "bold", fontSize: "25px", marginLeft: "190px", color: "white" }}
                            >Your's Social Media Profiles</p>
                            <SocialMediaConatiner>
                                <label style={{ marginLeft: "10px", color: "white" }}>LinkedIn:</label>
                                <Input {...formik.getFieldProps('linkedIn')} placeholder="LinkedIn Profile" />

                                <label style={{ marginLeft: "10px", color: "white" }}>Instagram:</label>
                                <Input {...formik.getFieldProps('instagram')} placeholder="Instagram Profile" />

                                <label style={{ marginLeft: "10px", color: "white" }}>Github:</label>
                                <Input {...formik.getFieldProps('twitter')} placeholder="Twitter Profile" />
                            </SocialMediaConatiner>
                        </SocialMedia>
                        <Interview>
                            <p style={{ fontWeight: "bold", fontSize: "25px", marginLeft: "190px", color: "white" }}> Share Your Interview Experience * </p>
                            <Textarea {...formik.getFieldProps('interview')} rows="20" cols="68" placeholder="Write your detail interview experience"></Textarea>
                        </Interview>
                        <Button type="button" onClick={formik.handleSubmit}>REGISTER</Button>
                    </Form>



                </Wrapper>

            </Container>
        </Container1>
    )
}
