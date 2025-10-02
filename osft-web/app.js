// Utility Functions
function generateOrthogonalMatrix(dim) {
    // Generate random matrix
    const A = math.random([dim, dim], -1, 1);
    // QR decomposition to get orthogonal matrix
    const qr = math.qr(A);
    return qr.Q;
}

function drawGrid(ctx, width, height, step = 50) {
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;

    // Vertical lines
    for (let x = 0; x <= width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }

    // Horizontal lines
    for (let y = 0; y <= height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();
}

function drawPoints(ctx, points, color, centerX, centerY, scale = 50) {
    ctx.fillStyle = color;
    points.forEach(point => {
        const x = centerX + point[0] * scale;
        const y = centerY - point[1] * scale;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, 2 * Math.PI);
        ctx.fill();
    });
}

function drawVector(ctx, x1, y1, x2, y2, color, label = '') {
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 2;

    // Draw line
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    // Draw arrowhead
    const angle = Math.atan2(y2 - y1, x2 - x1);
    const headLength = 10;
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(
        x2 - headLength * Math.cos(angle - Math.PI / 6),
        y2 - headLength * Math.sin(angle - Math.PI / 6)
    );
    ctx.moveTo(x2, y2);
    ctx.lineTo(
        x2 - headLength * Math.cos(angle + Math.PI / 6),
        y2 - headLength * Math.sin(angle + Math.PI / 6)
    );
    ctx.stroke();

    // Draw label
    if (label) {
        ctx.font = '14px sans-serif';
        ctx.fillText(label, x2 + 10, y2 - 10);
    }
}

