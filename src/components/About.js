import React from 'react';

const About = () => {
  return (
    <div className="container my-5">
      <div className="card shadow-lg border-0">
        <div className="card-body text-center">
          <h1 className="mb-4 text-primary">📘 Ebook Application</h1>
          <p className="lead text-muted">
            Welcome to the Ebook Application! This platform helps you manage your notes,
            create ebooks, and organize your content in a simple and effective way.
          </p>
          <hr className="my-4" />
          <div className="row mt-4">
            <div className="col-md-4">
              <div className="p-3 border rounded bg-light">
                <h4 className="text-success">🚀 Fast</h4>
                <p>Quickly add, edit, and delete notes with ease.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-3 border rounded bg-light">
                <h4 className="text-info">🎨 Simple UI</h4>
                <p>Clean and modern design for a smooth experience.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-3 border rounded bg-light">
                <h4 className="text-warning">🔒 Secure</h4>
                <p>Your notes are safe with authentication support.</p>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <button className="btn btn-primary btn-lg">Learn More</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
