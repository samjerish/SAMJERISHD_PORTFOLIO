import React, { useEffect, useState, useRef } from 'react';
import './ContactPage.css';
import { MailboxGraphic } from './MailboxGraphic';
import { ArrowUpRight, PenTool, Eraser, Trash2, Type, FileText } from 'lucide-react';
import { FiGithub, FiInstagram, FiLinkedin } from 'react-icons/fi';

export const ContactPage: React.FC<{ onNavigate: (page: 'home' | 'media' | 'about' | 'projects' | 'contact') => void }> = ({ onNavigate }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [inputMode, setInputMode] = useState<'draw' | 'type'>('draw');
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentColor, setCurrentColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(3);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [activeTool, setActiveTool] = useState<'pen' | 'eraser'>('pen');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Sync cursor color to CSS variable for CustomCursor
  useEffect(() => {
    const cursorColor = activeTool === 'eraser' ? '#a0a0a0' : currentColor;
    document.documentElement.style.setProperty('--cursor-canvas-color', cursorColor);
  }, [currentColor, activeTool]);

  // Initialize canvas context
  useEffect(() => {
    if (inputMode === 'draw' && canvasRef.current) {
      const canvas = canvasRef.current;
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = 400; // Fixed height for drawing area
      }
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        // Fill white background initially
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, [inputMode]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if ('touches' in e) {
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

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    e.preventDefault(); // Prevent scrolling on touch devices while drawing
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    ctx.strokeStyle = activeTool === 'eraser' ? '#ffffff' : currentColor;
    ctx.lineWidth = activeTool === 'eraser' ? 20 : lineWidth;
    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  const colors = ['#000000', '#ef4444', '#3b82f6', '#22c55e', '#eab308'];

  return (
    <div className="contact-page-wrapper">
      {/* LEFT SIDE - IMAGE */}
      <div className="contact-image-section">
        <MailboxGraphic />
      </div>

      {/* RIGHT SIDE - FORM */}
      <div className="contact-form-section">
        <div className="form-header">
          <button className="return-btn" onClick={() => onNavigate('home')}>
            Return to home <span className="arrow-box"><ArrowUpRight size={14} /></span>
          </button>
        </div>

        <div className="form-title-row">
          <h1 className="form-title">Send a message</h1>
        </div>

        {/* MODE TOGGLE */}
        <div className="mode-toggle">
          <button 
            className={`toggle-btn ${inputMode === 'draw' ? 'active' : ''}`}
            onClick={() => setInputMode('draw')}
          >
            <PenTool size={16} /> Draw Message
          </button>
          <button 
            className={`toggle-btn ${inputMode === 'type' ? 'active' : ''}`}
            onClick={() => setInputMode('type')}
          >
            <Type size={16} /> Type Message
          </button>
        </div>

        {inputMode === 'type' ? (
          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-row">
              <div className="form-group" style={{ width: '100%' }}>
                <label>Full name</label>
                <input type="text" placeholder="John Doe" />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group" style={{ width: '100%' }}>
                <label>Email Address</label>
                <input type="email" placeholder="john@example.com" />
              </div>
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea placeholder="Dear Sam," rows={6}></textarea>
            </div>

            <button type="submit" className="submit-btn" onClick={() => alert('Message sent!')}>
              Send to Sam
            </button>
          </form>
        ) : (
          <div className="whiteboard-container">
            <div className="whiteboard-toolbar">
              <div className="color-palette">
                {colors.map(color => (
                  <button
                    key={color}
                    className={`color-btn ${currentColor === color && activeTool === 'pen' ? 'active' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => {
                      setCurrentColor(color);
                      setActiveTool('pen');
                      setLineWidth(3);
                    }}
                    title={`Color: ${color}`}
                  />
                ))}
              </div>
              <div className="toolbar-actions">
                <button 
                  className={`tool-btn ${activeTool === 'pen' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTool('pen');
                    setLineWidth(3);
                  }}
                  title="Pen"
                >
                  <PenTool size={18} />
                </button>
                <button 
                  className={`tool-btn ${activeTool === 'eraser' ? 'active' : ''}`}
                  onClick={() => setActiveTool('eraser')}
                  title="Eraser"
                >
                  <Eraser size={18} />
                </button>
                <button className="tool-btn clear-btn" onClick={clearCanvas} title="Clear Board">
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
                style={{ cursor: 'none' }}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
              />
            </div>

            <button className="submit-btn" onClick={() => alert('Message sent!')} style={{ marginTop: '1rem' }}>
              Send to Sam
            </button>
          </div>
        )}

        <div className="contact-footer-info" style={{ gap: '2rem', flexWrap: 'wrap', marginTop: '3rem' }}>
          <div className="info-column">
            <h4>Socials</h4>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{ color: '#aaa', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = '#aaa'}>
                <FiInstagram size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={{ color: '#aaa', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = '#aaa'}>
                <FiLinkedin size={20} />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" style={{ color: '#aaa', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = '#aaa'}>
                <FiGithub size={20} />
              </a>
            </div>
          </div>
          <div className="info-column">
            <h4>Resume</h4>
            <button 
              onClick={() => onNavigate('media')}
              style={{ background: 'transparent', border: 'none', color: '#aaa', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: 0, fontSize: '0.9rem', fontFamily: 'monospace', transition: 'color 0.2s' }}
              onMouseOver={e => e.currentTarget.style.color = '#fff'} 
              onMouseOut={e => e.currentTarget.style.color = '#aaa'}
            >
              <FileText size={16} /> View CV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

