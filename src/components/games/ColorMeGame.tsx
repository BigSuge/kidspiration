import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Palette, Eraser, RotateCcw, Download, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';

interface ColorMeGameProps {
  onBack?: () => void;
}

export function ColorMeGame({ onBack }: ColorMeGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedColor, setSelectedColor] = useState('#FF6B9D');
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushSize, setBrushSize] = useState(20);
  const [isEraser, setIsEraser] = useState(false);

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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 800;
    canvas.height = 600;

    // Draw the coloring template (a simple healing scene)
    drawTemplate(ctx);
  }, []);

  const drawTemplate = (ctx: CanvasRenderingContext2D) => {
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
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx) {
      ctx.beginPath();
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = brushSize;

    if (isEraser) {
      ctx.globalCompositeOperation = 'destination-out';
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = selectedColor;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    drawTemplate(ctx);
  };

  const downloadDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'my-coloring.png';
    link.href = canvas.toDataURL();
    link.click();
  };

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

        <div className="grid lg:grid-cols-[1fr_250px] gap-8">
          {/* Canvas Area */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl shadow-2xl p-6 overflow-hidden"
          >
            <canvas
              ref={canvasRef}
              className="w-full border-4 border-gray-200 rounded-2xl cursor-crosshair touch-none"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              style={{ touchAction: 'none' }}
            />
          </motion.div>

          {/* Tools Panel */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Color Palette */}
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-6 shadow-lg">
              <h3 className="mb-4 text-gray-800 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-pink-500" />
                Colors
              </h3>
              <div className="grid grid-cols-5 gap-2">
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

            {/* Brush Size */}
            <div className="bg-gradient-to-br from-purple-50 to-cyan-50 rounded-3xl p-6 shadow-lg">
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

            {/* Tools */}
            <div className="space-y-3">
              <Button
                onClick={() => setIsEraser(!isEraser)}
                className={`w-full ${
                  isEraser
                    ? 'bg-gradient-to-r from-gray-600 to-gray-700'
                    : 'bg-gradient-to-r from-[#A78BFA] to-[#8B5CF6]'
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
                Reset
              </Button>

              <Button
                onClick={downloadDrawing}
                className="w-full bg-gradient-to-r from-[#FBBF24] to-[#F59E0B] text-white rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                <Download className="w-5 h-5 mr-2" />
                Save Art
              </Button>
            </div>
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
            Pick your favorite colors and fill in the picture! Use the eraser if you make a mistake. 
            When you're done, save your beautiful artwork!
          </p>
        </motion.div>
      </div>
    </div>
  );
}
