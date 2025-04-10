import React, { useState } from "react";
import img2 from "./assects/img2.png";
import img3 from "./assects/img3.jpeg";
import img1 from "./assects/img1.jpeg";
import img4 from "./assects/img 4.jpeg";
import img5 from "./assects/img 5.jpeg";
import img7 from "./assects/img7.webp";

function Home() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      {/* Header Section */}
      <header>
        <div
          className="p-5 text-center bg-image mt-3"
          style={{
            backgroundImage: "url(" + img7 + ")",
            height: "250px",
          }}
        >
          <div className="mask">
            <div className="d-flex justify-content-center align-items-center h-100">
              <div className="text-white">
                <h1 className="mb-3">EventsOn</h1>
                <h4 className="mb-3">The Platform for Managing Events</h4>
                <button
                  className="btn btn-outline-light btn-lg"
                  onClick={() => setShowModal(true)}
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Carousel Section */}
      <div className="container mt-5">
        <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="false">
          <div className="carousel-indicators">
            {[...Array(3)].map((_, index) => (
              <button
                key={index}
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to={index}
                className={index === 0 ? "active" : ""}
                aria-current={index === 0 ? "true" : "false"}
                aria-label={`Slide ${index + 1}`}
              ></button>
            ))}
          </div>
          <div className="carousel-inner">
            {[img2,img3, img4].map((image, index) => (
              <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                <img src={image} className="d-block w-100" alt="Event Slide" />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Slide {index + 1}</h5>
                  <p>Some representative placeholder content for this slide.</p>
                </div>
              </div>
            ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      {/* Contact Us Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Contact Us</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Email: support@eventson.com</p>
                <p>Contact: +91 9999999999</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={() => setShowModal(false)}>
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Background Overlay when Modal is Open */}
      {showModal && <div className="modal-backdrop fade show"></div>}
    </div>
  );
}

export default Home;
