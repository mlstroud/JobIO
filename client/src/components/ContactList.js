import React from "react";
import Contact from "./Contact";
import { useState, useEffect } from "react";
import { useFirestore } from "react-redux-firebase";

function ContactList(props) {

  const firestore = useFirestore();
  const [contacts, setContacts] = useState(null);

  let contactData = [];

  useEffect(() => {
    firestore.collection("contacts").where("appId", "==", props.appId).get()
      .then((results) => {
        results.forEach((doc) => {
          contactData.push({
            data: doc.data(),
            id: doc.id
          });
        });
        setContacts(contactData);
      }).catch((error) => {
        console.log(error.message);
      });
  }, []);

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