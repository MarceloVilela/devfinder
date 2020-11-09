import styled from 'styled-components';

export const UsersList = styled.ul`
  display: grid;
  grid-gap: 48px;
  grid-template-columns: repeat(1, 1fr);

@media (min-width: 768px) {
    & {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (min-width: 992px) {
    & {
        grid-template-columns: repeat(3, 1fr);
    }
}

/*
@media (min-width: 600px) {
    {
        grid-gap: 16px;;
        grid-template-columns: repeat(3, 1fr); 
    }

    .avatar img {
        max-width: 100%;
        width: 100%;
        border-radius: 5px 5px 0 0;
    }
}
*/
`;

/*
li {
    border: 1px solid #685394;
    border-radius: 10px;
}

.avatar {
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar img {
    max-width: 100%;
    width: 96px;
    border-radius: 5px 5px 0 0;
}

footer {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    background-color: #3d3451;
    border: 1px solid #3d3451;
    padding: 15px 20px;
    text-align: left;
    border-radius: 0 0 5px 5px;

}

footer strong {
    font-size: 16px;
    color: #eee;
}

footer small {
    display: block;
    line-height: 20px;
    height: 80px;
    overflow: hidden;
    
    font-size: 14px;
    color: #c1bec7;
    margin-top: 5px;
}

.buttons {
    margin-top: 10px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
}

.buttons button {
    height: 50px;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.05);
    border: 0;
    border-radius: 4px;
    background: #685394;
    cursor: pointer;
}

.buttons button svg {
    font-size: 24px;
    color: #FFF;
}

.buttons button:hover svg {
    transform: translateY(-5px);
    transition: all .2s;
}

.buttons button:hover svg.dislike {
  transform: translateY(+5px);
  transition: all .2s;
}

.main-container .empty {
    font-size: 32px;
    color: #c1bec7;
    font-weight: bold;
    margin-top: 300px;
}

.buttons.single {
    grid-template-columns: repeat(1, 1fr);
}

.buttons.single button {
    color: #FFF;
    display: flex;
    align-items: center;
    justify-content: center;
}

.buttons.single button  svg{
    margin-right: 10px;
}
*/