// 1. Orthogonal Transformation Visualization
function initOrthogonalDemo() {
    const canvas = document.getElementById('orthogonalCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const slider = document.getElementById('rotationAngle');
    const angleValue = document.getElementById('angleValue');
    const resetBtn = document.getElementById('resetRotation');

    // Generate random points
    const numPoints = 50;
    const originalPoints = [];
    for (let i = 0; i < numPoints; i++) {
        const r = Math.random() * 2;
        const theta = Math.random() * 2 * Math.PI;
        originalPoints.push([r * Math.cos(theta), r * Math.sin(theta)]);
    }

    function draw(angle) {
        const rad = (angle * Math.PI) / 180;
        const rotMatrix = [
            [Math.cos(rad), -Math.sin(rad)],
            [Math.sin(rad), Math.cos(rad)]
        ];

        // Transform points
        const transformedPoints = originalPoints.map(p => {
            return [
                p[0] * rotMatrix[0][0] + p[1] * rotMatrix[0][1],
                p[0] * rotMatrix[1][0] + p[1] * rotMatrix[1][1]
            ];
        });

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawGrid(ctx, canvas.width, canvas.height);

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        drawPoints(ctx, originalPoints, 'rgba(59, 130, 246, 0.3)', centerX, centerY, 80);
        drawPoints(ctx, transformedPoints, 'rgba(249, 115, 22, 0.8)', centerX, centerY, 80);

        // Draw distance preservation example
        if (originalPoints.length >= 2) {
            const scale = 80;
            ctx.strokeStyle = 'rgba(59, 130, 246, 0.5)';
            ctx.lineWidth = 1;
            ctx.setLineDash([5, 5]);
            ctx.beginPath();
            ctx.moveTo(centerX + originalPoints[0][0] * scale, centerY - originalPoints[0][1] * scale);
            ctx.lineTo(centerX + originalPoints[1][0] * scale, centerY - originalPoints[1][1] * scale);
            ctx.stroke();

            ctx.strokeStyle = 'rgba(249, 115, 22, 0.8)';
            ctx.beginPath();
            ctx.moveTo(centerX + transformedPoints[0][0] * scale, centerY - transformedPoints[0][1] * scale);
            ctx.lineTo(centerX + transformedPoints[1][0] * scale, centerY - transformedPoints[1][1] * scale);
            ctx.stroke();
            ctx.setLineDash([]);
        }
    }

    slider.addEventListener('input', (e) => {
        const angle = e.target.value;
        angleValue.textContent = angle + '°';
        draw(angle);
    });

    resetBtn.addEventListener('click', () => {
        slider.value = 45;
        angleValue.textContent = '45°';
        draw(45);
    });

    draw(45);
}

// 2. Matrix Explorer
function initMatrixExplorer() {
    const generateBtn = document.getElementById('generateMatrix');
    if (!generateBtn) return;

    function displayMatrix() {
        try {
            const Q = generateOrthogonalMatrix(4);
            const QT = math.transpose(Q);
            const QTQ = math.multiply(QT, Q);
            const det = math.det(Q);

            // Display Q
            const matrixQDiv = document.getElementById('matrixQ');
            if (matrixQDiv) {
                matrixQDiv.innerHTML = matrixToHTML(Q);
            }

            // Display Q^T * Q
            const matrixQTQDiv = document.getElementById('matrixQTQ');
            if (matrixQTQDiv) {
                matrixQTQDiv.innerHTML = matrixToHTML(QTQ);
            }

            // Display properties
            const propsDiv = document.getElementById('matrixProperties');
            if (propsDiv) {
                const isOrthogonal = isIdentityMatrix(QTQ);
                propsDiv.innerHTML = `
                    <p><strong>Determinant:</strong> ${det.toFixed(4)}</p>
                    <p><strong>Is Orthogonal:</strong> ${isOrthogonal ? '✓ Yes' : '✗ No'}</p>
                    <p><strong>Preserves Norm:</strong> ✓ Yes</p>
                    <p><strong>Preserves Angles:</strong> ✓ Yes</p>
                `;
            }
        } catch (error) {
            console.error('Error generating matrix:', error);
        }
    }

    function matrixToHTML(matrix) {
        // Convert matrix to array if it's a math.js matrix object
        const arr = Array.isArray(matrix) ? matrix : matrix.toArray();
        let html = '<div class="matrix">';
        for (let i = 0; i < 4; i++) {
            html += '<div class="matrix-row">';
            for (let j = 0; j < 4; j++) {
                const val = arr[i][j];
                html += `<span style="display:inline-block; width:80px; text-align:right;">${val.toFixed(3)}</span>`;
            }
            html += '</div>';
        }
        html += '</div>';
        return html;
    }

    function isIdentityMatrix(matrix, tolerance = 0.01) {
        // Convert matrix to array if it's a math.js matrix object
        const arr = Array.isArray(matrix) ? matrix : matrix.toArray();
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                const expected = i === j ? 1 : 0;
                if (Math.abs(arr[i][j] - expected) > tolerance) {
                    return false;
                }
            }
        }
        return true;
    }

    generateBtn.addEventListener('click', displayMatrix);
    displayMatrix();
}

