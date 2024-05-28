import styled from "styled-components";
import Navbar from "../components/Navbar";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import Batch from "../components/Batch";
import Footer from "../components/Footer";
import ProfileAll from "../components/ProfilesAll";
import {Link, useLocation} from "react-router-dom";
import { useEffect, useState } from "react";

const Nav = styled.div`
    
`
const Container = styled.div`
    height: 60vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(17 17 17 )
`

const Wrapper = styled.div`
    padding: 50px;
    width: 60%;
    border-radius: 30px;
    background-color: #212121;
    box-shadow: 0px 8px 16px 0 rgba(0,0,0,0.5), 10px 6px 20px 0px rgba(0,0,0,0.5);
`

const Text = styled.h1`
    color: white;
    font-family: "Raleway", Sans-serif;
    font-size: 40px;
    font-weight: 600;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Text1 = styled.h1`
    color: white;
    font-family: "Raleway", Sans-serif;
    font-size: 40px;
    font-weight: 600;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(17 17 17 );
    margin-top: 0;
    margin-bottom: 0;
`

const SearchSection = styled.div`
    padding: 20px 0;
    width: 100%;
    height: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
`
const SearchBar = styled.div`
    background-color: #343434;
    border-radius: 30px;
    width: 500px;
    min-height: 50px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Input = styled.input`
    flex: 1;
    padding: 0 20px;
    font-size: 20px;
    background-color: transparent;
    border: none;
    color: white;
    &:focus{
        outline: none;
    }
`
const SearchResult = styled.div`
    background-color: #343434;
    width: 400px;
    margin-top: 10px;
    position: absolute;
    top: 70px;
    border-radius: 15px;
    ::-webkit-scrollbar{
        display: none;
    }
`

const A = styled.p`
    padding: 5px 20px;
    cursor: pointer;
    font-size: 18px;
    display: block;
    text-decoration: none;
    color: black;
    margin-top: 2px;
    margin-bottom: 2px;
    color: white;
    border-radius: 15px;


    &:hover {
        background-color: #343434;
    }
`

const Icon = styled.div`
    background-color: #343434;
    color: white;
    padding: 0 25px;
    height: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;
`


export default function Find(){
    const location = useLocation();
    const cat = location.pathname.split("/")[2];

    const [search, setSearch] = useState("");
    const [searchData, setSearchData] = useState([]);

    useEffect (() => {
        // if(search !== ""){
        //     fetch(`http://localhost:5000/api/find?company=${search}`)
        //     .then(res => res.json())
        //     .then(data => setSearchData(data));
        // }
        if(search !== ""){
            fetch(`https://alumni-app-beryl.vercel.app/api/find?company=${search}`)
            .then(res => res.json())
            .then(data => setSearchData(data));
        }
    }, [search])

    const handleChange = e => {
        setSearch(e.target.value);
    }

    const handleClose = () => {
        setSearch("");
        setSearchData([]);
    }


    return (
        <Nav>
            <Navbar/>
            <Container>
                <Wrapper>
                    <Text>Search Alumni by Company</Text>
                    <SearchSection>
                        <SearchBar>
                            <Input 
                                type = 'text'
                                placeholder="Search..."
                                autoComplete="off"
                                onChange = {handleChange}
                                value = {search}
                            />
                            <Icon>
                                {search === "" ? (
                                    <SearchIcon/>
                                ) : (
                                    <CloseIcon onClick={handleClose}/>
                                )}
                            </Icon>
                        </SearchBar>
                        <SearchResult>
                            {
                                searchData
                                .filter(data => data.company.toLowerCase().startsWith(search.toLowerCase()))
                                .map((data, index) => (
                                    <Link to={`/find/${data.company}`} style={{textDecoration: "none"}} key={index}>
                                        <A>{data.company}</A>
                                    </Link>
                                ))
                            }
                            
                        </SearchResult>
                    </SearchSection> 

                </Wrapper>
            </Container>
            
            {cat && <Text1>{decodeURIComponent(cat)}</Text1>}
            <ProfileAll cat = {cat}/>

            <Batch/>
            <Footer/>
        </Nav>
    )
}