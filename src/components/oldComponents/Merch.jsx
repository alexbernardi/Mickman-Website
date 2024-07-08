import styled from 'styled-components';

const Merch = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 2rem;
  div {
    margin: 1rem;
    text-align: center;
    img {
      width: 150px;
      height: 150px;
    }
  }
`;

const MerchComponent = () => (
  <Merch>
    <div>
      <img src="merch-item1.jpg" alt="Merch Item 1" />
      <p><a href="https://musician.com/merch/item1">Merch Item 1</a></p>
    </div>
    <div>
      <img src="merch-item2.jpg" alt="Merch Item 2" />
      <p><a href="https://musician.com/merch/item2">Merch Item 2</a></p>
    </div>
  </Merch>
);

export default MerchComponent;
