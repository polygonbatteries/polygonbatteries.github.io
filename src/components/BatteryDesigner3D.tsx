import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface BatteryDesigner3DProps {
  length: number;
  width: number;
  height: number;
}

export const BatteryDesigner3D = ({ length, width, height }: BatteryDesigner3DProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const batteryRef = useRef<THREE.Group>();

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a1a);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(200, 150, 200);
    camera.lookAt(0, 0, 0);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(100, 100, 50);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x0080ff, 0.5);
    pointLight.position.set(-50, 50, 100);
    scene.add(pointLight);

    // Ground plane
    const groundGeometry = new THREE.PlaneGeometry(500, 500);
    const groundMaterial = new THREE.MeshLambertMaterial({ color: 0x2a2a2a });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -50;
    ground.receiveShadow = true;
    scene.add(ground);

    // Grid helper
    const gridHelper = new THREE.GridHelper(400, 20, 0x444444, 0x444444);
    gridHelper.position.y = -49;
    scene.add(gridHelper);

    // Improved mouse controls with drag functionality
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let targetRotationX = 0;
    let targetRotationY = 0;

    const onMouseDown = (event: MouseEvent) => {
      if (event.target === renderer.domElement) {
        isDragging = true;
        previousMousePosition = { x: event.clientX, y: event.clientY };
      }
    };

    const onMouseMove = (event: MouseEvent) => {
      if (isDragging) {
        const deltaMove = {
          x: event.clientX - previousMousePosition.x,
          y: event.clientY - previousMousePosition.y
        };
        
        targetRotationY += deltaMove.x * 0.01;
        targetRotationX += deltaMove.y * 0.01;
        
        previousMousePosition = { x: event.clientX, y: event.clientY };
      }
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      const zoomSpeed = 0.1;
      camera.position.multiplyScalar(1 + event.deltaY * zoomSpeed * 0.01);
      
      // Limit zoom range
      const distance = camera.position.distanceTo(new THREE.Vector3(0, 0, 0));
      if (distance < 50) camera.position.multiplyScalar(50 / distance);
      if (distance > 500) camera.position.multiplyScalar(500 / distance);
    };

    renderer.domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    renderer.domElement.addEventListener('wheel', onWheel);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      if (batteryRef.current) {
        batteryRef.current.rotation.x += (targetRotationX - batteryRef.current.rotation.x) * 0.05;
        batteryRef.current.rotation.y += (targetRotationY - batteryRef.current.rotation.y) * 0.05;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      renderer.domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      renderer.domElement.removeEventListener('wheel', onWheel);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update battery dimensions
  useEffect(() => {
    if (!sceneRef.current || !rendererRef.current) return;

    // Remove existing battery
    if (batteryRef.current) {
      sceneRef.current.remove(batteryRef.current);
    }

    // Create new battery group
    const batteryGroup = new THREE.Group();
    batteryRef.current = batteryGroup;

    // Convert mm to scene units (scale down)
    const scaleLength = Math.max(length || 50, 10) / 2;
    const scaleWidth = Math.max(width || 50, 10) / 2;
    const scaleHeight = Math.max(height || 20, 5) / 2;

    // Battery body
    const bodyGeometry = new THREE.BoxGeometry(scaleLength, scaleHeight, scaleWidth);
    const bodyMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x2563eb,
      shininess: 100
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.castShadow = true;
    body.receiveShadow = true;
    batteryGroup.add(body);

    // Positive terminal
    const posTerminalGeometry = new THREE.CylinderGeometry(3, 3, 8);
    const posTerminalMaterial = new THREE.MeshPhongMaterial({ color: 0xffaa00 });
    const posTerminal = new THREE.Mesh(posTerminalGeometry, posTerminalMaterial);
    posTerminal.position.set(scaleLength * 0.3, scaleHeight / 2 + 4, 0);
    posTerminal.castShadow = true;
    batteryGroup.add(posTerminal);

    // Negative terminal
    const negTerminalGeometry = new THREE.CylinderGeometry(3, 3, 6);
    const negTerminalMaterial = new THREE.MeshPhongMaterial({ color: 0x888888 });
    const negTerminal = new THREE.Mesh(negTerminalGeometry, negTerminalMaterial);
    negTerminal.position.set(-scaleLength * 0.3, scaleHeight / 2 + 3, 0);
    negTerminal.castShadow = true;
    batteryGroup.add(negTerminal);

    // Label
    const labelGeometry = new THREE.PlaneGeometry(scaleLength * 0.8, scaleHeight * 0.4);
    const labelMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xffffff,
      transparent: true,
      opacity: 0.9
    });
    const label = new THREE.Mesh(labelGeometry, labelMaterial);
    label.position.set(0, 0, scaleWidth / 2 + 0.1);
    batteryGroup.add(label);

    // Add wireframe for better visualization
    const wireframeGeometry = new THREE.EdgesGeometry(bodyGeometry);
    const wireframeMaterial = new THREE.LineBasicMaterial({ color: 0x00ffff, linewidth: 2 });
    const wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
    batteryGroup.add(wireframe);

    sceneRef.current.add(batteryGroup);

    // Update camera position based on battery size
    const maxDimension = Math.max(scaleLength, scaleWidth, scaleHeight);
    const distance = maxDimension * 4;
    // Camera position is already set in the initial setup, no need to update unless necessary

  }, [length, width, height]);

  return (
    <div className="w-full h-full">
      <div ref={mountRef} className="w-full h-80 rounded-lg overflow-hidden" />
      <div className="mt-4 text-center">
        <p className="text-sm text-muted-foreground">
          Dimensions: {length || 0} × {width || 0} × {height || 0} mm
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Click and drag to rotate • Scroll to zoom • Interactive 3D preview
        </p>
      </div>
    </div>
  );
};