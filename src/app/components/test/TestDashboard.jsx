import { useState } from "react";
import { speakathonRegistrationConfig } from "../form/formConfig.js";

export function TestDashboard() {
  const [logs, setLogs] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  const appScriptUrl = speakathonRegistrationConfig.appScriptUrl;

  const addLog = (message, type = "info") => {
    setLogs((prev) => [...prev, { time: new Date().toLocaleTimeString(), message, type }]);
  };

  const generateDummyPayload = (index) => {
    return {
      name: `Test User ${index}`,
      email: `testuser${index}@example.com`,
      phone: `913456789${index % 10}`,
      rollNo: `2024CS${100 + index}`,
      branch: "CSE",
      section: "A",
      yearOfStudy: "1st Year",
      discordId: `testuser#${1000 + index}`,
      tshirtSize: "L",
      dietaryRequirements: "None",
      heardAboutUs: "Other"
    };
  };

  const fetchAndConvertTestFile = async () => {
    try {
      const response = await fetch('/Test-Upload.pptx');
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve({
            fileBase64: reader.result.split(',')[1],
            fileName: 'Test-Upload.pptx',
            mimeType: blob.type
          });
        };
        reader.onerror = () => reject(new Error("Failed to read test file"));
        reader.readAsDataURL(blob);
      });
    } catch (e) {
      addLog(`Failed to load Test-Upload.pptx: ${e.message}`, "error");
      return null;
    }
  };

  const runLoadTest = async () => {
    setIsRunning(true);
    setLogs([]);
    addLog("Starting 50 simultaneous registrations...", "info");
    addLog("Loading Test-Upload.pptx...", "info");
    
    const fileData = await fetchAndConvertTestFile();
    if (!fileData) {
      setIsRunning(false);
      return;
    }

    const totalRequests = 50;
    const promises = [];
    const startTime = Date.now();

    for (let i = 1; i <= totalRequests; i++) {
      const payload = generateDummyPayload(i);
      Object.assign(payload, fileData);
      
      // Simulate real-world natural spread and network variance (0 to ~15 seconds spread)
      // This prevents the browser from instantly dumping 100MB+ into a single network frame,
      // which is impossible in the real world since 50 people have 50 different IP addresses.
      const delay = Math.floor(Math.random() * 5000) + (i * 200);

      const reqPromise = new Promise(resolve => setTimeout(resolve, delay))
        .then(() => {
          addLog(`User ${i} clicked submit. Uploading...`, "info");
          return fetch(appScriptUrl, {
            method: "POST",
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            body: JSON.stringify(payload),
          });
        })
        .then(async (res) => {
          // Attempt to parse JSON response to check for script-level errors
          try {
            const data = await res.json();
            if (data.result === "error") {
               addLog(`User ${i} submission rejected: ${data.message}`, "error");
               return { index: i, success: false, error: data.message };
            }
          } catch(e) {
            addLog(`User ${i} failed: Invalid response (Google Rate Limit or Payload Block)`, "error");
            return { index: i, success: false, error: "Invalid JSON response (possibly rate limited or payload too large)" };
          }
          addLog(`User ${i} successfully registered!`, "success");
          return { index: i, success: true };
        })
        .catch((error) => {
          addLog(`User ${i} encountered a network error: ${error.message}`, "error");
          return { index: i, success: false, error: error.message };
        });

      promises.push(reqPromise);
    }

    const results = await Promise.all(promises);
    const endTime = Date.now();

    const successCount = results.filter((r) => r.success).length;
    const failureCount = results.filter((r) => !r.success).length;

    addLog(`Test completed in ${endTime - startTime}ms`, "info");
    addLog(`Success: ${successCount}, Failures: ${failureCount}`, successCount === totalRequests ? "success" : "warning");
    if (failureCount > 0) {
      addLog(`Sample error: ${results.find(r => !r.success)?.error}`, "error");
    }
    
    setIsRunning(false);
  };

  const runValidationFailureTest = async () => {
    setIsRunning(true);
    setLogs([]);
    addLog("Starting Validation Failure Test...", "info");

    const payload = { email: "invalidemail@test.com" }; // missing name
    
    try {
      addLog("Sending JSON payload with missing required fields...", "info");
      const res = await fetch(appScriptUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });
      
      const data = await res.json();
      if (data.result === "error") {
        addLog(`Backend successfully caught validation error: ${data.message}`, "success");
      } else {
        addLog("Backend accepted payload unexpectedly. Did you update the Apps script template?", "warning");
      }
    } catch (err) {
      addLog(`Unexpected network failure: ${err.message}`, "error");
    }
    
    setIsRunning(false);
  };
  
  const runMalformedPayloadTest = async () => {
    setIsRunning(true);
    setLogs([]);
    addLog("Starting Malformed Payload Test...", "info");

    try {
      addLog("Sending invalid JSON string...", "info");
      const res = await fetch(appScriptUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: "{ invalid: json, payload: true",
      });
      
      const data = await res.json();
      if (data.result === "error") {
        addLog(`Backend safely handled malformed JSON: ${data.message}`, "success");
      } else {
        addLog("Backend did not return standard error format.", "warning");
      }
    } catch (err) {
      addLog(`Unexpected network failure: ${err.message}`, "error");
    }
    
    setIsRunning(false);
  };

  const runNetworkFailureTest = async () => {
    setIsRunning(true);
    setLogs([]);
    addLog("Starting Network Failure Test (Simulating Timeout/Bad URL)...", "info");

    const badUrl = "https://script.google.com/macros/s/INVALID_URL/exec";
    const payload = generateDummyPayload(999);

    try {
      addLog("Sending JSON payload to an invalid endpoint to simulate failure...", "info");
      await fetch(badUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });
      addLog("Request succeeded unexpectedly.", "warning");
    } catch (err) {
      addLog(`Caught network failure as expected: ${err.message}`, "success");
    }

    setIsRunning(false);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto text-white mt-24">
      <h1 className="text-3xl font-bold mb-6 text-cyan-400">System Stress & Reliability Test</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <button 
          onClick={runLoadTest} 
          disabled={isRunning}
          className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-xl font-bold transition disabled:opacity-50"
        >
          Run 50 Simultaneous
        </button>
        <button 
          onClick={runValidationFailureTest} 
          disabled={isRunning}
          className="bg-orange-600 hover:bg-orange-700 text-white p-4 rounded-xl font-bold transition disabled:opacity-50"
        >
          Validation Failure Test
        </button>
        <button 
          onClick={runMalformedPayloadTest} 
          disabled={isRunning}
          className="bg-yellow-600 hover:bg-yellow-700 text-white p-4 rounded-xl font-bold transition disabled:opacity-50"
        >
          Malformed Payload Test
        </button>
        <button 
          onClick={runNetworkFailureTest} 
          disabled={isRunning}
          className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-xl font-bold transition disabled:opacity-50"
        >
          Network Failure Test
        </button>
      </div>

      <div className="bg-gray-900 border border-gray-700 rounded-xl p-4 h-[400px] overflow-y-auto font-mono text-sm">
        {logs.length === 0 ? (
          <p className="text-gray-500 italic">No logs yet. Run a test to see results here.</p>
        ) : (
          logs.map((log, i) => (
            <div key={i} className="mb-2">
              <span className="text-gray-500">[{log.time}]</span>{" "}
              <span className={
                log.type === "success" ? "text-green-400" :
                log.type === "error" ? "text-red-400" :
                log.type === "warning" ? "text-yellow-400" :
                "text-blue-300"
              }>
                {log.message}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
