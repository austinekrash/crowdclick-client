import styled from 'styled-components'

const StyledCardNavbar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  .stepBack {
    padding-left: 20px;
    padding-top: 14px;
    text-decoration: underline;
    border: none;
    background-color: transparent;
    cursor: pointer;
  }

  .closeCard {
    padding-right: 20px;
    padding-top: 14px;
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
`

export default StyledCardNavbar