import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, functions } from "../firebase";
import { httpsCallable } from "firebase/functions";
import { useNavigate } from "react-router-dom";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";

// Converts your tree data to React Flow nodes + edges
const transformTreeToFlow = (tree) => {
  let idCounter = 0;
  const nodes = [];
  const edges = [];

  // First pass: calculate the width needed for each subtree
  const calculateSubtreeWidth = (node) => {
    if (!node.children || node.children.length === 0) {
      return 200; // Minimum width for leaf nodes
    }
    
    let totalWidth = 0;
    node.children.forEach(child => {
      totalWidth += calculateSubtreeWidth(child);
    });
    
    // Add spacing between children
    const spacing = (node.children.length - 1) * 100;
    return Math.max(totalWidth + spacing, 200);
  };

  const traverse = (node, parentId = null, depth = 0, xOffset = 0) => {
    const id = `n${idCounter++}`;
    
    // Different colors for different levels
    const getNodeStyle = (level) => {
      switch (level) {
        case 0: // Root
          return "bg-gradient-to-r from-emerald-500 to-teal-600 border-emerald-400";
        case 1: // First level children
          return "bg-gradient-to-r from-blue-500 to-purple-600 border-blue-400";
        case 2: // Second level children (grandchildren)
          return "bg-gradient-to-r from-purple-500 to-pink-600 border-purple-400";
        default: // Deeper levels
          return "bg-gradient-to-r from-indigo-500 to-blue-600 border-indigo-400";
      }
    };
    
    const label = (
      <div className={`${getNodeStyle(depth)} border text-white px-6 py-4 rounded-lg shadow-lg text-sm max-w-[200px]`}>
        <strong className="text-base">{node.title || node.name}</strong>
        {node.description && (
          <div className="text-xs mt-2 opacity-90 leading-relaxed">{node.description}</div>
        )}
      </div>
    );

    nodes.push({
      id,
      data: { label },
      position: { x: xOffset, y: depth * 300 },
      style: { border: "none", background: "none" },
    });

    if (parentId) {
      edges.push({
        id: `e-${parentId}-${id}`,
        source: parentId,
        target: id,
        animated: true,
        style: { stroke: "#3b82f6", strokeWidth: 2 },
        type: "smoothstep",
      });
    }

    if (node.children && node.children.length > 0) {
      const subtreeWidths = node.children.map(child => calculateSubtreeWidth(child));
      const totalWidth = subtreeWidths.reduce((sum, width) => sum + width, 0) + (node.children.length - 1) * 100;
      
      let currentX = xOffset - totalWidth / 2;
      
      node.children.forEach((child, i) => {
        const childWidth = subtreeWidths[i];
        const childX = currentX + childWidth / 2;
        traverse(child, id, depth + 1, childX, childWidth);
        currentX += childWidth + 100; // 100px spacing between children
      });
    }
  };

  traverse(tree, null, 0, 0, calculateSubtreeWidth(tree));
  return { nodes, edges };
};

const CareerTreeVisualization = ({ data }) => {
  if (!data) return <p className="text-center text-gray-400">No tree data available.</p>;

  const { nodes, edges } = transformTreeToFlow(data);

  return (
    <div className="w-full h-[80vh] border border-gray-700 rounded-lg">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        panOnScroll
        zoomOnScroll
        attributionPosition="bottom-right"
        fitViewOptions={{ padding: 0.4, includeHiddenNodes: false }}
        defaultViewport={{ x: 0, y: 0, zoom: 0.6 }}
        minZoom={0.1}
        maxZoom={2}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
      >
        <Background color="#374151" gap={20} />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(undefined);
  const [careerTree, setCareerTree] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    degree: "",
    interests: "",
    goals: "",
  });
  const [isFormVisible, setIsFormVisible] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const sanitizeInput = (input) => input.replace(/[<>]/g, "");

  const handleInputChange = (field, value) => {
    setUserInput((prev) => ({ ...prev, [field]: sanitizeInput(value) }));
  };

  const generateCareerTree = async () => {
    if (!userInput.degree || !userInput.interests || !userInput.goals) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const generateCareerTreeFunction = httpsCallable(functions, "generateCareerTree");

      const result = await generateCareerTreeFunction({
        degree: userInput.degree,
        interests: userInput.interests,
        goals: userInput.goals,
      });

      if (result.data && result.data.tree) {
        setCareerTree(result.data.tree);
        setIsFormVisible(false);
      } else {
        setError("Received invalid response from server");
      }
    } catch (err) {
      setError(`Failed to generate career tree: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setCareerTree(null);
    setUserInput({ degree: "", interests: "", goals: "" });
    setIsFormVisible(true);
    setError(null);
  };

  if (user === undefined) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white font-sans">
      {/* Header */}
      <div className="w-full px-8 py-6 flex justify-between items-center border-b border-white/10">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            🎓 CareerPad
          </h1>
          <p className="text-gray-400 text-sm mt-1">Welcome back, {user.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 hover:border-red-500/50 text-red-300 px-4 py-2 rounded-lg"
        >
          Sign Out
        </button>
      </div>

      {/* Main Section */}
      <div className="px-8 py-12 w-full">
        {isFormVisible && (
          <div className="max-w-4xl mx-auto bg-white/5 p-8 rounded-xl border border-white/10">
            <h2 className="text-2xl font-bold mb-6 text-center">Generate Your Career Tree</h2>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-300 p-4 rounded-lg mb-6">
                {error}
              </div>
            )}

            <div className="space-y-6">
              <div>
                <label className="block text-sm text-gray-300 mb-2">Your Degree/Field of Study</label>
                <input
                  type="text"
                  value={userInput.degree}
                  onChange={(e) => handleInputChange("degree", e.target.value)}
                  className="w-full px-4 py-3 bg-black/10 border border-white/10 rounded-lg text-white placeholder-gray-500"
                  placeholder="e.g. Computer Science, Psychology"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">Your Interests & Passions</label>
                <textarea
                  value={userInput.interests}
                  onChange={(e) => handleInputChange("interests", e.target.value)}
                  className="w-full px-4 py-3 bg-black/10 border border-white/10 rounded-lg text-white placeholder-gray-500 resize-none"
                  rows="3"
                  placeholder="e.g. AI, startups, helping people"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">Your Career Goals</label>
                <textarea
                  value={userInput.goals}
                  onChange={(e) => handleInputChange("goals", e.target.value)}
                  className="w-full px-4 py-3 bg-black/10 border border-white/10 rounded-lg text-white placeholder-gray-500 resize-none"
                  rows="3"
                  placeholder="e.g. Build my own company, become a tech leader"
                />
              </div>

              <button
                onClick={generateCareerTree}
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 text-white py-4 rounded-lg font-semibold"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Generating...</span>
                  </div>
                ) : (
                  "Generate Career Tree"
                )}
              </button>
            </div>
          </div>
        )}

        {!isFormVisible && careerTree && (
          <div className="w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">🌿 Your AI-Generated Career Path Tree</h3>
              <button
                onClick={resetForm}
                className="bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-300 px-4 py-2 rounded-lg"
              >
                Generate New Tree
              </button>
            </div>

            <CareerTreeVisualization data={careerTree} />

            <details className="mt-10">
              <summary className="text-gray-400 hover:text-gray-300 cursor-pointer">
                🔍 Debug: View Raw JSON Data
              </summary>
              <pre className="text-xs text-gray-500 mt-2 whitespace-pre-wrap">
                {JSON.stringify(careerTree, null, 2)}
              </pre>
            </details>
          </div>
        )}
      </div>
    </div>
  );
}
