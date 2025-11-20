import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Palette, Eraser, RotateCcw, Download, Sparkles, ImageIcon, Undo2, Redo2 } from 'lucide-react';
import { Button } from '../ui/button';

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const MAX_HISTORY = 30;
const BRUSH_OPACITY = 0.1; // Keep brush strokes translucent so template lines stay visible

interface ArtworkTemplate {
  id: string;
  label: string;
  description: string;
  image: string;
}

const artworkTemplates: ArtworkTemplate[] = [
  {
    id: 'david',
    label: 'David defeats Goliath',
    description: 'Young David defeats Goliath in battle with a sling.',
    image: '/assets/coloring/david-the-king-outline.png',
  },
  {
    id: 'esther',
    label: 'Queen Esther',
    description: 'Queen Esther bravely speaks up for God’s people.',
    image: '/assets/coloring/queen-esther-outline.png',
  },
  {
    id: 'moses',
    label: 'Moses Parts the Sea',
    description: 'Moses stretches his staff as the Red Sea opens.',
    image: '/assets/coloring/moses-parting-the-sea-outline.png',
  },
  {
    id: 'palm-sunday',
    label: 'Lord Jesus on a Donkey',
    description: 'Our Lord Jesus rides triumphantly into Jerusalem.',
    image: '/assets/coloring/jesus-on-a-donkey-outline.png',
  },
  {
    id: 'christmas-tree',
    label: 'Decorate Your Christmas Tree',
    description: 'Add ornaments and lights to the Kidspiration tree.',
    image: '/assets/coloring/christmas-tree-outline.png',
  },
];

interface ColorMeGameProps {
  onBack?: () => void;
}

