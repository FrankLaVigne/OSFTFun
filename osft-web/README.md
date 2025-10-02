# Orthogonal Fine-Tuning Interactive Web Experience

An interactive web-based educational tool for understanding Orthogonal Fine-Tuning (OFT) and Orthogonal Subspace Fine-Tuning (OSFT).

## Features

### Interactive Visualizations

1. **Orthogonal Transformation Demo**
   - Real-time visualization of how orthogonal matrices rotate feature spaces
   - Interactive angle control to see transformations in action
   - Distance preservation demonstration

2. **Matrix Explorer**
   - Generate and explore random orthogonal matrices
   - Verify orthogonality properties (Q^T × Q = I)
   - View determinant and other properties

3. **Hyperspherical Energy Preservation**
   - Compare energy preservation across different fine-tuning methods
   - Visual chart showing OFT's superior energy preservation
   - Real-time statistics

4. **SVD Decomposition Explorer**
   - Interactive singular value decomposition visualization
   - Adjustable rank cutoff to identify critical vs. safe subspaces
   - Color-coded visualization of singular values

5. **Gradient Projection Demo**
   - Real-time visualization of OSFT gradient projection
   - Adjustable gradient vectors
   - Shows how updates avoid critical directions

6. **Parameter Efficiency Calculator**
   - Compare parameter counts across methods (OFT, LoRA, Full Fine-Tuning)
   - Customizable layer dimensions
   - Real-time efficiency calculations

7. **Training Dynamics Simulation**
   - Animated comparison of different fine-tuning methods
   - Shows catastrophic forgetting in full fine-tuning
   - Demonstrates OSFT's stability

## Getting Started

### Requirements

- Modern web browser (Chrome, Firefox, Safari, Edge)
- No build process required - pure HTML, CSS, and JavaScript

### Running Locally

1. Navigate to the `osft-web` directory:
   ```bash
   cd osft-web
   ```

2. Open `index.html` in your web browser:
   - **Windows**: Double-click `index.html` or use `start index.html`
   - **macOS**: `open index.html`
   - **Linux**: `xdg-open index.html`

   Or use a local server:
   ```bash
   # Python 3
   python -m http.server 8000

   # Python 2
   python -m SimpleHTTPServer 8000

   # Node.js (with npx)
   npx http-server
   ```

   Then navigate to `http://localhost:8000`

## Content Overview

### OFT (Orthogonal Fine-Tuning)
- Understanding orthogonal matrices and their properties
- Core OFT formula: W' = W × R
- Hyperspherical energy preservation
- Comparison with LoRA

### OSFT (Orthogonal Subspace Fine-Tuning)
- SVD decomposition for identifying critical directions
- Gradient projection into safe subspaces
- Preventing catastrophic forgetting
- Continual learning applications

### Real-World Applications
- Domain adaptation
- Few-shot learning
- Continual learning
- Enterprise chatbots
- Medical and legal AI systems

## Technologies Used

- **HTML5 Canvas**: For interactive visualizations
- **Math.js**: Matrix operations and linear algebra
- **Prism.js**: Syntax highlighting for code examples
- **Vanilla JavaScript**: No framework dependencies
- **CSS Grid & Flexbox**: Responsive layout

## File Structure

```
osft-web/
├── index.html      # Main HTML structure
├── styles.css      # All styling and responsive design
├── app.js          # Interactive visualizations and logic
└── README.md       # This file
```

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Credits

Created by Frank La Vigne

Based on research papers:
- Orthogonal Fine-Tuning (OFT)
- Orthogonal Subspace Fine-Tuning (OSFT)

## License

This educational resource is provided as-is for learning purposes.
