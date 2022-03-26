import { Avatar } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { auth, db } from "../firebase";
import getEmail from "../utils/getEmail";
import { useRouter } from "next/router";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-radius: 40px 40px 0px 0px;

  padding: 0 1rem;
  height: 130px;
  min-width: 180px;
  margin-left: 1rem;

  color: #414242;
  word-break: break-word;
  cursor: pointer;

  @media only screen and (max-width: 840px) {
    justify-content: end;
    height: 100px;
    min-width: 130px;
    width: 150px;
    padding: 0 0.4rem;
    margin-left: 0.2rem;
    border-radius: 30px 30px 0px 0px;
    p {
      font-size: 0.8rem;
    }
  }

  :hover {
    background: linear-gradient(
      0deg,
      rgba(226, 186, 255, 1) 0%,
      rgba(129, 228, 255, 1) 100%
    );
  }
`;
const UserImage = styled(Avatar)`
  transform: scale(1.2);

  @media only screen and (max-width: 840px) {
    transform: scale(1);
  }
`;

const UserChat = ({ id, users }) => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [recipientSnapshot] = useCollection(
    db.collection("users").where("email", "==", getEmail(users, user))
  );
  const recipient = recipientSnapshot?.docs?.[0]?.data();
  const recipientEmail = getEmail(users, user);

  const enterChat = () => {
    router.push(`/chat/${id}`);
  };

  return (
    <Container onClick={enterChat}>
      {recipient ? (
        <UserImage src={recipient?.photoURL}></UserImage>
      ) : (
        <UserImage>{recipientEmail[0]}</UserImage>
      )}
      <p>{recipientEmail}</p>
    </Container>
  );
};

export default UserChat;
