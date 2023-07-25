import React, { useState } from "react";
import "./App.css";
import contactsJSON from "./contacts.json";

function App() {
  const [contacts, setContacts] = useState(contactsJSON.slice (0,5));

  const addRandomContact = () => {
    const remainingContacts = contactsJSON.filter(
      (contact) => !contacts.some((c) => c.id === contact.id)
    );

    if (remainingContacts.length === 0) {
      alert("no more contats to add");
      return;
    }

    const randomIndex = Math.floor(Math.random() * remainingContacts.length);
    const randomContact = remainingContacts[randomIndex];
    setContacts((prevContacts) => [...prevContacts, randomContact]);
  };

  const sortByName = () => {
    const sortedContacts = [...contacts].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setContacts(sortedContacts);
  };

  const sortByPopularity = () => {
    const sortedContacts = [...contacts].sort((a, b) => b.popularity - a.popularity);
    setContacts(sortedContacts);
  };


  const deleteContact = (id) => {
    const updatedContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(updatedContacts);
  };


  return (
    <div className="App">
      <h1>LAB | React IronContacts</h1>
      <button onClick={addRandomContact}>Add Random Contact</button>
      <button onClick={sortByName}>Sort by Name</button>
      <button onClick={sortByPopularity}>Sort by Popularity</button>
      <table>
        <thead>
          <tr>
            <th>Pictures</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won an Oscar</th>
            <th>Won an Emmy</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((oneContact) => (
            <tr key={oneContact.id}>
              <td>
                <img
                  src={oneContact.pictureUrl}
                  alt={oneContact.name}
                  style={{ height: "200px" }}
                />
              </td>
              <td>
                <h3>{oneContact.name}</h3>
              </td>
              <td>
                <h3>{oneContact.popularity}</h3>
              </td>
              <td>
                {oneContact.wonOscar ? (
                  <span role="img" aria-label="Oscar Trophy">
                    🏆
                  </span>
                ) : null}
              </td>
              <td>
                {oneContact.wonEmmy ? (
                  <span role="img" aria-label="Emmy Trophy">
                    🏆
                  </span>
                ) : null}
              </td>
              <td>
                <button onClick={() => deleteContact(oneContact.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;