export function ColorMeGame({ onBack }: ColorMeGameProps) {
  const baseCanvasRef = useRef<HTMLCanvasElement>(null);
  const drawingCanvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedArtwork, setSelectedArtwork] = useState<ArtworkTemplate>(artworkTemplates[0]);
  const [selectedColor, setSelectedColor] = useState('#FF6B9D');
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushSize, setBrushSize] = useState(20);
  const [isEraser, setIsEraser] = useState(false);
  const [history, setHistory] = useState<ImageData[]>([]);
  const [redoStack, setRedoStack] = useState<ImageData[]>([]);

  const colors = [
    { name: 'Pink', hex: '#FF6B9D' },
    { name: 'Purple', hex: '#A78BFA' },
    { name: 'Cyan', hex: '#4ECDC4' },
    { name: 'Yellow', hex: '#FBBF24' },
    { name: 'Orange', hex: '#F59E0B' },
    { name: 'Red', hex: '#EF4444' },
    { name: 'Green', hex: '#10B981' },
    { name: 'Blue', hex: '#3B82F6' },
    { name: 'Brown', hex: '#92400E' },
    { name: 'Black', hex: '#000000' },
  ];

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getDrawingContext = () => drawingCanvasRef.current?.getContext('2d');

  const drawDefaultTemplate = useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Draw a simple figure (Jesus healing)
    // Head
    ctx.beginPath();
    ctx.arc(250, 150, 40, 0, Math.PI * 2);
    ctx.stroke();

    // Body
    ctx.beginPath();
    ctx.moveTo(250, 190);
    ctx.lineTo(250, 320);
    ctx.stroke();

    // Arms
    ctx.beginPath();
    ctx.moveTo(250, 220);
    ctx.lineTo(180, 260);
    ctx.moveTo(250, 220);
    ctx.lineTo(320, 260);
    ctx.stroke();

    // Legs
    ctx.beginPath();
    ctx.moveTo(250, 320);
    ctx.lineTo(220, 400);
    ctx.moveTo(250, 320);
    ctx.lineTo(280, 400);
    ctx.stroke();

    // Person being healed
    ctx.beginPath();
    ctx.arc(450, 300, 30, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(450, 330);
    ctx.lineTo(450, 420);
    ctx.stroke();

    // Sun
    ctx.beginPath();
    ctx.arc(650, 100, 40, 0, Math.PI * 2);
    ctx.stroke();

    // Sun rays
    for (let i = 0; i < 8; i++) {
      const angle = (Math.PI * 2 * i) / 8;
      ctx.beginPath();
      ctx.moveTo(650 + Math.cos(angle) * 50, 100 + Math.sin(angle) * 50);
      ctx.lineTo(650 + Math.cos(angle) * 70, 100 + Math.sin(angle) * 70);
      ctx.stroke();
    }

    // Hearts
    const drawHeart = (x: number, y: number, size: number) => {
      ctx.beginPath();
      ctx.moveTo(x, y + size / 4);
      ctx.quadraticCurveTo(x, y, x + size / 4, y);
      ctx.quadraticCurveTo(x + size / 2, y, x + size / 2, y + size / 4);
      ctx.quadraticCurveTo(x + size / 2, y, x + size * 3/4, y);
      ctx.quadraticCurveTo(x + size, y, x + size, y + size / 4);
      ctx.quadraticCurveTo(x + size, y + size / 2, x + size / 2, y + size);
      ctx.quadraticCurveTo(x, y + size / 2, x, y + size / 4);
      ctx.stroke();
    };

    drawHeart(100, 400, 40);
    drawHeart(600, 400, 40);

    // Add text
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.strokeText('Jesus Heals!', 400, 550);
  }, []);

  const renderArtwork = useCallback((artwork: ArtworkTemplate) => {
    const canvas = baseCanvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.src = artwork.image;
    image.onload = () => {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      const scale = Math.min(CANVAS_WIDTH / image.width, CANVAS_HEIGHT / image.height);
      const drawWidth = image.width * scale;
      const drawHeight = image.height * scale;
      const offsetX = (CANVAS_WIDTH - drawWidth) / 2;
      const offsetY = (CANVAS_HEIGHT - drawHeight) / 2;

      ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
    };

    image.onerror = () => {
      drawDefaultTemplate(ctx);
    };
  }, [drawDefaultTemplate]);

  const resetDrawingLayer = useCallback(() => {
    const ctx = getDrawingContext();
    if (!ctx) return;
    const canvas = drawingCanvasRef.current;
    if (!canvas) return;

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    setHistory([]);
    setRedoStack([]);
  }, []);

  const captureBeforeStroke = useCallback(() => {
    const ctx = getDrawingContext();
    if (!ctx) return;
    const snapshot = ctx.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    setHistory((prev) => {
      const next = [...prev, snapshot];
      return next.length > MAX_HISTORY ? next.slice(next.length - MAX_HISTORY) : next;
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    renderArtwork(selectedArtwork);
    resetDrawingLayer();
  }, [renderArtwork, resetDrawingLayer, selectedArtwork]);

  const getCanvasCoordinates = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = drawingCanvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const scaleX = CANVAS_WIDTH / rect.width;
    const scaleY = CANVAS_HEIGHT / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const applyStrokeStyle = (ctx: CanvasRenderingContext2D) => {
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = brushSize;
    ctx.strokeStyle = selectedColor;
    ctx.globalAlpha = isEraser ? 1 : BRUSH_OPACITY;
    ctx.globalCompositeOperation = isEraser ? 'destination-out' : 'source-over';
  };

  const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isDrawing) return;
    e.preventDefault();
    captureBeforeStroke();
    setRedoStack([]);
    const ctx = getDrawingContext();
    if (!ctx) return;
    const point = getCanvasCoordinates(e);
    if (!point) return;
    applyStrokeStyle(ctx);
    ctx.beginPath();
    ctx.moveTo(point.x, point.y);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
    setIsDrawing(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    e.preventDefault();
    const ctx = getDrawingContext();
    if (!ctx) return;
    const point = getCanvasCoordinates(e);
    if (!point) return;

    applyStrokeStyle(ctx);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
  };

  const stopDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    e.preventDefault();
    const ctx = getDrawingContext();
    ctx?.closePath();
    setIsDrawing(false);
    if (e.currentTarget.hasPointerCapture?.(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const clearCanvas = () => {
    resetDrawingLayer();
  };

  const undo = () => {
    const ctx = getDrawingContext();
    if (!ctx || history.length === 0) return;
    const currentSnapshot = ctx.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    const previousSnapshot = history[history.length - 1];
    ctx.putImageData(previousSnapshot, 0, 0);
    setHistory((prev) => prev.slice(0, -1));
    setRedoStack((prev) => [...prev, currentSnapshot]);
  };

  const redo = () => {
    const ctx = getDrawingContext();
    if (!ctx || redoStack.length === 0) return;
    const currentSnapshot = ctx.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    const nextSnapshot = redoStack[redoStack.length - 1];
    ctx.putImageData(nextSnapshot, 0, 0);
    setRedoStack((prev) => prev.slice(0, -1));
    setHistory((prev) => {
      const next = [...prev, currentSnapshot];
      return next.length > MAX_HISTORY ? next.slice(next.length - MAX_HISTORY) : next;
    });
  };

  const downloadDrawing = () => {
    const baseCanvas = baseCanvasRef.current;
    const drawingCanvas = drawingCanvasRef.current;
    if (!baseCanvas || !drawingCanvas) return;

    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = CANVAS_WIDTH;
    exportCanvas.height = CANVAS_HEIGHT;
    const ctx = exportCanvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(baseCanvas, 0, 0);
    ctx.drawImage(drawingCanvas, 0, 0);

    const link = document.createElement('a');
    link.download = `${selectedArtwork.id}-coloring.png`;
    link.href = exportCanvas.toDataURL('image/png');
    link.click();
  };

  const renderArtworkSelector = () => (
    <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-lg border border-pink-100">
      <h3 className="mb-3 text-gray-800 flex items-center gap-2 font-semibold">
        <ImageIcon className="w-5 h-5 text-pink-500" />
        Choose Artwork
      </h3>
      <select
        value={selectedArtwork.id}
        onChange={(event) => {
          const nextArtwork = artworkTemplates.find((art) => art.id === event.target.value);
          if (nextArtwork) {
            setSelectedArtwork(nextArtwork);
          }
        }}
        className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3 text-sm focus:border-pink-400 focus:outline-none"
      >
        {artworkTemplates.map((artwork) => (
          <option key={artwork.id} value={artwork.id}>
            {artwork.label}
          </option>
        ))}
      </select>
      <p className="text-sm text-gray-600 mt-3">{selectedArtwork.description}</p>
    </div>
  );

  const renderColorPalette = () => (
    <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-5 sm:p-6 shadow-lg">
      <h3 className="mb-4 text-gray-800 flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-pink-500" />
        Colors
      </h3>
      <div className="grid grid-cols-5 gap-2 sm:grid-cols-6">
        {colors.map((color) => (
          <button
            key={color.hex}
            onClick={() => {
              setSelectedColor(color.hex);
              setIsEraser(false);
            }}
            className={`w-10 h-10 rounded-full shadow-md hover:scale-110 transition-transform ${
              selectedColor === color.hex && !isEraser ? 'ring-4 ring-offset-2 ring-pink-400' : ''
            }`}
            style={{ backgroundColor: color.hex }}
            title={color.name}
          />
        ))}
      </div>
    </div>
  );

  const renderBrushControls = () => (
    <div className="bg-gradient-to-br from-purple-50 to-cyan-50 rounded-3xl p-5 sm:p-6 shadow-lg">
      <h3 className="mb-4 text-gray-800">Brush Size</h3>
      <input
        type="range"
        min="5"
        max="50"
        value={brushSize}
        onChange={(e) => setBrushSize(Number(e.target.value))}
        className="w-full"
      />
      <p className="text-center mt-2 text-gray-600">{brushSize}px</p>
    </div>
  );

  const renderToolButtons = () => (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <Button
          onClick={undo}
          disabled={history.length === 0}
          className="w-full bg-gradient-to-r from-gray-50 to-gray-200 text-gray-800 rounded-full shadow hover:shadow-lg disabled:opacity-40"
        >
          <Undo2 className="w-5 h-5 mr-2" />
          Undo
        </Button>
        <Button
          onClick={redo}
          disabled={redoStack.length === 0}
          className="w-full bg-gradient-to-r from-gray-50 to-gray-200 text-gray-800 rounded-full shadow hover:shadow-lg disabled:opacity-40"
        >
          <Redo2 className="w-5 h-5 mr-2" />
          Redo
        </Button>
      </div>

      <Button
        onClick={() => setIsEraser(!isEraser)}
        className={`w-full ${
          isEraser ? 'bg-gradient-to-r from-gray-600 to-gray-700' : 'bg-gradient-to-r from-[#A78BFA] to-[#8B5CF6]'
        } text-white rounded-full shadow-lg hover:shadow-xl transition-all`}
      >
        <Eraser className="w-5 h-5 mr-2" />
        {isEraser ? 'Erasing' : 'Eraser'}
      </Button>

      <Button
        onClick={clearCanvas}
        className="w-full bg-gradient-to-r from-[#4ECDC4] to-[#06B6D4] text-white rounded-full shadow-lg hover:shadow-xl transition-all"
      >
        <RotateCcw className="w-5 h-5 mr-2" />
        Clear Colors
      </Button>

      <Button
        onClick={downloadDrawing}
        className="w-full bg-gradient-to-r from-[#FBBF24] to-[#F59E0B] text-white rounded-full shadow-lg hover:shadow-xl transition-all"
      >
        <Download className="w-5 h-5 mr-2" />
        Save Art
      </Button>
    </div>
  );

  return (
    <div className="pt-20 min-h-screen pb-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl mt-[30px] mr-[0px] mb-[0px] ml-[0px]">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8"
        >
          <Button
            onClick={onBack}
            variant="ghost"
            className="mb-4 hover:bg-pink-100"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Games
          </Button>

          <div className="flex items-center gap-4 mb-2">
            <div className="w-16 h-16 bg-gradient-to-br from-[#FF6B9D] to-[#F472B6] rounded-2xl flex items-center justify-center shadow-lg">
              <Palette className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B9D] to-[#F472B6] text-[32px] font-bold">
                Color Me Game
              </h1>
              <p className="text-gray-600">Bring this healing story to life with colors!</p>
            </div>
          </div>
        </motion.div>

        <div className="color-me-layout gap-6">
          {/* Canvas Area */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl shadow-2xl p-4 sm:p-6 overflow-hidden"
          >
            <div className="color-me-mobile-selector mb-6">
              {renderArtworkSelector()}
            </div>
            <div
              className="relative w-full border-4 border-gray-200 rounded-2xl bg-white overflow-hidden"
              style={{ aspectRatio: '4 / 3' }}
            >
              <canvas
                ref={baseCanvasRef}
                width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT}
                className="absolute inset-0 w-full h-full pointer-events-none"
              />
              <canvas
                ref={drawingCanvasRef}
                width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT}
                className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
                style={{ touchAction: 'none' }}
                onPointerDown={startDrawing}
                onPointerMove={draw}
                onPointerUp={stopDrawing}
                onPointerLeave={stopDrawing}
              />
            </div>
            <div className="color-me-mobile-tools mt-6 space-y-2">
              {renderColorPalette()}
              {renderBrushControls()}
              {renderToolButtons()}
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="color-me-desktop-tools space-y-2"
          >
            {renderArtworkSelector()}
            {renderColorPalette()}
            {renderBrushControls()}
            {renderToolButtons()}
          </motion.div>
        </div>

        {/* Instructions */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-gradient-to-r from-pink-100 to-purple-100 rounded-3xl p-6 text-center"
        >
          <h3 className="text-gray-800 mb-2 text-[32px] font-bold">How to Play 🎮</h3>
          <p className="text-gray-700">
            Pick an artwork, tap or drag to paint, and switch tools as you go. Undo/redo lets you experiment, 
            and the eraser only clears your strokes—never the base picture. When you're done, download your masterpiece!
          </p>
        </motion.div>
      </div>
    </div>
  );
}
