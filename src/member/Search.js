import './Style.css'; // CSS 파일을 import
import {useNavigate} from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import logoImage from '../img/semohan-logo.png';
import toMain from '../img/toMain.png';
import searchBtn from '../img/search.png';
import one from '../img/1.png';
import two from '../img/2.png';
import three from '../img/3.png';
import { Carousel } from 'react-bootstrap';
import axios from 'axios';

function Search() {
    const navigate = useNavigate();
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("/restaurant/menu", {
            withCredentials: true
        }).then(response => {
            setRestaurant(response.data);
            setLoading(false);
        }).catch(error => {
            console.error("There was an error fetching the restaurant data!", error);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div id="newBody">
            <header>
                <img src={logoImage} alt="logo"/>
            </header>

            <div id="searchBar">
                <img src={toMain} alt="toMain" onClick={() => navigate('/main')}/>
                <input type="text"
                       name="search"
                       className="search"
                       placeholder="지역, 음식 또는 식당 입력"
                />
                <img className="headerImg" src={searchBtn} onClick={() => navigate('/resultSearch')} alt="search"/>
            </div>
            <div className="search-options">
                <div>
                    <button className="search-option lemon">오늘 메뉴 검색</button>
                    <button className="search-option gray">내일 메뉴 검색</button>
                </div>
                <div>
                    <button className="search-option gray">지역명 검색</button>
                    <button className="search-option gray">식당명 검색</button>
                </div>
            </div>

            <div id="hot">
                <hr/>
                <p>오늘의 Hot 한 메뉴</p>
                <Carousel interval={2000}> {/* interval은 슬라이드 전환 간격을 밀리초 단위로 설정 */}
                    <Carousel.Item>
                        <img src={one}/>
                        <div className="d-block w-100">닭갈비</div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={two}/>
                        <div className="d-block w-100">닭볶음탕</div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={three}/>
                        <div className="d-block w-100">짜장면</div>
                    </Carousel.Item>
                </Carousel>
            </div>


            {/*/!*검색어 있을 경우*!/*/}
            {/*<section className="recent-searches">*/}
            {/*    <div className="recent-header">*/}
            {/*        <span>최근 검색어</span>*/}
            {/*        <button className="clear-all">모두 지우기</button> /!*누르면 전체 검색어 지워짐*!/*/}
            {/*    </div>*/}
            {/*    <ul className="recent-list">*/}
            {/*        <li className="recent-item">/!*검색한 개수만큼*!/*/}
            {/*            <div>*/}
            {/*                <img src={searchBtn}/>*/}
            {/*                <span>최근 검색어/!*최근 검색어*!/</span>*/}
            {/*            </div>*/}
            {/*            <div>*/}
            {/*                <span className="date">00.00/!*날짜*!/</span>*/}
            {/*                <button className="clear-item">X</button> /!*누르면 해당 검색어 지워짐*!/*/}
            {/*            </div>*/}
            {/*        </li>*/}
            {/*    </ul>*/}
            {/*</section>*/}
        </div>
    );
}

export default Search;
