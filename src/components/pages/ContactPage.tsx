import React, { useEffect, useState, useRef } from "react";
import "./ContactPage.css";
import mailboxImg from "../../assets/mailbox.jpg";
import {
  ArrowUpRight,
  PenTool,
  Eraser,
  Trash2,
  Type,
  FileText,
} from "lucide-react";
import { FiGithub, FiInstagram, FiLinkedin } from "react-icons/fi";

export const ContactPage: React.FC<{
  onNavigate?: (
    page: "home" | "media" | "about" | "projects" | "contact" | "resume",
  ) => void;
}> = ({ onNavigate }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [inputMode, setInputMode] = useState<"draw" | "type">("draw");
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentColor, setCurrentColor] = useState("#000000");
  const [lineWidth, setLineWidth] = useState(3);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [activeTool, setActiveTool] = useState<"pen" | "eraser">("pen");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitDrawing = async () => {
    const canvas = canvasRef.current;
    if (!canvas || !hasDrawn) {
      alert("Please draw a message before sending!");
      return;
    }

    setIsSubmitting(true);

    try {
      // Use JPEG with 0.5 quality to keep the base64 string very small
      // Formspree free tier ignores file blobs, so we send it as a text field.
      const dataUrl = canvas.toDataURL("image/jpeg", 0.5);

      const formData = new FormData();
      formData.append("message_type", "User Drawing");
      formData.append("drawing_image_base64", dataUrl);

      const response = await fetch("https://formspree.io/f/xljerddq", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        alert("Message sent successfully!");
        clearCanvas();
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch {
      alert("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  // Sync cursor color to CSS variable for CustomCursor
  useEffect(() => {
    const cursorColor = activeTool === "eraser" ? "#a0a0a0" : currentColor;
    document.documentElement.style.setProperty(
      "--cursor-canvas-color",
      cursorColor,
    );
  }, [currentColor, activeTool]);

  // Initialize canvas context
  useEffect(() => {
    if (inputMode === "draw" && canvasRef.current) {
      const canvas = canvasRef.current;
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = 400; // Fixed height for drawing area
      }

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        // Fill white background initially
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, [inputMode]);

  const startDrawing = (
    e:
      React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>,
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
    setHasDrawn(true);
  };

  const draw = (
    e:
      React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>,
  ) => {
    if (!isDrawing) return;
    e.preventDefault(); // Prevent scrolling on touch devices while drawing
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    ctx.strokeStyle = activeTool === "eraser" ? "#ffffff" : currentColor;
    ctx.lineWidth = activeTool === "eraser" ? 20 : lineWidth;
    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  const colors = ["#000000", "#ef4444", "#3b82f6", "#22c55e", "#eab308"];

  return (
    <div className="contact-page-wrapper">
      {/* LEFT SIDE - IMAGE */}
      <div className="contact-image-section">
        <img src={mailboxImg} alt="Contact Mailbox" className="contact-image" />
      </div>

      {/* RIGHT SIDE - FORM */}
      <div className="contact-form-section">
        <div className="form-header">
          <button
            className="return-btn"
            onClick={() => onNavigate && onNavigate("home")}
          >
            Return to home{" "}
            <span className="arrow-box">
              <ArrowUpRight size={14} />
            </span>
          </button>
        </div>

        <div className="form-title-row">
          <h1 className="form-title">Send a message</h1>
        </div>

        {/* MODE TOGGLE */}
        <div className="mode-toggle">
          <button
            className={`toggle-btn ${inputMode === "draw" ? "active" : ""}`}
            onClick={() => setInputMode("draw")}
          >
            <PenTool size={16} /> Draw Message
          </button>
          <button
            className={`toggle-btn ${inputMode === "type" ? "active" : ""}`}
            onClick={() => setInputMode("type")}
          >
            <Type size={16} /> Type Message
          </button>
        </div>

        {inputMode === "type" ? (
          <form
            className="contact-form"
            action="https://formspree.io/f/xljerddq"
            method="POST"
          >
            <div className="form-row">
              <div className="form-group" style={{ width: "100%" }}>
                <label>Full name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group" style={{ width: "100%" }}>
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea
                name="message"
                placeholder="Dear Sam,"
                rows={6}
                required
              ></textarea>
            </div>

            <button type="submit" className="submit-btn">
              Send to Sam
            </button>
          </form>
        ) : (
          <div className="whiteboard-container">
            <div className="whiteboard-toolbar">
              <div className="color-palette">
                {colors.map((color) => (
                  <button
                    key={color}
                    className={`color-btn ${currentColor === color && activeTool === "pen" ? "active" : ""}`}
                    style={{ backgroundColor: color }}
                    onClick={() => {
                      setCurrentColor(color);
                      setActiveTool("pen");
                      setLineWidth(3);
                    }}
                    title={`Color: ${color}`}
                  />
                ))}
              </div>
              <div className="toolbar-actions">
                <button
                  className={`tool-btn ${activeTool === "pen" ? "active" : ""}`}
                  onClick={() => {
                    setActiveTool("pen");
                    setLineWidth(3);
                  }}
                  title="Pen"
                >
                  <PenTool size={18} />
                </button>
                <button
                  className={`tool-btn ${activeTool === "eraser" ? "active" : ""}`}
                  onClick={() => setActiveTool("eraser")}
                  title="Eraser"
                >
                  <Eraser size={18} />
                </button>
                <button
                  className="tool-btn clear-btn"
                  onClick={clearCanvas}
                  title="Clear Board"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <div className="canvas-wrapper hoverable-canvas">
              {!hasDrawn && (
                <div className="canvas-placeholder">
                  Draw here to send your message!
                </div>
              )}
              <canvas
                ref={canvasRef}
                className="drawing-canvas"
                style={{ cursor: "crosshair" }}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
              />
            </div>

            <button
              className="submit-btn"
              onClick={submitDrawing}
              disabled={isSubmitting}
              style={{ marginTop: "1rem", opacity: isSubmitting ? 0.7 : 1 }}
            >
              {isSubmitting ? "Sending..." : "Send to Sam"}
            </button>
          </div>
        )}

        <div
          className="contact-footer-info"
          style={{ gap: "2rem", flexWrap: "wrap", marginTop: "1rem" }}
        >
          <div className="info-column">
            <h4>Socials</h4>
            <div style={{ display: "flex", gap: "1rem" }}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                style={{ color: "#E1306C", transition: "transform 0.2s" }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.1)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <FiInstagram size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                style={{ color: "#0077b5", transition: "transform 0.2s" }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.1)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <FiLinkedin size={24} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                style={{ color: "#ffffff", transition: "transform 0.2s" }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.1)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <FiGithub size={24} />
              </a>
            </div>
          </div>
          <div className="info-column">
            <h4>Resume</h4>
            <button
              onClick={() => onNavigate && onNavigate("resume")}
              style={{
                background: "transparent",
                border: "none",
                color: "#ffffff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: 0,
                fontSize: "0.9rem",
                fontFamily: "monospace",
                transition: "color 0.2s",
                fontWeight: "bold",
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = "#ccc")}
              onMouseOut={(e) => (e.currentTarget.style.color = "#ffffff")}
            >
              <FileText size={16} /> VIEW RESUME
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
