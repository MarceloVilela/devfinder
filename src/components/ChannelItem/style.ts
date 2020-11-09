import styled from 'styled-components'

export const ChannelThumb = styled.li`
.avatar {
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar img {
  width: 64px;
  border-radius: 32px;
}

aside {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  justify-content: center;
  padding: 15px 20px;
  text-align: left;
  border-radius: 0 0 5px 5px;
}

aside strong {
  font-size: 16px;
  color: ${props => props.theme.foregroundStronger};
}

aside small {
  font-size: 14px;
  color: ${props => props.theme.foregoundStrong};
  margin-top: 5px;
  line-height: 20px;
  height: 40px;
  overflow: hidden;
}

&.placeholder .avatar {
  width: 64px;
  height: 64px;
  border-radius: 32px;
  background: #ccc;
}

&.placeholder aside p {
  height: 16px;
  margin-bottom: 3px;
  border-radius: 6px;
  background: #ccc;
}`;