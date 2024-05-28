import styled from "styled-components"
import Profile from "./profile"
// import { profiledata } from "../data"
import { useEffect, useState } from "react"
import axios from "axios"


const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background-color: rgb(17 17 17 );
`
export default function ProfileAll({cat}){
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const getProfile = async() => {
      try{
        // const res = await axios.get(
        //   cat 
        //   ? `http://localhost:5000/api/find?company=${cat}`
        //   : "http://localhost:5000/api/find"
        // );
        const res = await axios.get(
          cat 
          ? `https://alumni-app-beryl.vercel.app/api/find?company=${cat}`
          : "https://alumni-app-beryl.vercel.app/api/find"
        );
        setProfiles(res.data);
      }catch(err){
        console.error(err);
      }
    };
    getProfile ();
  }, [cat]);


  return (
    <Container>
      {profiles.map((item) => (
        <Profile item = {item} key = {item._id} />
      ))}
    </Container>
  )
}
