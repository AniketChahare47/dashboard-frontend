import React, { useState, useEffect } from "react";

const NoteItem = ({
  note,
  handleUpdate,
  handleDelete,
  showActions = false,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const [title, setTitle] = useState(note.title);
  const [description, setDescription] = useState(note.description);
  const [author, setAuthor] = useState(note.author);

  // 🔁 Sync local state when note updates
  useEffect(() => {
    setTitle(note.title);
    setDescription(note.description);
    setAuthor(note.author);
  }, [note]);

  const onSave = () => {
    if (!title.trim() || !description.trim()) return;
    handleUpdate(note._id, { title, description, author });
    setIsEditing(false);
  };

  const onDelete = () => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      handleDelete(note._id);
    }
  };

  return (
    <div className="note-card">
      {/* ===== VIEW MODE ===== */}
      {!isEditing && (
        <>
          <h3 className="note-title">{note.title}</h3>

          <p className="note-desc">{note.description}</p>

          <p className="note-author">
            <strong>Author:</strong> {note.author}
          </p>

          {showActions && (
            <div className="note-actions">
              <button className="btn-edit" onClick={() => setIsEditing(true)}>
                ✏️ Edit
              </button>

              <button className="btn-delete" onClick={onDelete}>
                🗑 Delete
              </button>
            </div>
          )}
        </>
      )}

      {/* ===== EDIT MODE ===== */}
      {isEditing && (
        <>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Note description"
          />

          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Author"
          />

          <div className="note-actions">
            <button className="btn-save" onClick={onSave}>
              ✅ Save
            </button>

            <button className="btn-cancel" onClick={() => setIsEditing(false)}>
              ❌ Cancel
            </button>
          </div>
        </>
      )}

      {/* ===== PREMIUM CARD STYLES ===== */}
      <style>{`
        .note-card {
          background: linear-gradient(
            135deg,
            rgba(255,255,255,0.28),
            rgba(255,255,255,0.14)
          );
          backdrop-filter: blur(18px);
          border-radius: 20px;
          padding: 26px;
          color: #ffffff;
          box-shadow: 0 28px 60px rgba(0,0,0,0.45);
          border: 1px solid rgba(255,255,255,0.25);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .note-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 40px 80px rgba(0,0,0,0.55);
        }

        .note-title {
          font-size: 21px;
          font-weight: 800;
          margin-bottom: 10px;
          color: #ffffff;
        }

        .note-desc {
          font-size: 14.5px;
          line-height: 1.7;
          margin-bottom: 14px;
          color: rgba(255,255,255,0.95);
        }

        .note-author {
          font-size: 13px;
          margin-bottom: 16px;
          color: rgba(255,255,255,0.75);
        }

        input,
        textarea {
          width: 100%;
          padding: 12px 14px;
          margin-bottom: 12px;
          border-radius: 12px;
          border: none;
          outline: none;
          font-size: 14px;
          background: rgba(255,255,255,0.9);
          color: #0f172a;
        }

        textarea {
          resize: none;
          min-height: 90px;
        }

        .note-actions {
          display: flex;
          gap: 12px;
          margin-top: 12px;
        }

        .btn-edit,
        .btn-save {
          background: linear-gradient(135deg, #22c55e, #16a34a);
          border: none;
          color: white;
          padding: 9px 18px;
          border-radius: 22px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
        }

        .btn-delete {
          background: linear-gradient(135deg, #ef4444, #dc2626);
          border: none;
          color: white;
          padding: 9px 18px;
          border-radius: 22px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
        }

        .btn-cancel {
          background: rgba(255,255,255,0.25);
          border: none;
          color: white;
          padding: 9px 18px;
          border-radius: 22px;
          font-size: 13px;
          cursor: pointer;
        }

        /* 🌞 LIGHT MODE FIX */
        .home-wrapper.light .note-card {
          background: #ffffff;
          color: #0f172a;
        }

        .home-wrapper.light .note-title {
          color: #0f172a;
        }

        .home-wrapper.light .note-desc {
          color: #334155;
        }

        .home-wrapper.light .note-author {
          color: #475569;
        }
      `}</style>
    </div>
  );
};

export default NoteItem;
