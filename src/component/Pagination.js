import styled from 'styled-components';
import { ReactComponent as PrevIcon } from '../asset/prev.svg';
import { ReactComponent as NextIcon } from '../asset/next.svg';

const Nav = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin: 16px;
    color: var(--text); ;
`;

const PageSelect = styled.select`
    cursor: pointer;
    background-color: var(--primary);
    border: none;
    font-size: 16px;
    color: var(--highlight);
    font-weight: bold;
    font-family: inherit;
    &:focus {
        outline: none;
    }
`;

const Pagination = ({ page, setPage, numberOfPages }) => {
    return (
        <Nav>
            {/* page가 1이 아닐 경우에만 이전 버튼 표시 */}
            {page !== 1 && (
                <PrevIcon
                    width="24"
                    cursor="pointer"
                    fill="var(--text)"
                    onClick={() => setPage((prev) => prev - 1)}
                />
            )}
            {`총 ${numberOfPages} 중 `}
            <PageSelect
                name="page"
                value={page}
                onChange={(e) => setPage(parseInt(e.target.value))}
            >
                {Array(numberOfPages)
                    .fill()
                    .map((data, idx) => (
                        <option value={idx + 1} key={idx}>
                            {idx + 1}
                        </option>
                    ))}
            </PageSelect>
            페이지
            {/* page가 25가 아닐 경우에만 다음 버튼 표시 */}
            {page !== 25 && (
                <NextIcon
                    width="24"
                    cursor="pointer"
                    fill="var(--text)"
                    onClick={() => setPage((prev) => prev + 1)}
                />
            )}
        </Nav>
    );
};

export default Pagination;