// 3. Hyperspherical Energy Visualization
function initEnergyVisualization() {
    const canvas = document.getElementById('energyCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Generate sample features
    const numSamples = 30;
    const numFeatures = 3;
    const originalFeatures = [];

    for (let i = 0; i < numSamples; i++) {
        const feature = [];
        for (let j = 0; j < numFeatures; j++) {
            feature.push(Math.random() * 2 - 1);
        }
        originalFeatures.push(feature);
    }

    // Apply different transformations
    const Q = generateOrthogonalMatrix(numFeatures);
    const QArray = Array.isArray(Q) ? Q : Q.toArray();
    const oftFeatures = originalFeatures.map(f => {
        const result = math.multiply(f, QArray);
        return Array.isArray(result) ? result : result.toArray();
    });

    const randomMatrix = math.random([numFeatures, numFeatures], -0.3, 0.3);
    const identity = math.identity(numFeatures);
    const nonOrthMatrix = math.add(randomMatrix, identity);
    const nonOrthArray = Array.isArray(nonOrthMatrix) ? nonOrthMatrix : nonOrthMatrix.toArray();
    const randomFeatures = originalFeatures.map(f => {
        const result = math.multiply(f, nonOrthArray);
        return Array.isArray(result) ? result : result.toArray();
    });

    // Simple LoRA-style update
    const loraFeatures = originalFeatures.map(f => {
        const update = f.map(x => x * 0.1);
        return f.map((x, i) => x + update[i]);
    });

    // Compute energies
    const originalEnergy = computeEnergy(originalFeatures);
    const oftEnergy = computeEnergy(oftFeatures);
    const randomEnergy = computeEnergy(randomFeatures);
    const loraEnergy = computeEnergy(loraFeatures);

    // Visualize
    drawEnergyChart(ctx, canvas.width, canvas.height, {
        'Original': originalEnergy,
        'OFT': oftEnergy,
        'Random': randomEnergy,
        'LoRA': loraEnergy
    });

    // Display stats
    const statsDiv = document.getElementById('energyStats');
    if (statsDiv) {
        statsDiv.innerHTML = `
            <div class="energy-stat">
                <h4>Original</h4>
                <div class="value">${originalEnergy.toFixed(4)}</div>
            </div>
            <div class="energy-stat">
                <h4>OFT (Orthogonal)</h4>
                <div class="value">${oftEnergy.toFixed(4)}</div>
                <div class="change good">Δ ${Math.abs(oftEnergy - originalEnergy).toFixed(4)}</div>
            </div>
            <div class="energy-stat">
                <h4>Random Transform</h4>
                <div class="value">${randomEnergy.toFixed(4)}</div>
                <div class="change bad">Δ ${Math.abs(randomEnergy - originalEnergy).toFixed(4)}</div>
            </div>
            <div class="energy-stat">
                <h4>LoRA Update</h4>
                <div class="value">${loraEnergy.toFixed(4)}</div>
                <div class="change">Δ ${Math.abs(loraEnergy - originalEnergy).toFixed(4)}</div>
            </div>
        `;
    }
}

function computeEnergy(features) {
    // Normalize to unit sphere
    const normalized = features.map(f => {
        const norm = Math.sqrt(f.reduce((sum, x) => sum + x * x, 0));
        return f.map(x => x / (norm + 1e-8));
    });

    // Compute pairwise similarities
    let energy = 0;
    const n = normalized.length;
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            const similarity = normalized[i].reduce((sum, x, k) => sum + x * normalized[j][k], 0);
            energy += Math.abs(similarity);
        }
    }

    return energy / (n * (n - 1) / 2);
}

function drawEnergyChart(ctx, width, height, data) {
    ctx.clearRect(0, 0, width, height);

    const labels = Object.keys(data);
    const values = Object.values(data);
    const barWidth = width / (labels.length * 2);
    const maxValue = Math.max(...values) * 1.2;
    const chartHeight = height - 80;
    const chartY = 40;

    // Draw bars
    labels.forEach((label, i) => {
        const barHeight = (values[i] / maxValue) * chartHeight;
        const x = (i * 2 + 1) * barWidth;
        const y = chartY + chartHeight - barHeight;

        const colors = {
            'Original': '#6b7280',
            'OFT': '#3b82f6',
            'Random': '#ef4444',
            'LoRA': '#f59e0b'
        };

        ctx.fillStyle = colors[label] || '#888';
        ctx.fillRect(x, y, barWidth, barHeight);

        // Label
        ctx.fillStyle = '#374151';
        ctx.font = '14px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(label, x + barWidth / 2, height - 40);

        // Value
        ctx.fillText(values[i].toFixed(4), x + barWidth / 2, y - 10);
    });

    // Title
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText('Hyperspherical Energy Comparison', width / 2, 25);
}

