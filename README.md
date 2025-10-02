# 🐇 Down the Orthogonal Rabbit Hole

## Exploring Orthogonnal SubSpaces in Fine-Tuning AI Models

Welcome to the rabbit hole of **Orthogonal Subspace Fine-Tuning (OSFT)**—where we explore how to teach AI models new tricks without making them forget the old ones.

### What is this?

This repository is your journey through the looking glass of parameter-efficient fine-tuning. Just like Alice discovered a world beyond what she expected, we'll dive deep into the fascinating world of orthogonal transformations, singular value decomposition, and the art of updating neural networks in "safe" directions.

### The Rabbit Hole Awaits...

**Level 1: The Surface** 🌅
Start with the basics of Orthogonal Fine-Tuning (OFT)—understanding how orthogonal matrices preserve geometric relationships while rotating feature spaces.

**Level 2: Deeper Down** 🔍
Discover how SVD reveals the hidden structure of weight matrices, separating critical learned knowledge from unused parameter space.

**Level 3: The Wonderland** ✨
Master Orthogonal Subspace Fine-Tuning (OSFT) and learn how to project gradient updates into safe subspaces, achieving continual learning without catastrophic forgetting.

### What's Inside

- **📓 Interactive Jupyter Notebooks**: Two comprehensive tutorials that guide you through OFT and OSFT
  - `orthogonal_fine_tuning_tutorial.ipynb` - Deep dive into OFT mechanics
  - `OSFT_Explainer_Notebook.ipynb` - Frank's no-nonsense guide to OSFT

- **🌐 Interactive Web Experience**: A rich, visual learning tool (`osft-web/`)
  - 7 interactive visualizations
  - Real-time matrix transformations
  - SVD decomposition explorer
  - Gradient projection demos
  - Parameter efficiency calculators
  - Training dynamics simulations

### Quick Start

**Explore the Notebooks:**
```bash
jupyter notebook orthogonal_fine_tuning_tutorial.ipynb
```

**Launch the Web Experience:**
```bash
cd osft-web
python -m http.server 8000
# Visit http://localhost:8000
```

### The Journey

This isn't just about learning a technique—it's about understanding *why* orthogonal transformations matter, *how* SVD reveals the soul of a neural network, and *when* to use these methods to build AI that learns continuously without losing its mind.

So take the plunge. Follow the white rabbit. Let's see how deep this orthogonal rabbit hole goes.

---

*"Begin at the beginning, and go on till you come to the end: then stop."*
— Lewis Carroll (but also good advice for gradient descent)

