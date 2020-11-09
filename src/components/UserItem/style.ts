import styled from 'styled-components'

export const UserThumb = styled.li`
& {
    border: 1px solid ${props => props.theme.backgroundWeakerer};
    border: none;
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
    background-color: ${props => props.theme.backgroundWeakerer};
    border: 1px solid ${props => props.theme.backgroundWeakerer};
    background: inherit;
    border: none;
    padding: 15px 20px;
    text-align: left;
    border-radius: 0 0 5px 5px;

}

footer strong {
    font-size: 16px;
    color: ${props => props.theme.foregroundStronger};
}

footer small {
    display: block;
    line-height: 20px;
    height: 80px;
    overflow: hidden;
    
    font-size: 14px;
    color: ${props => props.theme.foregroundStronger};
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

&.placeholder .avatar div {
    background: #ccc;
    width: 56px;
    height: 56px;
}

&.placeholder footer {
    height: 200px;
}

&.placeholder footer p {
    height: 16px;
    margin-bottom: 3px;
    border-radius: 6px;
    background: #ccc;
}`;