// 4. SVD Visualization
function initSVDVisualization() {
    const canvas = document.getElementById('svdCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const slider = document.getElementById('rankSlider');
    const rankValue = document.getElementById('rankValue');
    const regenerateBtn = document.getElementById('regenerateSVD');
    const singularValuesDiv = document.getElementById('singularValues');

    let currentMatrix;
    let svdResult;

    function generateAndDecompose() {
        try {
            // Generate synthetic singular values (simulating SVD result)
            // In a real scenario, these would come from actual SVD of a weight matrix
            const baseValues = [2.5, 1.2, 0.3];
            const randomness = baseValues.map(v => v + (Math.random() - 0.5) * 0.3);

            svdResult = {
                s: randomness.sort((a, b) => b - a) // Sort descending
            };

            // Display singular values
            displaySingularValues(1);
            visualizeSVD(1);
        } catch (error) {
            console.error('SVD generation error:', error);
        }
    }

    function displaySingularValues(rankCutoff) {
        if (!svdResult || !singularValuesDiv) return;

        const singularValues = svdResult.s;
        let html = '<h4>Singular Values</h4>';

        singularValues.forEach((s, i) => {
            const isCritical = i < rankCutoff;
            const className = isCritical ? 'critical' : 'safe';
            const label = isCritical ? 'Critical' : 'Safe';
            html += `
                <div class="singular-value ${className}">
                    <span>σ${i + 1} = ${s.toFixed(4)}</span>
                    <span>${label}</span>
                </div>
            `;
        });

        singularValuesDiv.innerHTML = html;
    }

    function visualizeSVD(rankCutoff) {
        if (!svdResult) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const singularValues = svdResult.s;

        const padding = 50;
        const barWidth = (canvas.width - 2 * padding) / singularValues.length;
        const maxS = Math.max(...singularValues);
        const chartHeight = canvas.height - 2 * padding;

        // Draw bars for singular values
        singularValues.forEach((s, i) => {
            const barHeight = (s / maxS) * chartHeight;
            const x = padding + i * barWidth;
            const y = canvas.height - padding - barHeight;

            const isCritical = i < rankCutoff;
            ctx.fillStyle = isCritical ? '#ef4444' : '#10b981';
            ctx.fillRect(x + 5, y, barWidth - 10, barHeight);

            // Label
            ctx.fillStyle = '#374151';
            ctx.font = '12px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(`σ${i + 1}`, x + barWidth / 2, canvas.height - padding + 20);
            ctx.fillText(s.toFixed(3), x + barWidth / 2, y - 10);
        });

        // Draw cutoff line
        ctx.strokeStyle = '#374151';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        const cutoffX = padding + rankCutoff * barWidth;
        ctx.beginPath();
        ctx.moveTo(cutoffX, padding);
        ctx.lineTo(cutoffX, canvas.height - padding);
        ctx.stroke();
        ctx.setLineDash([]);

        // Labels
        ctx.fillStyle = '#ef4444';
        ctx.font = 'bold 14px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText('Critical Subspace', padding, 30);

        ctx.fillStyle = '#10b981';
        ctx.textAlign = 'right';
        ctx.fillText('Safe Subspace', canvas.width - padding, 30);

        // Title
        ctx.fillStyle = '#374151';
        ctx.font = 'bold 16px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('SVD: Identifying Critical vs. Safe Directions', canvas.width / 2, 20);
    }

    if (slider) {
        slider.addEventListener('input', (e) => {
            const rank = parseInt(e.target.value);
            rankValue.textContent = rank;
            displaySingularValues(rank);
            visualizeSVD(rank);
        });
    }

    if (regenerateBtn) {
        regenerateBtn.addEventListener('click', generateAndDecompose);
    }

    generateAndDecompose();
}

// 5. Gradient Projection Demo
function initProjectionDemo() {
    const canvas = document.getElementById('projectionCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const gradXSlider = document.getElementById('gradX');
    const gradYSlider = document.getElementById('gradY');
    const gradXValue = document.getElementById('gradXValue');
    const gradYValue = document.getElementById('gradYValue');
    const infoDiv = document.getElementById('projectionInfo');

    // Critical direction (example: first singular vector)
    const criticalDir = [1, 0.5];
    const norm = Math.sqrt(criticalDir[0] ** 2 + criticalDir[1] ** 2);
    const criticalDirNorm = [criticalDir[0] / norm, criticalDir[1] / norm];

    function visualize(gradX, gradY) {
        const gradient = [gradX, gradY];

        // Project gradient onto critical direction
        const dotProduct = gradient[0] * criticalDirNorm[0] + gradient[1] * criticalDirNorm[1];
        const projection = [
            dotProduct * criticalDirNorm[0],
            dotProduct * criticalDirNorm[1]
        ];

        // Projected gradient (orthogonal to critical direction)
        const projectedGrad = [
            gradient[0] - projection[0],
            gradient[1] - projection[1]
        ];

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const scale = 80;

        // Draw grid
        drawGrid(ctx, canvas.width, canvas.height);

        // Draw critical direction
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 3;
        ctx.setLineDash([10, 5]);
        ctx.beginPath();
        ctx.moveTo(centerX - criticalDirNorm[0] * 200, centerY - criticalDirNorm[1] * 200);
        ctx.lineTo(centerX + criticalDirNorm[0] * 200, centerY + criticalDirNorm[1] * 200);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = '#ef4444';
        ctx.font = 'bold 14px sans-serif';
        ctx.fillText('Critical Direction', centerX + criticalDirNorm[0] * 210, centerY + criticalDirNorm[1] * 210);

        // Draw original gradient
        drawVector(
            ctx,
            centerX, centerY,
            centerX + gradient[0] * scale, centerY - gradient[1] * scale,
            '#6b7280',
            'Original Gradient'
        );

        // Draw projection onto critical direction
        drawVector(
            ctx,
            centerX, centerY,
            centerX + projection[0] * scale, centerY - projection[1] * scale,
            '#f59e0b',
            'Projection'
        );

        // Draw projected gradient (OSFT update)
        drawVector(
            ctx,
            centerX, centerY,
            centerX + projectedGrad[0] * scale, centerY - projectedGrad[1] * scale,
            '#10b981',
            'OSFT Update'
        );

        // Update info
        const origNorm = Math.sqrt(gradient[0] ** 2 + gradient[1] ** 2);
        const projNorm = Math.sqrt(projectedGrad[0] ** 2 + projectedGrad[1] ** 2);
        const reductionPct = ((origNorm - projNorm) / origNorm * 100).toFixed(1);

        infoDiv.innerHTML = `
            <p><strong>Original Gradient:</strong> [${gradient[0].toFixed(2)}, ${gradient[1].toFixed(2)}]</p>
            <p><strong>Projection onto Critical:</strong> [${projection[0].toFixed(2)}, ${projection[1].toFixed(2)}]</p>
            <p><strong>OSFT Update:</strong> [${projectedGrad[0].toFixed(2)}, ${projectedGrad[1].toFixed(2)}]</p>
            <p><strong>Magnitude Reduction:</strong> ${reductionPct}%</p>
            <p style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #ccc;">
                The green vector shows where OSFT directs the update—safely away from critical learned features.
            </p>
        `;
    }

    if (gradXSlider && gradYSlider) {
        gradXSlider.addEventListener('input', (e) => {
            const val = parseFloat(e.target.value);
            gradXValue.textContent = val.toFixed(1);
            visualize(val, parseFloat(gradYSlider.value));
        });

        gradYSlider.addEventListener('input', (e) => {
            const val = parseFloat(e.target.value);
            gradYValue.textContent = val.toFixed(1);
            visualize(parseFloat(gradXSlider.value), val);
        });

        visualize(0.5, 0.8);
    }
}

// 6. Parameter Calculator
function initParameterCalculator() {
    const inputFeatures = document.getElementById('inputFeatures');
    const outputFeatures = document.getElementById('outputFeatures');
    const rank = document.getElementById('rank');
    const resultsDiv = document.getElementById('calculatorResults');

    if (!inputFeatures || !outputFeatures || !rank) return;

    function calculate() {
        const inF = parseInt(inputFeatures.value);
        const outF = parseInt(outputFeatures.value);
        const r = parseInt(rank.value);

        const totalParams = inF * outF;
        const oftParams = r * r;
        const loraParams = r * (inF + outF);

        resultsDiv.innerHTML = `
            <div class="param-result">
                <strong>Full Fine-Tuning:</strong>
                <span class="value">${totalParams.toLocaleString()} parameters</span>
            </div>
            <div class="param-result">
                <strong>OFT:</strong>
                <span class="value">${oftParams.toLocaleString()} parameters (${(oftParams / totalParams * 100).toFixed(2)}%)</span>
            </div>
            <div class="param-result">
                <strong>LoRA:</strong>
                <span class="value">${loraParams.toLocaleString()} parameters (${(loraParams / totalParams * 100).toFixed(2)}%)</span>
            </div>
            <div class="param-result">
                <strong>Parameter Reduction (OFT):</strong>
                <span class="value">${((1 - oftParams / totalParams) * 100).toFixed(2)}%</span>
            </div>
        `;
    }

    inputFeatures.addEventListener('input', calculate);
    outputFeatures.addEventListener('input', calculate);
    rank.addEventListener('input', calculate);

    calculate();
}

// 7. Training Simulation
function initTrainingSimulation() {
    const canvas = document.getElementById('trainingCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const startBtn = document.getElementById('startTraining');
    const resetBtn = document.getElementById('resetTraining');

    let animationId;
    let step = 0;
    const maxSteps = 100;

    const methods = {
        oft: { color: '#3b82f6', data: [] },
        lora: { color: '#f59e0b', data: [] },
        osft: { color: '#10b981', data: [] },
        full: { color: '#ef4444', data: [] }
    };

    function generateDataPoint(step, method) {
        const base = 0.5 + (step / maxSteps) * 0.4;

        switch (method) {
            case 'oft':
                return base + Math.sin(step / 10) * 0.05;
            case 'lora':
                return base + Math.sin(step / 8) * 0.06 - 0.05;
            case 'osft':
                return base + Math.sin(step / 12) * 0.03 + 0.05;
            case 'full':
                // Show catastrophic forgetting
                return step < 60 ? base : base - (step - 60) / 100;
            default:
                return base;
        }
    }

    function drawChart() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const padding = 50;
        const chartWidth = canvas.width - 2 * padding;
        const chartHeight = canvas.height - 2 * padding;

        // Draw axes
        ctx.strokeStyle = '#374151';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, canvas.height - padding);
        ctx.lineTo(canvas.width - padding, canvas.height - padding);
        ctx.stroke();

        // Labels
        ctx.fillStyle = '#374151';
        ctx.font = '14px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Training Steps', canvas.width / 2, canvas.height - 15);

        ctx.save();
        ctx.translate(15, canvas.height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText('Performance', 0, 0);
        ctx.restore();

        // Draw grid
        ctx.strokeStyle = '#e5e7eb';
        ctx.lineWidth = 1;
        for (let i = 0; i <= 10; i++) {
            const y = padding + (chartHeight / 10) * i;
            ctx.beginPath();
            ctx.moveTo(padding, y);
            ctx.lineTo(canvas.width - padding, y);
            ctx.stroke();
        }

        // Draw data
        Object.entries(methods).forEach(([name, config]) => {
            if (config.data.length < 2) return;

            ctx.strokeStyle = config.color;
            ctx.lineWidth = 3;
            ctx.beginPath();

            config.data.forEach((value, i) => {
                const x = padding + (i / maxSteps) * chartWidth;
                const y = canvas.height - padding - value * chartHeight;

                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            });

            ctx.stroke();
        });
    }

    function animate() {
        if (step >= maxSteps) {
            cancelAnimationFrame(animationId);
            return;
        }

        Object.keys(methods).forEach(method => {
            methods[method].data.push(generateDataPoint(step, method));
        });

        drawChart();
        step++;
        animationId = requestAnimationFrame(animate);
    }

    startBtn.addEventListener('click', () => {
        if (step === 0 || step >= maxSteps) {
            step = 0;
            Object.keys(methods).forEach(method => {
                methods[method].data = [];
            });
        }
        animate();
    });

    resetBtn.addEventListener('click', () => {
        cancelAnimationFrame(animationId);
        step = 0;
        Object.keys(methods).forEach(method => {
            methods[method].data = [];
        });
        drawChart();
    });

    drawChart();
}

// Initialize all visualizations
document.addEventListener('DOMContentLoaded', () => {
    initOrthogonalDemo();
    initMatrixExplorer();
    initEnergyVisualization();
    initSVDVisualization();
    initProjectionDemo();
    initParameterCalculator();
    initTrainingSimulation();

    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});
