// import React, { useContext, useState } from "react";
// import NoteContext from "../context/NoteContext";

// const AddNote = ({ onNoteAdded }) => {
//   const { addNote } = useContext(NoteContext);

//   const [note, setNote] = useState({
//     title: "",
//     description: "",
//     author: ""
//   });

//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const userEmail = localStorage.getItem("userEmail");
//     if (!userEmail) {
//       setError("User not logged in. Please login again.");
//       return;
//     }

//     if (!note.title || !note.description || !note.author) {
//       setError("All fields are required");
//       return;
//     }

//     const newNote = await addNote(
//       note.title,
//       note.description,
//       note.author,
//       userEmail
//     );

//     // ✅ IMPORTANT: pass note back to Home.js
//     if (newNote && onNoteAdded) {
//       onNoteAdded(newNote);
//     }

//     setNote({ title: "", description: "", author: "" });
//     setError("");
//   };

//   const handleChange = (e) => {
//     setNote({ ...note, [e.target.name]: e.target.value });
//   };

//   return (
//     <div>
//       <h2>Add a New Note</h2>

//       {error && <div className="alert alert-danger">{error}</div>}

//       <form onSubmit={handleSubmit}>
//         <input
//           name="title"
//           value={note.title}
//           onChange={handleChange}
//           placeholder="Title"
//           className="form-control mb-2"
//         />

//         <textarea
//           name="description"
//           value={note.description}
//           onChange={handleChange}
//           placeholder="Description"
//           className="form-control mb-2"
//         />

//         <input
//           name="author"
//           value={note.author}
//           onChange={handleChange}
//           placeholder="Author"
//           className="form-control mb-3"
//         />

//         <button className="btn btn-primary">➕ Add Note</button>
//       </form>
//     </div>
//   );
// };

// export default AddNote;

import React, { useContext, useState } from "react";
import NoteContext from "../context/NoteContext";

const AddNote = ({ onNoteAdded }) => {
  const { addNote } = useContext(NoteContext);

  const [note, setNote] = useState({
    title: "",
    description: "",
    author: ""
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    // 🔐 Check if token exists
    if (!token) {
      setError("User not logged in. Please login again.");
      return;
    }

    // 📝 Validate fields
    if (!note.title || !note.description || !note.author) {
      setError("All fields are required");
      return;
    }

    try {
      const newNote = await addNote(
        note.title,
        note.description,
        note.author
      );

      if (newNote && onNoteAdded) {
        onNoteAdded(newNote);
      }

      // Reset form
      setNote({ title: "", description: "", author: "" });
      setError("");

    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="addnote-wrapper">
      <style>{`
        .addnote-wrapper {
          max-width: 900px;
          margin: 0 auto;
        }

        .addnote-wrapper h2 {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 18px;
          color: #0f172a;
        }

        .addnote-wrapper form {
          background: rgba(255,255,255,0.25);
          backdrop-filter: blur(12px);
          padding: 28px;
          border-radius: 22px;
          box-shadow: 0 30px 60px rgba(0,0,0,0.25);
        }

        .addnote-wrapper .form-control {
          border-radius: 14px;
          padding: 14px 16px;
          border: none;
          font-size: 15px;
          box-shadow: inset 0 0 0 1px rgba(0,0,0,0.1);
          transition: all 0.25s ease;
        }

        .addnote-wrapper .form-control:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(99,102,241,0.35);
        }

        textarea.form-control {
          min-height: 110px;
          resize: none;
        }

        .addnote-wrapper .btn-primary {
          margin-top: 10px;
          padding: 12px 22px;
          border-radius: 30px;
          border: none;
          font-weight: 600;
          font-size: 15px;
          background: linear-gradient(135deg,#6366f1,#8b5cf6);
          box-shadow: 0 12px 25px rgba(99,102,241,0.45);
          transition: all 0.25s ease;
        }

        .addnote-wrapper .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 18px 35px rgba(99,102,241,0.6);
        }

        .addnote-wrapper .alert-danger {
          border-radius: 14px;
          border: none;
          background: rgba(239,68,68,0.15);
          color: #7f1d1d;
          font-weight: 500;
          padding: 12px 16px;
          margin-bottom: 16px;
        }
      `}</style>

      <h2>Add a New Note</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          value={note.title}
          onChange={handleChange}
          placeholder="Title"
          className="form-control mb-2"
        />

        <textarea
          name="description"
          value={note.description}
          onChange={handleChange}
          placeholder="Description"
          className="form-control mb-2"
        />

        <input
          name="author"
          value={note.author}
          onChange={handleChange}
          placeholder="Author"
          className="form-control mb-3"
        />

        <button type="submit" className="btn btn-primary">
          ➕ Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
