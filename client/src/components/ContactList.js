import React from "react";
import Contact from "./Contact";

function ContactList(props) {

  const { contacts } = props;

  return (
    <React.Fragment>
      {contacts !== null && contacts.map((contact) => {
        return <Contact
          key={contact.id}
          id={contact.id}
          name={contact.data.name}
          email={contact.data.email}
          phone={contact.data.phone}
        />
      })}
    </React.Fragment>
  );
}

export default ContactList;