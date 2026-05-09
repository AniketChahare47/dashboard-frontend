/* eslint-disable */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import NoteContext from "../context/NoteContext";

const COLORS = [
  "#6366f1",
  "#22c55e",
  "#0ea5e9",
  "#f97316",
  "#a855f7",
];

const Notes = ({ mode = "user", search = "", toast }) => {
  const { notes, getNote, deleteNote, editNote } = useContext(NoteContext);

  const [selectedNote, setSelectedNote] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    getNote();
  }, []);

  const filtered = Array.isArray(notes)
    ? notes.filter(
        (n) =>
          n.title.toLowerCase().includes(search.toLowerCase()) ||
          n.description.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  useEffect(() => {
    if (filtered.length > 0 && !selectedNote) {
      setSelectedNote(filtered[0]);
    }
  }, [notes, search, selectedNote]);

  const handleDelete = async (id) => {
    await deleteNote(id);
    toast?.error("Note deleted");
    setSelectedNote(null);
  };

  const handleEditClick = () => {
    setEditData({
      title: selectedNote.title,
      description: selectedNote.description,
    });
    setShowModal(true);
  };

  const handleSaveEdit = async () => {
    await editNote(selectedNote._id, editData);
    toast?.success("Note updated successfully");
    setShowModal(false);
  };

  return (
    <>
      <style>{`
        .split-wrapper {
          display: grid;
          grid-template-columns: 340px 1fr;
          height: calc(100vh - 200px);
          background: #f8fafc;
          border-radius: 18px;
          overflow: hidden;
        }

        .note-list {
          background: #ffffff;
          border-right: 1px solid #e5e7eb;
          padding: 14px;
          overflow-y: auto;
        }

        .note-list-card {
          padding: 14px 14px 14px 16px;
          border-radius: 14px;
          margin-bottom: 12px;
          cursor: pointer;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          transition: all 0.2s ease;
          position: relative;
        }

        .note-list-card.active {
          background: #eef2ff;
          border-color: #c7d2fe;
        }

        .note-accent {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 4px;
          border-radius: 14px 0 0 14px;
        }

        .note-preview {
          padding: 36px;
          overflow-y: auto;
          background: #f9fafb;
        }

        .preview-card {
          background: #ffffff;
          border-radius: 18px;
          padding: 32px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          border-top: 4px solid var(--accent);
        }

        .preview-actions {
          margin-top: 28px;
          display: flex;
          gap: 12px;
        }

        .edit-btn,
        .delete-btn {
          padding: 10px 18px;
          border-radius: 8px;
          border: none;
          font-weight: 600;
          cursor: pointer;
          color: white;
        }

        .edit-btn {
          background: #6366f1;
        }

        .delete-btn {
          background: #ef4444;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 200;
        }

        .modal-box {
          background: white;
          padding: 28px;
          border-radius: 16px;
          width: 400px;
          max-width: 90%;
        }

        .modal-box h3 {
          margin-bottom: 16px;
        }

        .modal-box input,
        .modal-box textarea {
          width: 100%;
          margin-bottom: 12px;
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #ccc;
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
        }

        .save-btn {
          background: #22c55e;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
        }

        .cancel-btn {
          background: #6b7280;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
        }
      `}</style>

      <div className="split-wrapper">
        <div className="note-list">
          {filtered.map((note, index) => {
            const color = COLORS[index % COLORS.length];

            return (
              <div
                key={note._id}
                className={`note-list-card ${
                  selectedNote?._id === note._id ? "active" : ""
                }`}
                onClick={() => setSelectedNote(note)}
              >
                <div
                  className="note-accent"
                  style={{ background: color }}
                ></div>

                <h4>{note.title}</h4>
                <span>{note.author}</span>
              </div>
            );
          })}
        </div>

        <div className="note-preview">
          {!selectedNote ? (
            <p>Select a note to preview</p>
          ) : (
            <div
              className="preview-card"
              style={{
                "--accent":
                  COLORS[
                    filtered.findIndex((n) => n._id === selectedNote._id) %
                      COLORS.length
                  ] || "#6366f1",
              }}
            >
              <h2>{selectedNote.title}</h2>

              <p style={{ whiteSpace: "pre-wrap" }}>
                {selectedNote.description}
              </p>

              <small>Author: {selectedNote.author}</small>

              {mode === "update" && (
                <div className="preview-actions">
                  <button
                    className="edit-btn"
                    onClick={handleEditClick}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(selectedNote._id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Edit Note</h3>

            <input
              type="text"
              value={editData.title}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  title: e.target.value,
                })
              }
            />

            <textarea
              rows="4"
              value={editData.description}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  description: e.target.value,
                })
              }
            />

            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button
                className="save-btn"
                onClick={handleSaveEdit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Notes;