import React, { useEffect, useState, useRef } from "react";
import "./ContactPage.css";
import mailboxImg from "../../assets/mailbox.jpg";
import {
  ArrowLeft,
  PenTool,
  Eraser,
  Trash2,
  Type,
  FileText,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { FiGithub, FiInstagram, FiLinkedin } from "react-icons/fi";
import { Footer } from "../layout/Footer";

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
  const [feedback, setFeedback] = useState<{
    type: "success" | "error" | "warning";
    message: string;
  } | null>(null);

  const showFeedback = (type: "success" | "error" | "warning", message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 5000);
  };

  const submitDrawing = async () => {
    const canvas = canvasRef.current;
    if (!canvas || !hasDrawn) {
      showFeedback("warning", "Please draw a message before sending.");
      return;
    }

    setIsSubmitting(true);

    try {
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
        showFeedback("success", "Your message was sent successfully!");
        clearCanvas();
      } else {
        showFeedback("error", "Failed to send message. Please try again.");
      }
    } catch {
      showFeedback("error", "An error occurred. Please try again later.");
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
    const scaleX = rect.width ? canvas.width / rect.width : 1;
    const scaleY = rect.height ? canvas.height / rect.height : 1;
    let clientX, clientY;

    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

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
    const scaleX = rect.width ? canvas.width / rect.width : 1;
    const scaleY = rect.height ? canvas.height / rect.height : 1;
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
    ctx.lineTo((clientX - rect.left) * scaleX, (clientY - rect.top) * scaleY);
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
            className="back-btn"
            onClick={() => onNavigate && onNavigate("home")}
            aria-label="Back to Home"
          >
            <ArrowLeft size={16} strokeWidth={2} />
            <span>Back to Home</span>
          </button>
        </div>

        {feedback && (
          <div className={`contact-feedback-banner ${feedback.type}`}>
            {feedback.type === "success" && <CheckCircle2 size={18} />}
            {feedback.type !== "success" && <AlertCircle size={18} />}
            <span>{feedback.message}</span>
          </div>
        )}

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
                <label htmlFor="contact-name">Full name</label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group" style={{ width: "100%" }}>
                <label htmlFor="contact-email">Email Address</label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                name="message"
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

        <div className="contact-footer-info">
          <div className="info-column">
            <h4>Socials</h4>
            <div className="contact-social-icons">
              <a
                href="https://instagram.com/samjerishd"
                target="_blank"
                rel="noreferrer"
                className="contact-social-circle"
                aria-label="Instagram"
              >
                <FiInstagram size={18} />
              </a>
              <a
                href="https://linkedin.com/in/samjerishd"
                target="_blank"
                rel="noreferrer"
                className="contact-social-circle"
                aria-label="LinkedIn"
              >
                <FiLinkedin size={18} />
              </a>
              <a
                href="https://github.com/samjerish"
                target="_blank"
                rel="noreferrer"
                className="contact-social-circle"
                aria-label="GitHub"
              >
                <FiGithub size={18} />
              </a>
            </div>
          </div>
          <div className="info-column">
            <h4>Resume</h4>
            <button
              onClick={() => onNavigate && onNavigate("resume")}
              className="contact-resume-pill"
            >
              <FileText size={16} />
              <span>View Resume</span>
            </button>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};
