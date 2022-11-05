import styled from 'styled-components';

export const ImageUpload = styled.div`
  display: flex;
  align-items: center;
  .image-drag-area {
    width: 90px;
    height: 50px;
    border: none;
    max-width: 100px;
    border-radius: 3px;
    font-size: 30px;
    color: #e6e6e6;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .ant-upload-text {
    font-size: 15px;
    font-weight: 700;
    color: #fff;
    background-color: #EE5A24;
    border-radius: 3px;
    padding: 8px 15px;
    margin-left: 30px;
  }
`;
