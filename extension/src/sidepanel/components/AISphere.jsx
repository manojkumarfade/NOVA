
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import AudioReactiveEngine from '../../services/AudioReactiveEngine';
import { sphereVertexShader, sphereFragmentShader } from './SphereShaders';

const AISphere = ({ mode }) => { // mode: 'listening', 'speaking', 'processing', 'idle'
    const mountRef = useRef(null);
    const sceneRef = useRef(null);
    const sphereRef = useRef(null);
    const pointsRef = useRef(null);
    const linesRef = useRef(null);

    // Fix for Mode Update in Loop:
    const modeRef = useRef(mode);
    useEffect(() => { modeRef.current = mode; }, [mode]);

    useEffect(() => {
        if (!mountRef.current) return;

        // --- SETUP ---
        const width = mountRef.current.clientWidth;
        const height = mountRef.current.clientHeight;

        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 8;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio);
        mountRef.current.appendChild(renderer.domElement);

        // --- CORE SPHERE (smaller) ---
        const geometry = new THREE.IcosahedronGeometry(1.2, 3);
        const material = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                audioIntensity: { value: 0 },
                baseColor: { value: new THREE.Color(0x0066ff) },
                glowColor: { value: new THREE.Color(0x00ffff) }
            },
            vertexShader: sphereVertexShader,
            fragmentShader: sphereFragmentShader,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            side: THREE.DoubleSide
        });

        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.y = -3.5; // Positioned better for bottom section
        scene.add(sphere);
        sphereRef.current = sphere;

        // --- Inner Glow Sphere ---
        const glowGeo = new THREE.SphereGeometry(1.6, 32, 32);
        const glowMat = new THREE.MeshBasicMaterial({
            color: 0x00ccff,
            transparent: true,
            opacity: 0.08,
            blending: THREE.AdditiveBlending,
        });
        const glowSphere = new THREE.Mesh(glowGeo, glowMat);
        sphere.add(glowSphere);

        // --- Outer Halo Ring ---
        const haloGeo = new THREE.RingGeometry(2.3, 2.5, 64);
        const haloMat = new THREE.MeshBasicMaterial({
            color: 0x00ffff,
            transparent: true,
            opacity: 0.12,
            blending: THREE.AdditiveBlending,
            side: THREE.DoubleSide,
        });
        const haloRing = new THREE.Mesh(haloGeo, haloMat);
        haloRing.rotation.x = Math.PI * 0.5;
        sphere.add(haloRing);

        // --- NEURAL NETWORK (Points + Lines) ---
        const particleCount = 250;
        const particles = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const originalPositions = new Float32Array(particleCount * 3);
        const particleColors = new Float32Array(particleCount * 3);

        const pGeometry = new THREE.IcosahedronGeometry(1.7, 2);
        const pVertices = pGeometry.attributes.position.array;

        for (let i = 0; i < particleCount; i++) {
            const vIndex = Math.floor(Math.random() * (pVertices.length / 3)) * 3;
            // Add slight randomness for more organic feel
            const spread = 0.15;
            positions[i * 3] = pVertices[vIndex] + (Math.random() - 0.5) * spread;
            positions[i * 3 + 1] = pVertices[vIndex + 1] + (Math.random() - 0.5) * spread;
            positions[i * 3 + 2] = pVertices[vIndex + 2] + (Math.random() - 0.5) * spread;

            originalPositions[i * 3] = positions[i * 3];
            originalPositions[i * 3 + 1] = positions[i * 3 + 1];
            originalPositions[i * 3 + 2] = positions[i * 3 + 2];

            // Varied particle colors (cyan to white)
            const r = 0.4 + Math.random() * 0.6;
            particleColors[i * 3] = r * 0.5;
            particleColors[i * 3 + 1] = r;
            particleColors[i * 3 + 2] = r;
        }

        particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particles.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

        const pointMaterial = new THREE.PointsMaterial({
            size: 0.12,
            transparent: true,
            opacity: 0.9,
            blending: THREE.AdditiveBlending,
            vertexColors: true,
        });

        const pointCloud = new THREE.Points(particles, pointMaterial);
        sphere.add(pointCloud);
        pointsRef.current = pointCloud;

        // Lines (Wireframe) - more visible
        const wireGeo = new THREE.IcosahedronGeometry(1.7, 2);
        const wireMat = new THREE.MeshBasicMaterial({
            color: 0x00aaff,
            wireframe: true,
            transparent: true,
            opacity: 0.15,
            blending: THREE.AdditiveBlending
        });
        const wireMesh = new THREE.Mesh(wireGeo, wireMat);
        sphere.add(wireMesh);
        linesRef.current = wireMesh;

        // --- ENHANCED ASTEROIDS ---
        const asteroidGroup = new THREE.Group();
        scene.add(asteroidGroup);
        const asteroidCount = 50;
        const asteroidColors = [0x00ffff, 0xff00ff, 0x00ff88, 0xffaa00, 0x6644ff, 0x00ddff];

        for (let i = 0; i < asteroidCount; i++) {
            const size = Math.random() * 0.15 + 0.03;
            const starGeo = new THREE.IcosahedronGeometry(size, 0);
            const color = asteroidColors[Math.floor(Math.random() * asteroidColors.length)];
            const starMat = new THREE.MeshBasicMaterial({
                color: color,
                transparent: true,
                opacity: 0.5 + Math.random() * 0.4,
                blending: THREE.AdditiveBlending
            });
            const star = new THREE.Mesh(starGeo, starMat);

            const r = 6 + Math.random() * 14;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;

            star.position.set(
                r * Math.sin(phi) * Math.cos(theta),
                r * Math.sin(phi) * Math.sin(theta),
                r * Math.cos(phi)
            );

            star.userData = {
                velocity: new THREE.Vector3(
                    (Math.random() - 0.5) * 0.015,
                    (Math.random() - 0.5) * 0.015,
                    (Math.random() - 0.5) * 0.015
                ),
                rotSpeed: {
                    x: (Math.random() - 0.5) * 0.04,
                    y: (Math.random() - 0.5) * 0.04
                },
                pulseSpeed: 1 + Math.random() * 2,
                baseOpacity: 0.5 + Math.random() * 0.4,
            };

            asteroidGroup.add(star);
        }

        // --- ENHANCED BACKGROUND STARS ---
        const starsGeo = new THREE.BufferGeometry();
        const starsPos = [];
        const starsColors = [];
        const starSizes = [];
        for (let i = 0; i < 800; i++) {
            const x = (Math.random() - 0.5) * 120;
            const y = (Math.random() - 0.5) * 120;
            const z = (Math.random() - 0.5) * 60 - 20;
            starsPos.push(x, y, z);

            // Varied star colors
            const brightness = 0.5 + Math.random() * 0.5;
            if (Math.random() > 0.8) {
                starsColors.push(0.3 * brightness, brightness, brightness); // Cyan tint
            } else if (Math.random() > 0.7) {
                starsColors.push(brightness, 0.6 * brightness, brightness); // Purple tint
            } else {
                starsColors.push(brightness, brightness, brightness); // White
            }
            starSizes.push(0.05 + Math.random() * 0.15);
        }
        starsGeo.setAttribute('position', new THREE.Float32BufferAttribute(starsPos, 3));
        starsGeo.setAttribute('color', new THREE.Float32BufferAttribute(starsColors, 3));

        const starsMat = new THREE.PointsMaterial({
            size: 0.1,
            transparent: true,
            opacity: 0.6,
            vertexColors: true,
            blending: THREE.AdditiveBlending,
        });
        const stars = new THREE.Points(starsGeo, starsMat);
        scene.add(stars);

        // --- Nebula clouds (subtle colored fog) ---
        const nebulaGroup = new THREE.Group();
        scene.add(nebulaGroup);
        const nebulaColors = [0x003366, 0x330066, 0x006633];
        for (let i = 0; i < 5; i++) {
            const nebGeo = new THREE.SphereGeometry(8 + Math.random() * 6, 8, 8);
            const nebMat = new THREE.MeshBasicMaterial({
                color: nebulaColors[i % nebulaColors.length],
                transparent: true,
                opacity: 0.02,
                blending: THREE.AdditiveBlending,
                side: THREE.BackSide,
            });
            const neb = new THREE.Mesh(nebGeo, nebMat);
            neb.position.set(
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20,
                -15 + Math.random() * 10
            );
            nebulaGroup.add(neb);
        }

        // Lights
        const ambientLight = new THREE.AmbientLight(0x223344, 2);
        scene.add(ambientLight);
        const pointLight = new THREE.PointLight(0x00ffff, 3, 50);
        pointLight.position.set(0, -4, 5);
        scene.add(pointLight);

        const pointLight2 = new THREE.PointLight(0xff00ff, 1, 30);
        pointLight2.position.set(5, 0, -5);
        scene.add(pointLight2);


        // --- ANIMATION LOOP ---
        let frameId;

        const animate = () => {
            frameId = requestAnimationFrame(animate);

            material.uniforms.time.value += 0.02;
            const time = material.uniforms.time.value;

            // Get Audio Data
            let intensity = AudioReactiveEngine.getAudioData();
            if (isNaN(intensity)) intensity = 0;

            material.uniforms.audioIntensity.value = THREE.MathUtils.lerp(
                material.uniforms.audioIntensity.value,
                intensity,
                0.1
            );

            const currentMode = modeRef.current;

            // Dynamic Behavior based on Mode
            let rotSpeed = 0.005;
            let sphereScale = 1.0;
            let colorTarget = new THREE.Color(0x0066ff);
            let glowTarget = new THREE.Color(0x00ffff);

            if (currentMode === 'listening') {
                rotSpeed = 0.008;
                sphereScale = 1.0 + Math.sin(time * 2) * 0.04;
                colorTarget.set(0x00ddff);
                glowTarget.set(0x00ffff);
            } else if (currentMode === 'processing') {
                rotSpeed = 0.04;
                sphereScale = 0.92 + Math.sin(time * 4) * 0.03;
                colorTarget.set(0xaa44ff);
                glowTarget.set(0xff00ff);
            } else if (currentMode === 'speaking') {
                rotSpeed = 0.01;
                sphereScale = 1.0 + intensity * 0.4;
                colorTarget.set(0x00ff88);
                glowTarget.set(0x44ffaa);
            } else {
                colorTarget.set(0x002266);
                glowTarget.set(0x004488);
            }

            // Lerp Colors
            material.uniforms.baseColor.value.lerp(colorTarget, 0.05);
            material.uniforms.glowColor.value.lerp(glowTarget, 0.05);

            // Inner glow pulsing
            glowSphere.material.opacity = 0.06 + Math.sin(time * 1.5) * 0.03 + intensity * 0.08;
            glowSphere.material.color.lerp(glowTarget, 0.05);

            // Halo ring animation
            haloRing.rotation.z += 0.003;
            haloRing.material.opacity = 0.08 + Math.sin(time * 1.2) * 0.04 + intensity * 0.1;

            // 1. Sphere Rotation & Scale
            sphere.rotation.y += rotSpeed;
            sphere.rotation.z += rotSpeed * 0.5;
            sphere.scale.setScalar(THREE.MathUtils.lerp(sphere.scale.x, sphereScale, 0.1));

            // 2. Point Cloud (Breathing)
            if (currentMode === 'listening') {
                const positions = pointsRef.current.geometry.attributes.position.array;
                for (let i = 0; i < particleCount; i++) {
                    const ix = i * 3;
                    const ox = originalPositions[ix];
                    const oy = originalPositions[ix + 1];
                    const oz = originalPositions[ix + 2];

                    const amp = 0.2 + Math.sin(time + ox * 3) * 0.1;
                    positions[ix] = ox * (1 + amp * intensity * 2);
                    positions[ix + 1] = oy * (1 + amp * intensity * 2);
                    positions[ix + 2] = oz * (1 + amp * intensity * 2);
                }
                pointsRef.current.geometry.attributes.position.needsUpdate = true;
            } else {
                const positions = pointsRef.current.geometry.attributes.position.array;
                for (let i = 0; i < particleCount; i++) {
                    const ix = i * 3;
                    positions[ix] = THREE.MathUtils.lerp(positions[ix], originalPositions[ix], 0.1);
                    positions[ix + 1] = THREE.MathUtils.lerp(positions[ix + 1], originalPositions[ix + 1], 0.1);
                    positions[ix + 2] = THREE.MathUtils.lerp(positions[ix + 2], originalPositions[ix + 2], 0.1);
                }
                pointsRef.current.geometry.attributes.position.needsUpdate = true;
            }


            // 3. Wireframe (Pulse on Bass)
            if (currentMode === 'speaking') {
                const bassNorm = Math.min(intensity * 1.5, 1);
                linesRef.current.material.opacity = 0.15 + bassNorm * 0.4;
                linesRef.current.scale.setScalar(1 + bassNorm * 0.05);
                pointsRef.current.rotation.y -= rotSpeed * 1.5;
            } else {
                linesRef.current.material.opacity = THREE.MathUtils.lerp(linesRef.current.material.opacity, 0.15, 0.1);
                linesRef.current.scale.setScalar(THREE.MathUtils.lerp(linesRef.current.scale.x, 1.0, 0.1));
            }

            // 4. Enhanced Asteroid Animation
            asteroidGroup.children.forEach(ast => {
                ast.rotation.x += ast.userData.rotSpeed.x;
                ast.rotation.y += ast.userData.rotSpeed.y;

                // Pulsing opacity
                ast.material.opacity = ast.userData.baseOpacity + Math.sin(time * ast.userData.pulseSpeed) * 0.15;

                ast.position.add(ast.userData.velocity);
                if (ast.position.x > 20) ast.position.x = -20;
                if (ast.position.x < -20) ast.position.x = 20;
                if (ast.position.y > 20) ast.position.y = -20;
                if (ast.position.y < -20) ast.position.y = 20;
                if (ast.position.z > 10) ast.position.z = -10;
                if (ast.position.z < -10) ast.position.z = 10;
            });

            // 5. Background star twinkle
            stars.rotation.y += 0.0002;
            stars.rotation.x += 0.0001;

            // 6. Nebula clouds drift
            nebulaGroup.children.forEach((neb, i) => {
                neb.rotation.y += 0.001 * (i + 1);
                neb.material.opacity = 0.02 + Math.sin(time * 0.3 + i) * 0.008;
            });

            // Point light follows sphere color mode
            pointLight.color.lerp(glowTarget, 0.05);
            pointLight.intensity = 2 + intensity * 3;

            renderer.render(scene, camera);
        };

        animate();

        // --- CLEANUP ---
        return () => {
            cancelAnimationFrame(frameId);

            if (mountRef.current && renderer.domElement && mountRef.current.contains(renderer.domElement)) {
                mountRef.current.removeChild(renderer.domElement);
            }

            geometry.dispose();
            material.dispose();
            pGeometry.dispose();
            pointMaterial.dispose();
            wireGeo.dispose();
            wireMat.dispose();
            starsGeo.dispose();
            starsMat.dispose();
            glowGeo.dispose();
            glowMat.dispose();
            haloGeo.dispose();
            haloMat.dispose();
            asteroidGroup.children.forEach(ast => {
                if (ast.geometry) ast.geometry.dispose();
                if (ast.material) ast.material.dispose();
            });
            nebulaGroup.children.forEach(neb => {
                if (neb.geometry) neb.geometry.dispose();
                if (neb.material) neb.material.dispose();
            });
            renderer.dispose();
        };

    }, []);

    return <div ref={mountRef} className="w-full h-full" />;
};

export default AISphere;
