import styled from 'styled-components';
import { useState } from 'react';
import DummyData from '../asset/dummyData';
import ImageCard from './ImageCard';
import ImageModal from './ImageModal';
import Pagination from './Pagination';
import EmptyResult from './EmptyResult';
import getWallpapers from '../api/getWallpapers';

const Container = styled.div`
    max-width: 1830px;
    margin: 8px auto;
    padding-right: 8px;
`;

const ResultsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
`;

const ResultContainer = ({ data, page, setPage, numberOfPages }) => {
    const [currentImageDetail, setCurrentImageDetail] = useState(null);

    return (
        <Container>
            {/* ImgCard 클릭 시 해당 이미지의 정보로 ImageModal이 나타나야 합니다. */}
            {currentImageDetail && (
                <ImageModal
                    currentImageDetail={currentImageDetail}
                    setCurrentImageDetail={setCurrentImageDetail}
                />
            )}
            {data.hits?.length > 0 && (
                <Pagination
                    page={page}
                    setPage={setPage}
                    numberOfPages={numberOfPages}
                />
            )}
            <ResultsWrapper>
                {/* 3항 연산자로 data가 없을 경우 처리 */}
                {data.hits?.length > 0 ? (
                    data?.hits?.map((imgData) => (
                        <ImageCard
                            key={imgData.id}
                            imgData={imgData}
                            onClick={() => setCurrentImageDetail(imgData)}
                        />
                    ))
                ) : (
                    <EmptyResult />
                )}
            </ResultsWrapper>
        </Container>
    );
};

export default ResultContainer;
