import React, { useState } from "react";
import NoteContext from "./NoteContext";

function NoteState(props) {
  const host = "http://localhost:5000/api/notes";
  const [notes, setNotes] = useState([]);

  // ================= FETCH NOTES =================
  const getNote = async () => {
    try {
      const response = await fetch(host, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      const json = await response.json();
      setNotes(json || []);
      return json;
    } catch (error) {
      console.error("Error fetching notes:", error);
      setNotes([]);
    }
  };

  // ================= ADD NOTE =================
  const addNote = async (title, description, author, userEmail) => {
    try {
      const response = await fetch(host, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          title,
          description,
          author,
          userEmail, // ✅ attach user
        }),
      });

      const newNote = await response.json();

      // ✅ SAFE STATE UPDATE (important)
      setNotes((prevNotes) => [...prevNotes, newNote]);

      // ✅ RETURN new note for Home.js
      return newNote;
    } catch (error) {
      console.error("Error adding note:", error);
      return null;
    }
  };

  // ================= DELETE NOTE =================
  const deleteNote = async (id) => {
    try {
      await fetch(`${host}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      setNotes((prevNotes) =>
        prevNotes.filter((note) => note._id !== id)
      );
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // ================= UPDATE NOTE =================
  const editNote = async (id, updatedNote) => {
    try {
      const response = await fetch(`${host}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(updatedNote),
      });

      const updated = await response.json();

      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === id ? updated : note
        )
      );
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        addNote,
        deleteNote,
        getNote,
        editNote,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
}

export default NoteState;
