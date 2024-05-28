import styled from "styled-components";
import {Link} from 'react-router-dom'
//import { profiledata } from "../data";

const Container = styled.div`
    height: 50vh;
    padding: 10px;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    background-color: rgb(17 17 17 );
    margin-bottom: 30px;
`

const Wrapper = styled.div`
    padding: 20px;
    display: flex;
`

const Div1 = styled.div`
    height: 310px;
    width: 250px;
    background-color: #212121;
    border-radius: 15px;
    cursor: pointer;
    color:white;
    box-shadow: 0px 8px 16px 0 rgba(0,0,0,0.5), 10px 6px 20px 0px rgba(0,0,0,0.5);

    &:hover {
        background-color: #343434;
        transform: scale(1.05);
        border: solid white 0.8px;
    }
`

const Image = styled.img`
    height: 150px;
    width: 150px;
    border-radius: 50%;
    position: absolute;
    margin-top: 25px;
    margin-left: 50px;
`

const Ddiv = styled.div`
    width: 250px;
    margin-top: 170px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

`

const Name = styled.p`
    margin-bottom: 0;
    margin-top: 0;
`
const Name1 = styled.p`
    margin-bottom: 0;
    font-weight: bold;
`
const Name2 = styled.p`
    margin-bottom: 0;
    margin-top: 0;
    font-weight: bold;
`

export default function profile({item}) {
    return (
        <Container>
            <Link to = {`/profile/${item._id}`} 
            style={{
                    textDecoration:"None", 
                    color: "black",
                    "&:hover" : {
                        color: "white"
                    }
                }}>
                <Wrapper>
                    <Div1>
                        <Image src = {item.profilePic}></Image>
                        <Ddiv>
                            <Name1>{item.fullName.toUpperCase()} <br/></Name1>
                            <div style={{display:"flex", flexDirection:"column",justifyContent:"center", alignItems:"center"}}>
                                <Name>{item.college}</Name>
                                <Name>{item.branch}</Name>
                                <Name>{item.passingYear}</Name>
                            </div>
                            
                            <Name2>{item.company.toUpperCase()}</Name2>
                        </Ddiv>
                    </Div1>
                </Wrapper>
            </Link>
        </Container>
    )
}