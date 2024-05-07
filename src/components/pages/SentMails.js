import SideNavBar from "../../layout/SideNavBar";
import "./SentMails.css";
import SentMailList from "../mails/sentMails/SentMailList";
import { Container } from "react-bootstrap";

const SentMailsPage = () => {
  return (
    <div className="sent-mail-box-container">
      <SideNavBar />
      <Container className="table-container">
        <header className="sent-mails-header">Sent Mails</header>
        <SentMailList />
      </Container>
    </div>
  );
};

export default SentMailsPage;
