import { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as SearchIcon } from '../asset/search.svg';
import SearchTag from './SearchTag';
import SearchOption from './SearchOption';
import { useEffect } from 'react';

const SearchTagContainer = styled.div`
    display: flex;
    width: 100%;
    overflow: auto;
    justify-content: center;
`;

const SearchBoxContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 16px;
    padding: 4px 16px;
    width: 100%;
    align-items: center;
    border-radius: 8px;
    background-color: #ffffff;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
`;

const SearchInputContainer = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
`;

const SearchInput = styled.input`
    background: transparent;
    font-size: 16px;
    outline: none;
    color: #5e5e5e;
    border: none;
    flex: auto;
    margin-left: 8px;
`;

const SearchOptionButton = styled.p`
    cursor: pointer;
    font-size: 14px;
    text-decoration: underline;
    color: #5e5e5e;
`;

const Search = ({ setQuery, setOrder, setOrientation, setPerPage }) => {
    const savedSearchTags = localStorage.getItem('searchTags');
    const initialSearchTags = savedSearchTags
        ? JSON.parse(savedSearchTags)
        : [];
    const [searchOption, setSearchOption] = useState(false);
    // input 값
    const [inputState, setInputState] = useState('');
    // tag
    const [searchTags, setSearchTags] = useState(initialSearchTags);
    const toggleSearchOption = () => {
        setSearchOption((prev) => !prev);
    };

    // Enter키 누를 경우 작동
    const onSearch = (e) => {
        if (e.key === 'Enter') {
            const currentValue = e.target.value;
            // 검색어 적용
            setQuery(currentValue);
            // input 비우기
            setInputState('');
            // tag 값 설정
            setSearchTags((prev) => [...prev, currentValue]);
        }
    };

    // tag 누를 경우 검색 및 input 검색어로 설정
    const searchTag = (tag) => {
        // 검색어 태그로 변경
        setQuery(tag);
        // input값 태그로 변경
        setInputState(tag);
    };

    // 태그 삭제 기능
    const deleteTag = (idx) => {
        // searchTags 복사
        const newSearchTags = [...searchTags];
        // splice()함수로 idx부터 1개 삭제
        newSearchTags.splice(idx, 1);
        setSearchTags(newSearchTags);
    };

    useEffect(() => {
        localStorage.setItem('searchTags', JSON.stringify(searchTags));
    }, [searchTags]);

    return (
        <>
            <SearchBoxContainer>
                <SearchInputContainer>
                    <SearchIcon width="24" fill="#5e5e5e" />
                    <SearchInput
                        placeholder="검색어 입력 후 ENTER"
                        onKeyDown={onSearch}
                        onChange={(e) => setInputState(e.target.value)}
                        value={inputState}
                    />
                    <SearchOptionButton onClick={toggleSearchOption}>
                        검색 옵션 {searchOption ? '닫기' : '열기'}
                    </SearchOptionButton>
                </SearchInputContainer>
                {searchOption && (
                    <SearchOption
                        setOrder={setOrder}
                        setOrientation={setOrientation}
                        setPerPage={setPerPage}
                    />
                )}
            </SearchBoxContainer>
            <SearchTagContainer>
                {searchTags.map((tag, idx) => (
                    <SearchTag
                        key={tag}
                        deleteTag={() => deleteTag(idx)}
                        tag={tag}
                        searchTag={() => searchTag(tag)}
                    />
                ))}
            </SearchTagContainer>
        </>
    );
};

export default Search;
