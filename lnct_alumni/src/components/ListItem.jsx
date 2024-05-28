import styled from "styled-components";
import {Link} from 'react-router-dom';


const Div1 = styled.div`
    height: 200px;
    width: 200px;
    background-color: #212121;
    cursor: pointer;
    border-radius: 30px;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.5), 0 6px 20px 0 rgba(0,0,0,0.19);
    &:hover {
        background-color: #343434;
        transform: scale(1.05);
        border: solid white 0.8px;
    }
`

const Circle = styled.div`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background-color: #343434;
    position: absolute;
    margin-top: 25px;
    margin-left: 25px;
`

const Image = styled.img`
    height: 100px;
    width: 100px;
    margin-top: 25px;
    margin-left: 25px;
    position: absolute;
    border-radius: 100%;
`

export default function ListItem({item}) {
    return (
        <Div1>
            <Link to={`find/${item.cat}`}>
            <Circle>
                <Image src = {item.img} alt="no img"></Image>
            </Circle>
            </Link>
        </Div1>

    )
}