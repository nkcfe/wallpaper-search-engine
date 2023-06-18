import styled from 'styled-components';
import ToggleThemeButton from './component/ToggleThemeButton';
import Hero from './component/Hero';
import ResultContainer from './component/ResultContainer';
import Footer from './component/Footer';
import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import getWallpapers from './api/getWallpapers';

const Container = styled.div`
    position: relative;
    background-color: var(--primary);
    transition: background-color 0.5s;
    min-height: 100vh;
`;

function App() {
    const [data, setData] = useState({}); // pixa 이미지 데이터
    const [query, setQuery] = useState(''); // 검색어
    const [order, setOrder] = useState('popular'); // 정렬
    const [orientation, setOrientation] = useState('all'); // 사진 방향
    const [page, setPage] = useState(1); // 현재 페이지
    const [perPage, setPerPage] = useState(20); // 페이지 당 갯수

    const numberOfPages = data.totalHits
        ? Math.ceil(data.totalHits / perPage)
        : 0;

    useEffect(() => {
        const fetch = async () => {
            const data = await getWallpapers({
                q: query,
                orientation: orientation,
                order: order,
                page: page,
                per_page: perPage,
            });
            setData(data);
        };
        fetch();
    }, [query, orientation, order, page, perPage]);

    return (
        <>
            <Container>
                <Hero
                    setQuery={setQuery}
                    setOrder={setOrder}
                    setOrientation={setOrientation}
                    setPerPage={setPerPage}
                />
                <ResultContainer
                    data={data}
                    page={page}
                    setPage={setPage}
                    numberOfPages={numberOfPages}
                />
                <Footer />
                <ToggleThemeButton />
            </Container>
        </>
    );
}

export default App;
