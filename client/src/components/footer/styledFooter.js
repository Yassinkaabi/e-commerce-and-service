import styled from 'styled-components';

export const Container = styled.div`
  padding: 80px 60px;
  background: #282c34e6;

  @media (max-width: 1000px) {
    padding: 70px 30px;
  }
  @media (max-width: 920px) {
    padding: 50px 20px;
  }
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 1000px;
    margin: 0 auto;
    /* background: red; */
`

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 60px;

  @media (max-width: 920px) {
    margin-left: 60px;
  }
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  grid-gap: 20px;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
`;

export const Link = styled.a`
  color: #fff;
  margin-bottom: 20px;
  font-size: 18px;
  text-decoration: none;

  &:hover {
      color: #ff9c00;
      transition: 200ms ease-in;
  }
  @media (max-width: 920px) {
    margin-bottom: 10px;
    font-size: 13px;  
  }
`;

export const Title = styled.p`
  font-size: 24px;
  color: #fff;
  margin-bottom: 40px;
  font-weight: bold;
  
  @media (max-width: 920px) {
    margin-bottom: 20px;
    font-size: 16px;  
  }
`;