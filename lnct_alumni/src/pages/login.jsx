import styled from "styled-components";
import Navbar2 from "../components/Navbar";
import { Link } from "react-router-dom";
import {useFormik} from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
//import { mobile } from "../responsive";
//import React, { useState, useEffect } from 'react';

const Container1 = styled.div``

const Container = styled.div`
    width: 100vw;
    height: 85vh;
    display: flex;
    align-items: center;
    justify-content: center;
    /* background-image: linear-gradient(#431d5a, #52104a); */
    background-color: rgb(17 17 17 );
`

const Wrapper = styled.div`
    padding: 20px;
    width: 31%;
    border-radius: 30px;
    background-color: #212121;
    box-shadow: 0px 8px 16px 0 rgba(0,0,0,0.5), 10px 6px 20px 0px rgba(0,0,0,0.5);
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
    align-items: center;
    margin-bottom: 10px;
    margin-top: 10px;
    margin-left: 70px;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
`

const Input = styled.input`
    flex: 1;
    min-width: 40%;
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
    background-color: #343434;
    color: white;
    font-weight: bold;
    font-size: 20px;
    cursor: pointer;
    margin-top: 10px;
    margin-bottom: 10px;
    align-items: center;
    margin-left: 105px;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.5), 0 6px 20px 0 rgba(0,0,0,0.19);

    &:hover{
        background-color: #212121;
        color: white;
        transform: scale(1.05);
        border: solid 0.8px white;
    }
`

const Button2 = styled.button`
    width: 60%;
    border: none;
    border-radius: 5px;
    padding: 15px 20px;
    border-radius: 5px;
    background-color: #343434;
    color: white;
    font-weight: bolder;
    font-size: 17px;
    cursor: pointer;
    margin-top: 0;
    margin-left: 80px;
    align-items: center;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.5), 0 6px 20px 0 rgba(0,0,0,0.19);

    &:hover{
        background-color: #212121;
        color: white;
        transform: scale(1.05);
        border: solid 0.8px white;
    }
`

const Text = styled.div`
    margin-top: 0px;
    margin-left: 200px;
    width: 30vw;
    height: 65vh;
`

export default function Login(){

    const navigate = useNavigate();

    async function loginUser(credentials){
        try{
            //const response = await axios.post(`http://localhost:5000/api/auth/login`, credentials);
            const response = await axios.post(`https://alumni-app-beryl.vercel.app/api/auth/login`, credentials);
            const {data } = response;
            const {enrollmentNumber} = data.user;
            localStorage.setItem('enrollmentNumber', enrollmentNumber);
            return data.msg;
        } catch (error){
            console.error('Error:', error);
        }
    }

    const formik = useFormik({
        initialValues : {
            enrollmentNumber : '',
            password : ''
        },
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit : async values => {
            const loginPromise = loginUser(values);
            loginPromise.then(function() {navigate('/')});
            //console.log(values)
        }
    })


    return (
        <Container1>
            <Navbar2/>
            <Container>
            
            <Wrapper>
                <Title> LOGIN AS ALUMNI</Title>
                <Image src = "../Image/LNCT-Logo.png" alt = ""/>
                <Form >
                    <Input {...formik.getFieldProps('enrollmentNumber')} placeholder = "Enrollment No."/>
                    <Input {...formik.getFieldProps('password')} placeholder = "Password" type = "password"/>

                    <Button type="button" onClick={formik.handleSubmit}>LOGIN</Button>
                </Form>
            </Wrapper>


            <Text>
                <p style={{color:"white", fontWeight: "bold", fontSize: "50px"}}>Help your junior to connect with you !!</p>

                <Link to="/register">
                    <Button2>REGISTER AS ALUMNI</Button2>
                </Link>
                
            </Text>
        </Container>
        </Container1>
        
    )
}